async function getUserCartsWithAttachements(customerId, connection) {
    const getCartsRes = await connection.promise().query('SELECT * FROM cartitem Where CustomerId = ?', customerId);

    const carts = getCartsRes[0];
    const attachedProductsIds = [];
    const attachedVariantsIds = [];

    carts.map(cart => {
        if (!attachedProductsIds.includes(cart.ProductId)) {
            attachedProductsIds.push(cart.ProductId);
        };

        if (cart.VariantId && !attachedVariantsIds.includes(cart.VariantId)) {
            attachedVariantsIds.push(cart.VariantId);
        };
    });

    const productPlaceholders = attachedProductsIds.map(() => '?').join(',');
    const productSql = `SELECT * FROM product WHERE ProductId IN (${productPlaceholders})`;
    const productsRes = attachedProductsIds.length == 0 ? [[]] : await connection.promise().query(productSql, attachedProductsIds);

    const variantPlaceholders = attachedVariantsIds.map(() => '?').join(',');
    const variantSql = `SELECT * FROM variant WHERE VariantId IN (${variantPlaceholders})`;
    const variantsRes = attachedVariantsIds.length == 0 ? [[]] : await connection.promise().query(variantSql, attachedVariantsIds);

    const cartsWithAttachments = carts.map(cart => {
        cart.attachedProduct = productsRes[0].find(p => p.ProductId == cart.ProductId);
        cart.attachedVariant = variantsRes[0].find(v => v.ProductId == cart.ProductId);
        return cart;
    });

    return cartsWithAttachments;
};

const handleCartAction = async ({
    connection, action, method, body, response,
}) => {
    if (action == "get-user-carts" && method == "POST") {
        try {
            const { customerId } = JSON.parse(body);
            const carts = await getUserCartsWithAttachements(customerId, connection);

            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                carts
            }));
            response.end();

        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: false,
                e,
            }));
            response.end();
        }

    } else if (action == "remove-cart" && method == "DELETE") {
        try {
            const { itemId } = JSON.parse(body);
            await connection.promise().query('DELETE FROM cartitem Where CartItemId = ?', itemId);

            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: true
            }));
            response.end();

        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: false,
                e,
            }));
            response.end();
        }

    } else if (action == "check-voucher" && method == "POST") {
        try {
            const { voucherCode } = JSON.parse(body);
            const voucherRes = await connection.promise().query('SELECT * FROM vouchers Where Code = ?', voucherCode);

            if (voucherRes[0].length > 0) {
                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify({
                    success: true,
                    voucherId: voucherRes[0][0].VoucherId,
                    amount: voucherRes[0][0].amount,
                }));
                response.end();
            } else {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.write(JSON.stringify({
                    success: false,
                    e: "Invalid voucher"
                }));
                response.end();
            };

        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: false,
                e,
            }));
            response.end();
        }

    } else if (action == "checkout" && method == "POST") {
        try {
            const { customerId, voucherId } = JSON.parse(body);
            const voucherRes = voucherId ? await connection.promise().query('SELECT * FROM vouchers Where VoucherId = ?', voucherId) : [[[]]];

            const voucherAmountMaybe = voucherRes[0][0]?.amount || 0;
            const carts = await getUserCartsWithAttachements(customerId, connection);

            let subTotal = 0;
            carts.map(cart => {
                let { quantity, attachedProduct } = cart;
                let pPrice = Number(attachedProduct.price);
                subTotal += (quantity * pPrice);
            });
            let grandTotal = subTotal > voucherAmountMaybe ? subTotal - voucherAmountMaybe : 0;

            const orderRes = await connection.promise().query('INSERT INTO orders (CustomerId, totalPrice, VoucherId, discount) VALUES (?, ?, ?, ?)', [customerId, grandTotal, voucherId, voucherAmountMaybe]);

            const orderId = orderRes[0].insertId;

            carts.map(async cart => {
                let { quantity, ProductId, VariantId, CartItemId } = cart;
                await connection.promise().query('INSERT INTO orderitem (OrderId, ProductId, VariantId, quantity) VALUES (?, ?, ?, ?)', [orderId, ProductId, VariantId, quantity]);

                let newStock = cart.attachedProduct.stock - quantity;
                await connection.promise().query('UPDATE product SET stock = ? WHERE ProductId = ?', [newStock, ProductId]);

                await connection.promise().query('DELETE FROM cartitem Where CartItemId = ?', CartItemId);
            });

            generateReciept(customerId, orderId, carts, connection);

            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: true
            }));
            response.end();

        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: false,
                e,
            }));
            response.end();
        }

    } else {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify({}));
        response.end();
    };
};

async function generateReciept(customerId, orderId, carts, connection) {
    const customerRes = await connection.promise().query('SELECT * FROM customer Where CustomerId = ?', customerId);
    const orderRes = await connection.promise().query('SELECT * FROM orders Where OrderId = ?', orderId);
    const orderItemsRes = await connection.promise().query('SELECT * FROM orderitem Where OrderId = ?', orderId);

    const { generatePDF } = require('../generatePDF');
    const {
        filePath,
        base64String,
    } = await generatePDF(customerRes[0][0].name, orderRes[0][0], orderItemsRes[0], carts);

    // const { sendEmail } = require('../sendEmail');
    const { sendEmail } = require('../sendSendGridMail');
    await sendEmail(
        customerRes[0][0].email,
        'Order Confirmation',
        'Dear ' + customerRes[0][0].name + ',\n\nThank you for your order from Green And Delightful Mart. \nYour order is out for delivery \n\nPlease find the attached PDF document containing detailed information regarding your order.\n\nBest regards,\n[Hadeel]\nGreen And Delightful Mart',
        // customerRes[0][0].name,
        base64String,
    );
};

module.exports = {
    handleCartAction,
}

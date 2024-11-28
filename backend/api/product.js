const recommendedProducts = [
    5, 13, 14, 7, 26, 19,
];

const handleProductAction = async ({
    connection, action, method, body, response,
}) => {
    if (action == "get-category" && method == "POST") {
        try {
            const { catId } = JSON.parse(body);

            const itemsPlaceholders = recommendedProducts.map(() => '?').join(',');
            const itemsSql = `SELECT * FROM product WHERE ProductId IN (${itemsPlaceholders})`;
            const productsSql = 'SELECT * FROM product WHERE CategoryId = ?';

            const sql = Number(catId) == 0 ? itemsSql : productsSql;
            const values = Number(catId) == 0 ? recommendedProducts : Number(catId);

            const productsRes = await connection.promise().query(sql, values);
            const variantsRes = await connection.promise().query('SELECT * FROM variant');

            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                products: productsRes[0],
                variants: variantsRes[0],
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

    } else if (action == "search" && method == "POST") {
        try {
            const { searchValue } = JSON.parse(body);

            const productsRes = await connection.promise().query('SELECT * FROM product WHERE title LIKE ?', [`%${searchValue}%`]);
            const variantsRes = await connection.promise().query('SELECT * FROM variant');

            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                products: productsRes[0],
                variants: variantsRes[0],
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

    } else if (action == "add-to-cart" && method == "POST") {
        try {
            const {
                customerId,
                quantity,
                ProductId,
                variantId,
            } = JSON.parse(body);

            await connection.promise().query('INSERT INTO cartitem (CustomerId, quantity, ProductId, VariantId) VALUES (?, ?, ?, ?)', [customerId, quantity, ProductId, variantId]);

            const getCartsRes = await connection.promise().query('SELECT SUM(quantity) AS totalQuantity FROM cartitem Where CustomerId = ?', customerId);

            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                newNumberOfItems: getCartsRes[0][0].totalQuantity
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

    } else if (action == "get-carts-quantity" && method == "POST") {
        try {
            const {
                customerId,
            } = JSON.parse(body);

            const getCartsRes = await connection.promise().query('SELECT SUM(quantity) AS totalQuantity FROM cartitem Where CustomerId = ?', customerId);

            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                newNumberOfItems: getCartsRes[0][0].totalQuantity
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

module.exports = {
    handleProductAction,
}

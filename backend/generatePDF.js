const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Ensure the directory exists
const ensureDirectoryExists = (filePath) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Generate PDF
const generatePDF = (customerName, order, orderItems, carts) => {
    const {
        OrderId,
        // CustomerId,
        createdAt,
        totalPrice,
        discount,
    } = order;

    const products = carts.map(c => c.attachedProduct);
    const variants = carts.map(c => c.attachedVariant).filter(v => v);

    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const filePath = path.join(__dirname, 'orders', `${OrderId}.pdf`);

        // Ensure the directory exists
        ensureDirectoryExists(filePath);

        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);
        // doc.pipe(fs.createWriteStream(filePath));
        doc.fontSize(22).text('Order Details', { align: 'center' });
        doc.moveDown();

        doc.fontSize(16).text(`Order ID: ${OrderId}`);
        doc.text(`Customer name: ${customerName}`);
        doc.text(`Order Date: ${new Date(createdAt).toLocaleDateString("en-US")}`);
        doc.text(`Total Amount: $${totalPrice}`);
        doc.text(`Discount: $${discount}`);

        doc.moveDown();
        doc.moveDown();

        orderItems.map(item => {
            let {
                ProductId,
                VariantId,
                quantity,
            } = item;

            const product = products.find(p => p.ProductId == ProductId);
            const variantName = VariantId ? variants.find(v => v.VariantId == VariantId).title : "";

            doc.text(`Product: ${product.title} ${variantName}`);
            doc.text(`Quantity: ${quantity}`);
            doc.text(`Price: $${product.price}`);
            doc.text(`Total: $${(Number(product.price) * quantity).toFixed(2)}`);
            doc.moveDown();
        });

        doc.end();
        // doc.on('end', () => resolve(filePath));
        writeStream.on('finish', () => {
            // Read the file and encode it to base64
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        filePath,
                        base64String: data.toString('base64')
                    });
                }
            });
        });
        doc.on('error', (err) => reject(err));
    });
};

module.exports = { generatePDF };

const http = require("http");
const { URL } = require("url");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webshopdb'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database.');
});

const server = http.createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Parse the URL
    const url = new URL(request.url, `http://${request.headers.host}`);

    // Get the pathname
    const pathname = url.pathname;
    const [, type, action] = pathname.split("/");

    let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    });

    request.on('end', () => {
        const actionParams = {
            connection,
            action,
            method: request.method,
            body,
            response,
        };

        if (type == "user") {
            const { handleUserAction } = require("./api/user");
            handleUserAction(actionParams);
        } else if (type == "product") {
            const { handleProductAction } = require("./api/product");
            handleProductAction(actionParams);
        } else if (type == "cart") {
            const { handleCartAction } = require("./api/cart");
            handleCartAction(actionParams);
        } else if (type == "order") {
            const { handleOrderAction } = require("./api/order");
            handleOrderAction(actionParams);
        } else {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: false,
                e: "path not found",
            }));
            response.end();
        };
    });
});

// Start the server  
server.listen(4000, () => {
    console.log("Listening on port 4000...");
});

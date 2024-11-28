const handleOrderAction = async ({
    connection, action, method, body, response,
}) => {
    if (action == "history" && method == "POST") {
        try {
            const { customerId } = JSON.parse(body);
            const ordersRes = await connection.promise().query('SELECT * FROM orders Where CustomerId = ?', customerId);

            const orderIds = ordersRes[0].map(o => o.OrderId);

            const itemsPlaceholders = orderIds.map(() => '?').join(',');
            const itemsSql = `SELECT * FROM orderitem WHERE OrderId IN (${itemsPlaceholders})`;
            const itemsRes = orderIds.length == 0 ? [[]] : await connection.promise().query(itemsSql, orderIds);

            const orders = ordersRes[0].map(o => {
                o.items = itemsRes[0].filter(i => i.OrderId == o.OrderId);
                return o;
            });

            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                orders
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
    handleOrderAction,
}
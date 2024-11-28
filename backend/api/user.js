const handleUserAction = async ({
    connection, action, method, body, response,
}) => {
    if (action == "signup" && method == "POST") {
        try {
            const { userName, email, address, pw } = JSON.parse(body);
            const userRes = await connection.promise().query('INSERT INTO customer (name, email, address, password) VALUES (?, ?, ?, ?)', [userName, email, address, pw]);

            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                customerId: userRes[0]?.insertId,
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
    } else if (action == "signin" && method == "POST") {
        try {
            const { email, pw } = JSON.parse(body);
            const userRes = await connection.promise().query('SELECT email, password, CustomerId FROM customer WHERE email = ?', email);

            if (userRes[0] && userRes[0][0]) {
                if (userRes[0][0].password == pw) {
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.write(JSON.stringify({
                        customerId: userRes[0][0]?.CustomerId
                    }));
                    response.end();
                } else {
                    response.writeHead(400, { "Content-Type": "application/json" });
                    response.write(JSON.stringify({
                        success: false,
                        e: "email and password don't match",
                    }));
                    response.end();
                };

            } else {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.write(JSON.stringify({
                    success: false,
                    e: "user not found",
                }));
                response.end();
            }

        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: false,
                e,
            }));
            response.end();
        }

    } else if (action == "info" && method == "POST") {
        try {
            const { customerId } = JSON.parse(body);
            const userRes = await connection.promise().query('SELECT * FROM customer WHERE CustomerId = ?', customerId);

            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                customer: userRes[0][0]
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

    } else if (action == "update" && method == "POST") {
        try {
            const {
                customerId,
                userName,
                email,
                address,
                pw,
            } = JSON.parse(body);

            await connection.promise().query('UPDATE customer SET name = ?, email = ?, address = ?, password = ? WHERE CustomerId = ?', [userName, email, address, pw, customerId]);

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

    } else if (action == "request-token" && method == "POST") {
        try {
            const { email } = JSON.parse(body);
            const userRes = await connection.promise().query('SELECT * FROM customer WHERE email = ?', email);

            if (userRes[0] && userRes[0][0]) {
                const customerId = userRes[0][0].CustomerId;
                const token = generateToken(12);

                await connection.promise().query('INSERT INTO resetPasswordToken (CustomerId, token) VALUES (?, ?)', [customerId, token]);

                // const { sendEmail } = require('../sendEmail');
                const { sendEmail } = require('../sendSendGridMail');
                sendEmail(email, "Reset password token", `
                    Hi ${userRes[0][0].name} <br>
                    You requested a token to reset your password. <br>
                    Please use the following token: <br>
                    ${token} <br>
                    Regards.
                `);

                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify({
                    success: true
                }));
                response.end();
            } else {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.write(JSON.stringify({
                    success: false,
                    e: 'Invalid email',
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

    } else if (action == "reset-password" && method == "POST") {
        try {
            const { token, password } = JSON.parse(body);

            const tokenRes = await connection.promise().query('SELECT * FROM resetPasswordToken WHERE token = ?', token);

            if (tokenRes[0] && tokenRes[0][0]) {
                const customerId = tokenRes[0][0].CustomerId;
                await connection.promise().query('UPDATE customer SET password = ? WHERE CustomerId = ?', [password, customerId]);

                await connection.promise().query('DELETE FROM resetPasswordToken WHERE CustomerId = ?', customerId);

                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify({
                    success: true,
                    customerId,
                }));
                response.end();
            } else {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.write(JSON.stringify({
                    success: false,
                    e: 'Invalid token',
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

    } else {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify({}));
        response.end();
    };
};

function generateToken(length) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for (var i = 0; i < length; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    };
    return token;
};

module.exports = {
    handleUserAction,
};

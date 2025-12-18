const jwt = require("jsonwebtoken");
const SECRET = "jwt_secret_key";

module.exports = function (req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) return res.sendStatus(401);

    const token = auth.split(" ")[1];
    try {
        req.user = jwt.verify(token, SECRET);
        next();
    } catch {
        res.sendStatus(403);
    }
};


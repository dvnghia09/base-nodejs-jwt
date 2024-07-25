const Jwt = require("jsonwebtoken")

const middleware = {
    // verifyToken
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization;
        if (token) {
            const accessToken = token.split(" ")[1];
            Jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (error, user) => {
                if (error) {
                    res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            })
        } else {
            res.status(401).json("You're not authenticated");
        }
    },

    verifyAdmin: (req, res, next) => {
        const token = req.headers.authorization;
        if (token) {
            const accessToken = token.split(" ")[1];
            Jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (error, user) => {
                if (error || user.admin === false) {
                    res.status(403).json("unauthorized");
                }
                 
                req.user = user;
                next();
            })
        } else {
            res.status(401).json("You're not authenticated");
        }
    }
}

module.exports = middleware;
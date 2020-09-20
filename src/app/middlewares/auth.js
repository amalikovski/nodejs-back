const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).send({
            error: 'No token provided'
        });
    // Formato esperado -> Bearer ahsuahsuhaushuah (hash)

    const parts = authHeader.split(' ');
    if (!parts.length === 2)
        return res.status(401).send({
            error: 'Token Error'
        });

    const [scheme, token] = parts;

    if (!scheme.startsWith('Bearer'))
        return res.status(401).send({
            error: 'Token malformatted'
        });
    
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({
            error: 'Invalid Token'
        });
        req.userId = decoded.params.id;
        return next();
    })
};
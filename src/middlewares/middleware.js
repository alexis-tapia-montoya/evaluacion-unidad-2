const authSecurity = (req, res, next) => {
    const TOKEN_VALIDO = "admin-token-123";
    const userToken = req.headers['authorization'];

    if (!userToken || userToken !== TOKEN_VALIDO) {
        return res.status(401).json({ message: 'Acceso Denegado' });
    }
    next();
};

module.exports = authSecurity;
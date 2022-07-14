const JWTS = {
    SECRET : 'secret key access token jwt',
    TOKENS: {
        access: {
            type: 'access',
            expiresIn: '1m',
        },
        refresh: {
            type: 'refresh',
            expiresIn: '5m',
        },
    },
}

module.exports = {
    JWTS,
}
module.exports = ( req, res, next) => {    
    res.status(500).json({ error: 'Internal server error' });
}
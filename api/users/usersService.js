module.exports = {
    isValid,
    restricted
};
  
function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === 'string');
}

// I'm bringing restricted into this file because we might want to restrict other routes in the future
function restricted(req, res, next) {
    console.log(req.session)
    if (req.session && req.session.loggedIn) {
        next()
    } else {
        res.status(401).json({ message: 'This route is restricted. Please login to gain access' })
    }
}
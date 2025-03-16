async function ensureAuthenticated(req, res, next) {
	console.log(req.isAuthenticated());
	if (req.isAuthenticated()) {
		console.log("hello");
		return next();
	}
	res.redirect(process.env.CLIENT_BASE_URL + "/login");
}
  
 module.exports = ensureAuthenticated;
  
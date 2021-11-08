const express = require("express");
const User = require("../model/userModel.js")
const router = express.Router()
const passport = require("passport")



function notLoggedin(req, res, next) {
	if(!req.isAuthenticated()) {
		return next()
	}
	res.redirect("/success")
}

router.get("/", notLoggedin, (req, res) => {
	res.render("authentication/register")
})


router.get("/login", notLoggedin, (req, res) => {
	res.render("authentication/login")
})

router.post("/", (req, res) => {
	console.log(req.body.email);
	User.find({email : req.body.email}, (err, foundDuplicate) => {
		console.log(foundDuplicate);
		if(foundDuplicate != 0) {
			req.flash('duplicateEmail', 'Someone using inputed email. Try a new Email')
			res.redirect("/")
		}
		else if (req.body.password.length < 4) {
				req.flash('duplicateEmail', 'Password is too short. Try a new password with at least 4 characters')
			res.redirect("/")
		}
		else if(foundDuplicate.length == 0 && req.body.password.length > 3) {
			const newuser = new User({
		firstName: req.body.fname,
		LastName: req.body.lname,
		email: req.body.email,
		password: req.body.password
	})

	newuser.save();
	res.render("authentication/login")
		}
		
		else{
			res.redirect("/")
		}
	})
	
	
})



router.post('/login', passport.authenticate('local', { successRedirect: '/success',
                                                    failureRedirect: '/login',
                                                    failureFlash: true }));
router.get("/logout", (req, res) => {
	req.logout()
	res.redirect("/login")
})

module.exports = router
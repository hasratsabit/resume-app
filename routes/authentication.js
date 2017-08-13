const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('Welcome to registeration');
});


router.post('/register', (req, res) => {
	if(!req.body.name){
		res.json({ success: false, message: 'Name is required'});
	}else {
		if(!req.body.username){
			res.json({ success: false, message: 'Username is required'});
		}else {
			if(!req.body.email){
				res.json({ success: false, message: 'Email is required'});
			}else {
				if(!req.body.password){
					res.json({ success: false, message: 'Password is required.'})
				}else {
					const user = new User();
					user.name = req.body.name;
					user.username = req.body.username.toLowerCase();
					user.email = req.body.email.toLowerCase();
					user.password = req.body.password;
				}
			}
		}
	}
})

module.exports = router;

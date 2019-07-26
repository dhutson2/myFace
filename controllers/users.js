const express = require('express');
const router  = express.Router();
const User    = require('../models/users');


router.post('/', async (req, res) => {
	try{
		const newUser = await User.create(req.body);
		req.session.userId = newUser._id
		res.redirect('/')
		console.log(newUser)
	} catch(err) {
		res.send(err);
	}
})

router.post('/', async (req, res) => {
	console.log(req.body);
	try{
	const userFromDb = await User.findOne({username: req.body.username})
	if(userFromDb.password === req.body.password) {
		req.session.userId = userFromDb._id;
		res.redirect('/');
	} else{
		res.send(err)
	}
	res.send('logging in');
	} catch (err) {
		res.send(err);
	}
})


module.exports= router;
const express = require('express');
const router  = express.Router();
const Photo   = require('../models/photosModel');
const User    = require('../models/users')

// Photos index route
router.get('/', async (req, res) => {
	try {
		const photos = await Photo.find().populate('user');
		const user = await User.findById(req.params.id);
		console.log(photos)
		res.render('photos/index.ejs', {
			photos: photos,
			user: user
		})		
	} catch(err){
		res.send(err)
	}
});

router.get('/new', async (req, res) => {
	const user = await User.findById(req.session.userId);
	console.log(user, '<-user');
	res.render('photos/new.ejs', {
		user: user
	});
});

// Edit route
router.get('/:id/edit', async (req, res) => {
	console.log(req.params);
	try {
		const photo = await Photo.findById(req.params.id);
		const user = await User.find();
		res.render('photos/edit.ejs', {
			photo: photo,
			user: user
		})
	} catch(err){
		res.send(err)
	}
});

// Show route
router.get('/:id', async (req, res) => {
	try{
		const photo = await Photo.findById(req.params.id);
		res.render('photos/show.ejs', {
			photo: photo
		});
	}catch(err){
		res.send(err);
	}
});

// Delete route
router.delete('/:id', async (req, res) => {
	try{
		await Photo.findByIdAndDelete(req.params.id);
		res.redirect('/photos');
	} catch(err){
		res.send(err);
	}
});

// Update route
router.put('/:id', async (req, res) => {
	try {
		const newPhoto = await Photo.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.redirect(`/photos/${req.params.id}`)		
	} catch(err) {
		res.send(err);
	}
});

// Create route
router.post('/', async (req, res) => {
	if(!req.session.userId){
		console.log('must login to post pictures')
		res.redirect('/')
	} else{
		req.body.user = req.session.userId
	try{
		// const validatedURL = await validURL(req.body.url);
		// console.log(req.body.url);
		// console.log(validatedURL);
		// if(validatedURL){
			const newPhoto = await Photo.create(req.body);
			res.redirect(`/users/${req.session.userId}`);
		// } else {
		// 	console.log("invalid url");
		// 	// res.send('<script>alert("Invalid Url, please enter again")</script')
		// 	location = location
		// }
	} catch(err){
		res.send(err);
	}
}
});

function validURL(myURL) {
            var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
            '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i');
            return pattern.test(myURL);
         }



module.exports = router;
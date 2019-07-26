const express = require('express');
const router = express.Router();
const Photo = require('../models/photos');

router.get('/', async (req, res) => {
	try {
		const photos = await Photo.find();
		res.render('photos/index.ejs', {
			photos: photos
		})		
	} catch(err){
		res.send(err)
	}
});

router.get('/new', (req, res) => {
	res.render('photos/new.ejs');
});

router.get('/:id', async (req, res) => {
	try{
		const photo = await Photo.findById();
		res.render('photos/show.ejs', {
			photo: photo
		});
	}catch(err){
		res.send(err);
	}
});

router.post('/', async (req, res) => {
	try{
		const photo = await Photo.create(req.body);
		res.redirect('/photos');		
	} catch(err){
		res.send(err);
	}
});

router.delete('/:id', async (req, res) => {
	try{
		await Photo.findByIdAndDelete(req.params.id);
		res.redirect('/photos');
	} catch(err){
		res.send(err);
	}
});

router.get('/:id/edit', async (req, res) => {
	try {
		const photo = await Photo.findById(req.params.id);
		res.render('/photos/edit.ejs', {
			photo: photo
		})
	} catch(err){
		res.send(err)
	}
});

router.put('/:id', async (req, res) => {
	try {
		const newPhoto = await Photo.findByIdAndUpdate(req.params.id, req.body {new: true});
		res.redirect('/photos/${req.params.id}')		
	} catch(err) {
		res.send(err);
	}
});


module.exports = router;
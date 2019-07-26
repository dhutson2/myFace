const express = require('express');
const router  = express.Router();
const User    = require('../models/users');


// profile index page that will show
// individual users profile
router.get('/', (req, res) => {
    res.render('users/index.ejs')
})

// route to get new page to create profile
router.get('/new', (req, res) =>{
    res.render('users/new.ejs')
})

// route to create profile and add it to user
router.post('/', (req, res) => {
    //put stuff here
})

// route to show selected profile
router.get('/:id', (req, res) => {
    res.render('users/show.ejs')
})

//route to edit selected profile, assuming user owns profile
router.get('/:id/edit', (req, res) => {
    res.render('users/edit.ejs')
})

//route to update edited profile
router.put('/:id', (req, res) => {
    // put stuff here
})

// danger zone! route to delete profile
// should we be like facebook and make this option impossible to find??
router.delete('/:id', (req, res) => {
    //put stuff here
})


module.exports= router;
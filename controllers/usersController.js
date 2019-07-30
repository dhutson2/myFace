const express = require('express');
const router  = express.Router();
const User    = require('../models/users');
const Photo   = require('../models/photosModel');


// profile index page that will show
// individual users profile
router.get('/', async(req, res) => {
    try{
    const users = await User.find({})
    res.render('users/index.ejs', {
        users: users
    })
    } catch(err){
        res.send(err)
    }
})

// route to get new page to create profile
router.get('/new', (req, res) =>{
    res.render('users/new.ejs')
})

// route to create profile and add it to user
router.post('/', async (req, res) => {
    try{
    const user = await User.create(req.body);
    console.log(user)
    res.redirect('/users')
    } catch(err){
        res.send(err)
    }
})

// route to show selected profile
router.get('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        const usersphotos = await Photo.find({user: req.params.id});
        res.render('users/show.ejs', {
            users: await user,
            photos: await usersphotos
        })

    } catch(err){
        res.send(err)
    }
})

//route to edit selected profile, assuming user owns profile
router.get('/:id/edit', async (req, res) => {
    const foundUser = await User.findById(req.params.id)
    // console.log(foundUser)
    try{
    res.render('users/edit.ejs',{
        user: foundUser
    })
    } catch(err){
        res.send(err)
    }
})

//route to update edited profile
router.put('/:id', async (req, res) => {
    const foundUser = await User.findByIdAndUpdate(req.params.id, req.body)
    try{
        console.log(foundUser, '<-- put route')
        res.redirect('/users/' + req.params.id)
    } catch(err){
        res.send(err)
    }
})

// danger zone! route to delete profile
// should we be like facebook and make this option impossible to find??
router.delete('/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndRemove(req.params.id)
        res.redirect('/users')
    } catch(err){

    }
})


module.exports= router;
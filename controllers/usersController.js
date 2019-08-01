const express = require('express');
const router  = express.Router();
const User    = require('../models/users');
const Photo   = require('../models/photosModel');
const bcrypt  = require('bcryptjs');


// index page that show list of users
router.get('/', async(req, res) => {
    console.log(req.session)
    console.log(`A visit from ${req.session.userId}`)
    try{
    const users = await User.find({})
    res.render('users/index.ejs', {
        users: users,
        name: req.session.name
    })
    } catch(err){
        res.send(err)
    }
})

// route to get new page to create profile
router.get('/new', async (req, res) =>{
    const user = await User.findById(req.session.userId)
    res.render('users/new.ejs', {
        user: user
    })
})

router.get('/logout', (req, res) => {
    if(req.session){
        req.session.destroy(function(err) {
            if(err){
                res.send(err)
            } else {
                console.log(req.session, '<-- after logout')
                res.redirect('/')
            }
        }
        )}
})

// route to create user
router.post('/', async (req, res) => {
    try{
    const salt = bcrypt.genSaltSync();
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    const newUser = await User.create(req.body);
    console.log(newUser);
    req.session.userId = newUser._id
    req.session.name = newUser.name
    req.session.logged = true
    console.log(newUser)
    res.redirect('/users/new')
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
        const user = await User.findByIdAndRemove(req.params.id);
        await Photo.remove({user: req.params.id});
        res.redirect('/users')
    } catch(err){
        res.send(err)
    }
})

router.post('/login', async (req, res) => {
   try {
    const userFromDb = await User.findOne({name: req.body.name})
    const validPassword = bcrypt.compareSync(req.body.password, userFromDb.password);
    if(validPassword) {
        req.session.userId = userFromDb._id;
        req.session.logged = true;
        console.log(req.session, '<-- from login')
        res.redirect(`/users/${req.session.userId}`);
    } else{
        res.redirect('/')
    }
   } catch(err){
    res.send(err)
   }
});
module.exports= router;
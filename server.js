const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const app = express()

require('./db/db')


const photosController = require('./controllers/photosController')


app.use('/photos', photosController);

const profilesController = require('./controllers/profilesControllers')




app.use('/profile', profilesController)


app.listen(3000, () => {
    console.log('listening on 3k')
})
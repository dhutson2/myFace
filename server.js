const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const app = express()

require('./db/db')

const profilesController = require('./controllers/profilesControllers')




app.use('/profile', profilesController)

app.listen(3000, () => {
    console.log('listening on 3k')
})
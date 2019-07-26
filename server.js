const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const app = express()
const session =require('express-session');


require('./db/db')

app.use(session({
	secret: "keepitsecretstring",
	resave: false,
	saveUninitialized: false
}))






app.get('/', (req, res) => {
	res.render('index.ejs')
})

const usersController = require('./controllers/users');
const profilesController = require('./controllers/profilesControllers')




app.use('/profile', profilesController)

app.listen(3000, () => {
    console.log('listening on 3k')
}
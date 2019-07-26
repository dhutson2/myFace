const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const session =require('express-session');


require('./db/db')

const usersController = require('./controllers/users');

const profilesController = require('./controllers/profilesControllers')

const photosController = require('./controllers/photosController')

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use('/photos', photosController);
app.use('/profile', profilesController)

app.use(session({
	secret: "keepitsecretstring",
	resave: false,
	saveUninitialized: false
}))






app.get('/', (req, res) => {
	res.render('index.ejs')
})









app.listen(3000, () => {
    console.log('listening on 3k')
});
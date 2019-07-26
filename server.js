const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()


require('./db/db')

const usersController = require('./controllers/usersController');


const photosController = require('./controllers/photosController')

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use('/photos', photosController);
app.use('/users', usersController)

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

})


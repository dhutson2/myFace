const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const app = express()


require('./db/db')

const usersController = require('./controllers/usersController');


const photosController = require('./controllers/photosController')


app.use(session({
	secret: "keepitsecretstring",
	resave: false,
	saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));


app.use((req, res, next) => {
	if(!req.session.logged)
	{
		req.session.userId = null;
	}
	res.locals.session = req.session
	next();
})

app.use('/photos', photosController);
app.use('/users', usersController)




app.use(express.static(__dirname + '/public'));





app.get('/', (req, res) => {
	res.render('index.ejs')
})









app.listen(3000, () => {
    console.log('listening on 3k')

})


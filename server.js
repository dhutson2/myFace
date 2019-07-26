const express = require('express')
const app = express()



const session =require('express-session');
require('./db/db')

const usersController = require('./controllers/users');


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
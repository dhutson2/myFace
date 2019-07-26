const express = require('express')
const app = express()

require('./db/db')

const photosController = require('./controllers/photosController')


app.use('/photos', photosController);

app.listen(3000, () => {
    console.log('listening on 3k')
})
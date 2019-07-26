const mongoose = require('mongoose')

const connectionString = ('mongodb://localhost/myface')

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true
})

mongoose.connection.on('connected', () => {
    console.log(`mongoose connected to ${connectionString}`)
})

mongoose.connection.on('disconnected', () => {
    console.log(`mongoose disconnected from ${connectionString}`)
})

mongoose.connection.on('error', () => {
    console.log(`mongoose err: ${err}`)
})
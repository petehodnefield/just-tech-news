const express = require('express')
const routes = require('./routes')
const sequalize = require('./config/connection')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Turn on routes
app.use(routes)

// Turn on connection to db and server
sequalize.sync({force: true}).then(() => {
    app.listen(PORT, () => console.log(`Now Listening! on ${PORT}`))
})
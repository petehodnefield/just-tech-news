const express = require('express')
const routes = require('./controllers')
const sequalize = require('./config/connection')
const path = require('path')


const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

// Turn on routes
app.use(routes)

// Turn on connection to db and server
sequalize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now Listening! on ${PORT}`))
})

const exphbs = require('express-handlebars')
const hbs = exphbs.create({})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

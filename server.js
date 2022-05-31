const express = require('express')
const routes = require('./controllers')
const sequalize = require('./config/connection')
const path = require('path')
const helpers = require('./utils/helpers')

const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sess = {
    secret: 'mydirtylittlesecret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequalize
    })
}


const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session(sess))


// Turn on routes
app.use(routes)

// Turn on connection to db and server
sequalize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now Listening! on ${PORT}`))
})

const exphbs = require('express-handlebars')
const hbs = exphbs.create({helpers})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

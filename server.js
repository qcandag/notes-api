import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
import passport from 'passport';
import flash from 'express-flash';
import session from 'express-session';
import authRoutes from './routes/auth.route.js'
import initializePassport from './config/passport.config.js'
import methodOverride from 'method-override'

initializePassport(passport)
dotenv.config()

const app = express()
app.set('view-engine', 'ejs')
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(methodOverride('_method'))
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoutes)


app.get('/',checkAuthenticated, (requstes, response) => response.render('index.ejs', {name: requstes.user.name}));

//Middleware Function
function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/auth/login')
}


app.listen(process.env.PORT, () => console.log(`Server running on port: http://localhost:${process.env.PORT}`))
import { Strategy as LocalStrategy } from 'passport-local'; 
import bcrypt from 'bcrypt'
import { findUserByEmail, findUserById } from '../controllers/auth.controller.js';

export default function initialize(passport) {
    async function authenticateUser (email, password, done) {
        const user = findUserByEmail(email)
        if(!user) return done(null, false, {message: 'No user with that email.'})
        try {
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else {
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch (error) {
            return done(error)
        }
    } 
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, authenticateUser))
    passport.serializeUser((user, done) => done(null,user.id))
    passport.deserializeUser((id, done) => {
        done(null, findUserById(id))
    })
}

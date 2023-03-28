import express from "express";
import passport from "passport";
import { loginView, register, store } from "../controllers/auth.controller.js";

const router = express.Router();


router.get('/login',checkNotAuthenticated, loginView)
router.post('/login',checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
}))

router.get('/register',checkNotAuthenticated, register)
router.post('/register',checkNotAuthenticated, store)

router.delete('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})
export default router;

// Middleware Function
function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return next()
}
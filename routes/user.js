const express = require("express");
const router = express.Router();
const User = require("../models/user");
const flash = require("flash");
const passport = require("passport");
const { storeReturnTo } = require('../middleware');

router.get("/register", (req,res)=>{
    res.render("users/register.ejs")
})
router.post("/register",async(req,res)=>{
try{
    const {email, username , password} = req.body;
    const user = new User({email, username});
    const registerUser= await User.register(user, password);
    req.login(registerUser,err=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to CampSpotter");
        res.redirect("/campgrounds")
    })

}
catch(e){
    req.flash("error", e.message);
    res.redirect("register");
}
});

router.get("/login", (req,res)=>{
    res.render("users/login.ejs");
})

router.post("/login", storeReturnTo,passport.authenticate("local", {failureFlash:true, failureRedirect:"/login"}),(req,res)=>{
    req.flash("success","Welcome Back");
    const redirectUrl = res.locals.returnTo || '/campgrounds'; 
    res.redirect(redirectUrl);
})
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}); 

module.exports = router;
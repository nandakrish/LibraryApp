const express = require('express');
const authRouter = express.Router();
const Userdata = require('../model/Userdata');

function router(nav) {
    authRouter.get('/login', function (req, res) {

        //var newPath=req.originalUrl.split('/auth')[1]
        //res.redirect(req.path);
        res.render("login",
            {
                nav
            });
    });
    authRouter.get('/signup', function (req, res) {
        res.render("signup",
            {
                nav
            });
    });
    authRouter.post('/adduser', function (req, res) {
        var item = {
            type: req.body.type,
            fname: req.body.firstname,
            lname: req.body.lastname,
            phone: req.body.phonenumber,
            email: req.body.email,
            password: req.body.password
        };
        var user = Userdata(item);
        user.save();
        res.redirect('/auth/login');
    });
    authRouter.post('/validate', function (req, res) {
        const email=req.body.email;
        const password=req.body.password;
        Userdata.findOne({email:email,password:password},(er,user)=>{
            if(user){
                res.redirect('/');
            }
            else{
                res.render("login",{error:"Invalid Authentication",nav});
            }


        })
       // .then(function(er,user){

        // })


    });
    
    return authRouter;
}
module.exports = router;
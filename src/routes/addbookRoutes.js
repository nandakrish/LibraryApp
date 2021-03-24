const express = require('express');
const fileUpload = require('express-fileupload');
const addbookRouter = express.Router();
const Bookdata = require('../model/Bookdata');
const path = require('path');

//const fs=require('fs');

function router(nav) {


    addbookRouter.get('/', function (req, res) {
        res.render("addbook",
            {
                nav
            });
    });
    addbookRouter.get('/delete/:id', function (req, res) {
        const id = req.params.id;
        Bookdata.findOneAndDelete({ _id: id })
            .then(function (book) {
                res.redirect('/books');
            });
    });
    addbookRouter.get('/:id', function (req, res) {
        const id = req.params.id;
        Bookdata.findOne({ _id: id })
            .then(function (book) {
                res.render("editbook", {
                    nav,
                    book
                });
            });
    });
    addbookRouter.post('/edit/:id', function (req, res) {
        const id = req.params.id;
        if (req.files) {
            var itemedit = {
                title: req.body.bookname,
                author: req.body.authorname,
                genre: req.body.genre,
                //image:req.body.preview
                image: req.files.filetag.name
            };
        }
        else {
            var itemedit = {
                title: req.body.bookname,
                author: req.body.authorname,
                genre: req.body.genre,
                image: req.body.image
            };
        }
        Bookdata.findOne({ _id: id })
            .then(function (book) {
                if (!book) {
                    return next(new Error('Could not load Document'));
                }
                else {
                    var bookedit = Bookdata(itemedit);
                    // bookedit.save();
                    Bookdata.findByIdAndUpdate(id, itemedit, (er, book1) => {
                        res.redirect('/books/' + book1._id);
                    });
                }
            });
    });



    addbookRouter.post('/add', function (req, res) {
        //res.send("Hey I am added");
        //get method
        // var item={
        //     title:req.query.bookname,
        // author:req.query.authorname,
        // genre:req.query.genre,
        // image:req.query.filetag
        // }
        if (req.files) {
            var item = {
                title: req.body.bookname,
                author: req.body.authorname,
                genre: req.body.genre,
                image: req.files.filetag.name
            };
        }
        else {
            var item = {
                title: req.body.bookname,
                author: req.body.authorname,
                genre: req.body.genre,
                image: req.body.image
            };
        }
        var book = Bookdata(item);
        // book.save();
        // fs.writeFile("../public/images/file.png",item.image,'binary',function(err){
        //     console.log("The File was saved");
        // });
        Bookdata.create(book, (er, book) => {
            let imageFile;
            let uploadpath = "";
            if (!req.files || Object.keys(req.files).length === 0) {
                //return res.status(400).send('No files were uploaded.');
                res.redirect('/books');
            }
            else {
                //console.log('req.files >>>', req.files); // eslint-disable-line    
                // The name of the input field (i.e. "imageFile") is used to retrieve the uploaded file
                imageFile = req.files.filetag;
                //console.log(__dirname);
                //console.log(path.join(__dirname, '../../public/images/', imageFile.name));
                uploadpath = path.join(__dirname, '../../public/images/', imageFile.name);
                //   "/public/images/" + imageFile.name;    
                // Use the mv() method to place the file somewhere on your server
                imageFile.mv(uploadpath, function (err) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    //res.send('File uploaded!'+uploadpath);
                    res.redirect('/books');
                });
            }
        });
        // res.render("addbook",
        //     {
        //         nav
        //     });
    });

    return addbookRouter;
}
module.exports = router;
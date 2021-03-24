const express = require('express');
const fileUpload = require('express-fileupload');
const addauthorRouter = express.Router();
const Authordata = require('../model/Authordata');
const path = require('path');

function router(nav) {
    addauthorRouter.get('/', function (req, res) {
        res.render("addauthor",
            {
                nav
            });
    });
    addauthorRouter.get('/delete/:id', function (req, res) {
        const id = req.params.id;
        Authordata.findOneAndDelete({ _id: id })
            .then(function (author) {
                res.redirect('/authors');
            });
    });
    addauthorRouter.get('/:id', function (req, res) {
        const id = req.params.id;
        Authordata.findOne({ _id: id })
            .then(function (author) {
                res.render("editauthor", {
                    nav,
                    author
                });
            });
    });
    addauthorRouter.post('/edit/:id', function (req, res) {
        const id = req.params.id;
        if (req.files) {
            var itemedit = {
                title: req.body.authorname,
                bestbook: req.body.bestbookname,
                award: req.body.award,
                image: req.files.filetag.name
            };
        }
        else {
            var itemedit = {
                title: req.body.authorname,
                bestbook: req.body.bestbookname,
                award: req.body.award,
                image: req.body.image
            };
        }

        Authordata.findOne({ _id: id })
            .then(function (author) {
                if (!author) {
                    return next(new Error('Could not load Document'));
                }
                else {

                    var authoredit = Authordata(itemedit);
                    Authordata.findByIdAndUpdate(id, itemedit, (er, author1) => {
                        let imageFile;
                        let uploadpath = "";
                        if (!req.files || Object.keys(req.files).length === 0) {
                            //return res.status(400).send('No files were uploaded.');
                            return res.redirect('/authors/' + author1._id);
                        }
                        else {
                            imageFile = req.files.filetag;
                            uploadpath = path.join(__dirname, '../../public/images/', imageFile.name);
                            imageFile.mv(uploadpath, function (err) {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                                res.redirect('/authors/' + author1._id);
                            });
                        }

                    });
                }
            })
            .catch(er => {
                console.error(er)
            });
    });



    addauthorRouter.post('/add', function (req, res) {

        if (req.files) {
            var item = {
                title: req.body.authorname,
                bestbook: req.body.bestbookname,
                award: req.body.award,
                image: req.files.filetag.name
            };
        }
        else {
            var item = {
                title: req.body.authorname,
                bestbook: req.body.bestbookname,
                award: req.body.award,
                image: req.body.image
            };
        }
        var author = Authordata(item);
        Authordata.create(author, (er, author) => {
            // }))
            //author.save(er,author=>{
            let imageFile;
            let uploadpath = "";
            if (!req.files || Object.keys(req.files).length === 0) {
                // return res.status(400).send('No files were uploaded.');
                res.redirect('/authors');
            }
            else {
                imageFile = req.files.filetag;
                uploadpath = path.join(__dirname, '../../public/images/', imageFile.name);
                imageFile.mv(uploadpath, function (err) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/authors');
                });
            }
        });

    });

    return addauthorRouter;
}
module.exports = router;
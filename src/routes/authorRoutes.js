const express = require('express');
const authorsRouter = express.Router();
const Authordata=require('../model/Authordata');
function router(nav) {
    // var authors = [
    //     {
    //         title: 'Joseph Barbera',
    //         book: 'Tom and Jerry',
    //         genre: 'Cartoon',
    //         img: 'jbarbera.jpg'
    //     },
    //     {
    //         title: 'J K Rowling',
    //         book: 'Harry Potter',
    //         genre: 'Fantacy',
    //         img: 'jkrowling.jpg'
    //     },
    //     {
    //         title: 'Basheer',
    //         book: 'Pathummayude Aadu',
    //         genre: 'Drama',
    //         img: 'basheer.jpg'
    //     }
    // ]


    authorsRouter.get('/', function (req, res) {
        Authordata.find()
        .then(function(authors){
            res.render("authors",
            {
                authors,
                nav
            });
        });        
    });
    authorsRouter.get('/:id',function(req,res){
        const id=req.params.id;
        Authordata.findOne({_id:id})
        .then(function(author){
            res.render('author',{
                nav,
                author
            });
        });        
    });    
    return authorsRouter;
}
module.exports = router;
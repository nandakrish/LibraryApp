const express=require('express');
const fileUpload=require('express-fileupload');
const app = new express();
const path=require('path');
const port=process.env.PORT||5000;

const nav=[{link:'/index',name:'Home'},
{link:'/books',name:'Books'},
{link:'/authors',name:'Authors'},
{link:'/auth/login',name:'Log-In'},
{link:'/auth/signup',name:'Sign-Up'},
{link:'/addbook',name:'Add New Book'},
{link:'/addauthor',name:'Add New Author'}]


const booksRouter=require('./src/routes/bookRoutes')(nav);
const authorsRouter=require('./src/routes/authorRoutes')(nav);
const authRouter=require('./src/routes/authRoutes')(nav);
const addbookRouter=require('./src/routes/addbookRoutes')(nav);
const addauthorRouter=require('./src/routes/addauthorRoutes')(nav);


app.use(fileUpload());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./src/views');
app.use('/books',booksRouter);
app.use('/authors',authorsRouter);
app.use('/auth',authRouter);
app.use('/addbook',addbookRouter);
app.use('/addauthor',addauthorRouter);



app.get('/',function(req,res){
    res.render("index",{nav});
});
app.get('/index',function(req,res){
    res.render("index",{nav});
});
app.get('/auth/index', function(req, res) {
    res.redirect('/');
});

app.listen(port,()=>{console.log("Server ready at 5000")});

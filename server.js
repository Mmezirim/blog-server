const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const Comment = require('./models/comment');

const app = express(); 
app.set ('view engine', 'ejs', 'HTML'); 

const mongoURI = 'mongodb+srv://Kevin:Chibuoyim@cluster0.qyty0yo.mongodb.net/Kevin?retryWrites=true&w=majority';
mongoose.connect(mongoURI).then((result)=> app.listen(3000, (req,res)=>{
    console.log('server running on port 3000')}))
.catch((err)=>console.log(err));
const db = mongoose.connection;
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.get('/', (req,res)=>{
    res.redirect('/login');
}); 
app.get('/login', (req,res)=>{
    res.render('Signup', {title: 'Login to your blog'});
}); 
app.get('/about', (req,res)=>{
    res.render('about', {title: 'About'});
});
app.get('/blogs', (req,res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('index',{title: 'All blogs', blogs: result})
    })
    .catch((err) =>{
        console.log(err)
    }) 
});  
app.get('/blogs/create', (req,res)=>{
    res.render('create', {title: 'Create a new blog'});
}); 
app.get('/Comments', (req,res)=>{
    Comment.find().sort({createdAt: -1})
    .then((result) => {
        res.render('comments',{title: 'Comments', comments: result})
    })
    .catch((err) =>{
        console.log(err)
    })
});   
app.post('/Login', (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;   
    const data = {
        "email": email,
        "password": password
    }
    db.collection('Login').insertOne(data, (err, collection)=>{
        if(err)
            throw err;
        console.log("Done")
    });
    return res.redirect('/blogs')
});
app.post('/comment', (req, res) => {
    const comment = new Comment(req.body);
    comment.save()
    .then((result) =>{
        res.redirect('/Comments');
    })
    .catch((err) =>{
        console.log(err);
    })
}); 
app.post('/blogs', (req, res) =>{
    const blog = new Blog(req.body);
    blog.save()
    .then((result) =>{
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    })
});

app.get('/blogs/:id',(req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        res.render('details', {blog: result, title: 'Blog details'});
    })
    .catch((err) => {
        console.log(err);
    });
})
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({redirect: '/blogs'});
    })
    .catch((err) => {
        concoler.log(err);
    })
})

app.use((req,res) =>{
     res.status(404).render('404', {title: '404'}) 
});
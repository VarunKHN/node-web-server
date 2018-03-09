const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
})

app.use((req, res, next) =>{
    var now = new Date().toString();
    let log = `${now} : ${req.method} and ${req.url}`;

    fs.appendFile('server.log',log + '/n', (err) =>{
        if(err){
            console.log('Unable to append file');
        }
    })
    console.log(log);
    next();
})

// app.use((req, res, next) =>{
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
})

app.get('/', (req,res) =>{
    res.render('home.hbs',{
        pageTitle : 'Home Page',
        h1Tag : 'Welcome to Home page'
    });
});

app.get('/about', (req,res) =>{
    res.render('about.hbs',{
        pageTitle : 'About Page',
        h1Tag : 'Welcome to About page'
    });
});

app.get('/projects', (req,res) =>{
    res.render('projects.hbs',{
        pageTitle : 'Projects Page',
        h1Tag : 'Porfolio'
    });
});

app.get('/bad', (req,res) =>{
    res.send({
        error : 'Bad Request'
    });
});

app.listen(port,() => {
    console.log(`Server is up and running on port ${port}`);
});
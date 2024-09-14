const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { log } = require('console');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

// Middleware example
// app.use(function(req, res, next){
//     console.log('Middleware triggered');
//     next();
// });

app.get('/', function(req, res) {
    fs.readdir('./filess', function(err, filess) {
        if (err) {
            console.error("Error reading directory:", err);
            return res.status(500).send("Error reading files.");
        }
        res.render('index', { files: filess });
    });
});

app.get('/secod/:username', function(req, res) {  
    // Dynamic route example
    res.render('secod', { username: req.params.username });
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});

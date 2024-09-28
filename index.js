const express = require('express');
const app = express();
const path = require('path');
const fs = require('node:fs');
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
app.post('/create', function(req,res){
    const filename=req.body.title.split(' ').map(function(val){
        return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
    }).join('');

    const filepath=`./filess/${filename}.tsx`;
    const filDescription= req.body.Description || 'Default file Description'

    fs.writeFile(filepath,filDescription, (err)=>{
        console.log(filDescription);
        
        if(err){
            console.log('error while writing the file');
            return res.status(500).send('error creaaating file');

            
        }
        console.log('file created successfully : ', filepath);
        res.redirect('/')
        
    })
   
})

app.get('/filess/:filename', function(req, res) {

    fs.readFile(`/home/roshan/Desktop/BackendProjectOne/filess/${req.params.filename}`, 'utf-8' ,function(err,data){
      
        //console.log(`${data} and ${req.params.filename}`);

        // if (err) {
        //     console.error(`Error reading file: ${err}`);
        //     return res.status(404).send('File not found');
        // }
        // console.log(`${data} and ${req.params.filename}`);
        // res.send(`${req.params.filename} ${data}`);
res.render('show',{filename:req.params.filename ,data:data})
// console.log(res.json());
// readFile(filepath, 'utf-8', function(err, content) {
//     if (err) {
//         console.error('Error reading file:', err);
//         return res.status(500).send('Error reading file');
//     }
//     res.render('show', { filename: req.params.filename, content });
// });

    })
    // fs.readFile(`./files` function(err, filess) {
    //     if (err) {
    //         console.error("Error reading directory:", err);
    //         return res.status(500).send("Error reading files.");
    //     }
    //     res.render('index', { files: filess });
   // });
});
// app.get('/secod/:username', function(req, res) {  
//     // Dynamic route example
//     res.render('secod', { username: req.params.username });
// });

app.get('/edit/:filename', function(req,res){

    const newfilename=req.body.title.split(' ').map(function(val){
        return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
    }).join('');

    const oldfilepath=`./filess/${req.params.filename}.tsx`;
    const newFilePath=`./filess/${newfilename}.tsx`

    fs.rename(oldfilepath,newFilePath, (err)=>{
        console.log('file renamed',newFilePath);

        res.redirect('/')
        
    })
     
})
    // res.send('shyad ho gya hai')
    // const newfilename=req.body.title.split(' ').map(function(val){
    //     return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
    // }).join('');
    // fs.rename(filename,newfilename,(err)=>{
    //     if(err) throw err;
    //     console.log('shayd tum sahi ho');
        
    // })
//})

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});

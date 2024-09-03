const { render } = require('ejs');
const express= require('express');
const app= express();
const path= require('path')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname ,'public')))
// app.use(function(req,res,next ,){

//     console.log('ku6 to hua par pata nahi');
//     next();
// })
app.set('view engine', 'ejs')

app.get('/',function(req,res){
    res.render('index')
});
app.get('/second/:username',function(req,res){  // i made this route dynamic
    res.render('secod')
})

app.listen(3000 ,function(){
    console.log("its working");
    
})


// const path=require('path');
// console.log(path.join(__dirname +'/public'));

// module requirements
const express = require('express')
const qrcode = require('qrcode')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
//setting path to view folder
const viewsPath = path.join(__dirname,'./views')
//setting middleware
app.set('views',viewsPath)
app.set('view engine','hbs')
app.use(bodyParser.urlencoded({extended:true}))
//routing the GET requests
app.get('/',(req,res)=>{
    res.render('index')
})
// 404 page handling
app.get('*',(req,res)=>{
    res.render('404')
})
//routing the POST request
app.post('/qrcode',(req,res)=>{

    qrcode.toDataURL(req.body.data,(err,url)=>{
        if(err) console.log('Sorry we got an error: ',err)
        res.render('qrcode',{
            userInput:req.body.data,
            imgSrc:url
        })
    })
    
})


//server activation
app.listen('3000',()=>{
    console.log('local server is listenint on port 3000')
})
const credentials= require("./credentials")
const express = require("express");
const cookie=require("cookie-parser");
var handlebars = require("express-handlebars")
    .create({defaultLayout:'main',  
});

let app= express();

app.use(cookie('secret','credentials.cookiesecret'))
app.use(express.urlencoded({ extended:true}))
app.use(express.json());
app.engine('handlebars',handlebars.engine)
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'));
let confirm=''
app.get('/', function(req, res){
    res.render('home')
})

function validatecookies(req,res,next) {
    const {cookies}=req
    console.log(cookies)
    next()

}
const requireJsonContent = (request, response, next) => {
    if (request.headers['content-type'] !== 'application/json') {
        console.log('1',request.headers['content-type'])
        response.status(400).send('Server requires application/json')
    } else {
      next()
    }
  }
app.use('/process-form',requireJsonContent)

app.post('/process-form', function(req, res){
    confirm=req.headers['content-type'];
    res.type('application/json')
      console.log('2',confirm)
      console.log("form submitted")
       res.redirect('/')
      
})
app.get('/form', validatecookies,function(req, res){
    res.cookie('session_id','nom nom',{HttpOnly:true})
    res.render('form')
})


app.get('/thank-you.html', function(req, res){
    console.log(req.body.name);
})

app.listen(5500, function(req,res){
    console.log('listening on 5500')

})


///HERE 'S the message from console


PS C:\Users\adeyt\Documents\programming\learn html,js,css> node form.js
listening on 5500
{ session_id: 'nom nom' }
2 application/json
form submitted
1 application/x-www-form-urlencoded


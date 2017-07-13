var http = require('http');
var fs = require('fs');
var qs = require('querystring');
const pug = require('pug');
const express = require('express');
const bodyParser = require ('body-parser');
var app = express();
app.set('view engine','pug');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  fs.readFile('savedItems.txt','utf8',function(err, data) {
      if (err) throw err;
      res.render('index',{list: data.split("\n")})
  })
})

app.post('/add-todo', function (req, res) {
  var toDoItem = req.body.toDo;
  fs.appendFile("savedItems.txt",toDoItem+"\n", function (err){
    if(err){console.error("Something went wrong", err);}
  console.log("appended to file");
  res.redirect(301, '/');
})

})
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})


app.listen(3000);
console.log("listening to 3000");
console.log("listening to 1337");

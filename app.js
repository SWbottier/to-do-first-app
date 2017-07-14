const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const pug = require('pug');
const express = require('express');
const bodyParser = require ('body-parser');
const MongoClient = require('mongodb').MongoClient;

var app = express();
const url = 'mongodb://localhost:27017/ToDo';

//////// WORK IN PROGRESS (WIP) TO USE MONGO DB
const insertTask = function(db, callback) {
  var collection = db.collection('tasks');

  collection.insertOne(
    {name: "Wash the car!"},
    function(err, result) {
      if(err) { console.error("Insert One broke! ", err)}
      console.log('the result =============')
      console.log(result)
      callback(result);
    });
}

MongoClient.connect(url, function (err, db) {
  if (err) throw err
  console.log('connect to DB successful');

  insertTask(db, function(){
    db.close();
  });
});
//// END WIP FOR MONGO DB
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

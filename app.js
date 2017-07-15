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
const insertTask = function(db, callback, item) {

collection.insertOne(
    {name: item}, // need to make ToDoItem name dynamic
    function(err, result) {
      if(err) { console.error("Insert One broke! ", err)}
  callback();
    });
}

var db;

MongoClient.connect(url, function (err, database) {
  if (err) throw err
  console.log('connect to DB successful');
  db = database;
    app.listen(3000, () => {
    console.log('listening on 3000')  })
        //
        // insertTask(db, function(){
        // db.close();
        //   }, "something");
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

// maybe: Connect to MongoDB ****************************************
  app.post('/add-todo', function (req, res) {
      var toDoItem = req.body.toDo;
        db.collection('tasks').save({name:toDoItem}, function(err,result){
            if (err) return console.log(err);

              console.log('saved to database')
                res.redirect('/')
                })

// maybe: Connect to MongoDB ****************************************

// insertTask(someDB, callbackFn, toDoItem)
//   res.redirect(301, '/');
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

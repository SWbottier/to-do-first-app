const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const pug = require('pug');
const express = require('express');
const bodyParser = require ('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

var app = express();
const url = 'mongodb://localhost:27017/ToDo';

var db;

MongoClient.connect(url, function (err, database) {
  if (err) throw err
  console.log('connect to DB successful');
  db = database;
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
});

app.set('view engine','pug');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  var displayItems = db.collection('tasks').find();
  displayItems.toArray(function (err, docs) {
    if (err) return console.log(err);
    res.render('index', {listOfToDoItems: docs});
  })
})

//Add ToDo
app.post('/add-todo', function (req, res) {
  var toDoItem = req.body.toDo;
  db.collection('tasks').save({name:toDoItem}, function(err,result){
    if (err) return console.log(err);
    console.log('saved to database')
    //ajax code
    const addToSend = JSON.stringify(result.ops[0]);
    // console.log(result.ops[0].toString());
    // console.log(addToSend);
    res.send(addToSend);

  })
})

// localhost:3000/delete-todo/123
app.post('/delete-todo/:idToDelete', function(req,res){
  db.collection('tasks').deleteOne(
    {
    _id: ObjectID(req.params.idToDelete)
    }, function(err, data){
    if(err) return console.log(err);
    console.log('deleted')
    console.log('deleted')
    //ajax code
    res.send(ObjectID(req.params.idToDelete))
  })
})

app.use(express.static('public'))
// Edit Button
app.post('/edit-todo/:idToEdit',function (req,res){
  db.collection('tasks').updateOne({
    _id: ObjectID(req.params.idToEdit)},{$set:{name:req.body.editToDo}},
   function(err,r){
     if (err) console.log(err);
     console.log("Updated!")
     res.redirect('/')
   })
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

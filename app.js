var http = require('http');
var fs = require('fs');
var qs = require('querystring');
const pug = require('pug');

function errorResponse(res){
  res.statusCode = 404;
  res.end("404 not found!")
}
var server = http.createServer(function (req,res){
  if(req.url == "/" && req.method == 'GET'){
    // print logged to-dos onto homepage display
    fs.readFile('savedItems.txt','utf8',function(err, data) {
      if (err) throw err;
      console.log()
      res.end(pug.renderFile('index.pug',{list: data.split("\n")}))
})


    } else if (req.url == "/add-todo" && req.method == 'POST') {
      var body = '';
      req.on('data', function(chunk){
      body += chunk
    }).on('end', function(){
      var toDoItem = qs.parse(body).toDo;
      // save or write to a text file
      fs.appendFile("savedItems.txt",toDoItem+"\n", function (err){
        if(err){console.error("Something went wrong", err);}
      console.log("appended to file");
      //redirect back to homepage, needs status code 301 to redirect.
      res.writeHead(301, {Location: "/"});
      res.end();
      })
    });
  } else {
    errorResponse(res);
  }
})

server.listen(1337,"localhost")
console.log("listening to 1337");

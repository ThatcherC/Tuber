//server.js for tuber

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(express.static('static'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(8080);

app.post("/",function(req, res){
  res.send(req.body);
});

http://stackoverflow.com/questions/4529586/render-basic-html-view-in-node-js-express
app.get("/",function(req,res){
	res.render('main');
});

walkingObject = {time, cost, energy, [directions]}


function makeMode(name, baseMode, eval){
  var obj = {'name': name,
             'baseMode': baseMode,
             'eval':eval};
  return obj;
}

var modes = [
  {name: "Cartwheel",
   eval: function(walkingObject){
     walkingObject.time = walkingObject.time*0.8;
     walkingObject.energy = walkingObject.energy*2.5;
   }
  },

]

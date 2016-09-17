//server.js for tuber

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');


//walkingObject = {time, cost, energy, [directions]}
var modeList = {};

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


function addMode(name, baseMode, eval){
  var obj = {'name': name,
             'baseMode': baseMode,
             'eval':eval};
  modeList[name] = obj;
}

addMode("Cartwheeling", 'walking', function(walkingObject){
  walkingObject.time = walkingObject.time*0.7;
  walkingObject.energy = walkingObject.energy*2.5;
});

//start = start location as a string
//destination =   end location as a string
//enabledModes = list of names of enabled modes as strings
//optimizationParameter = "time", "cost", "energy", "style points"
//optimizationDirection = "up","down"
/*
function findBestMode(start, destination, enabledModes, optimizationParameter, optimizationDirection){
  walkingObject = getWalkingDirections();
  drivingObject = getDrivingDirections();

  var modeResults = [];

  for(var i = 0; i < enabledModes.length; i++){
    var result = modeList[enabledModes[i]].eval();
    modeResults[i] = result;
  }

  //sort modes by chosen paramter
}
*/

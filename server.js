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

//Receives post data from the browser. Data is stored in the object req.body
app.post("/",function(req, res){
  res.send(req.body);
});

//http://stackoverflow.com/questions/4529586/render-basic-html-view-in-node-js-express
app.get("/",function(req,res){
	res.render('main');
});

//Creates a new mode with a name, a base mode (walking, driving, or other),
//and a function to modify the base mode.
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
    var object = {};
    if(modeList[enabledModes[i]].baseMode == 'walking'){
      object = JSON.parse(JSON.stringify(walkingObject));
    }else if(modeList[enabledModes[i]].baseMode == 'driving'){
      object = JSON.parse(JSON.stringify(drivingObject));
    }else{
      //what TODO here? pass start and end lat/lng to object???
    }
    var result = modeList[enabledModes[i]].eval(object);
    modeResults[i] = result;
  }

  //sort modes by chosen paramter
}
*/

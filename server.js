//server.js for tuber

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var endPoints = {};
const APIKEY = "AIzaSyDjyS7OrT48xkaHmbR5nJEvS-QO3pLTk8A"
var modeList = {};



var app = express();
app.use(express.static('static'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(8080);

//Receives post data from the browser. Data is stored in the object req.body
app.post("/",function(req, res, endPoints){
	// var modes = {"driving":"", "walking":"", "bicycling":""};
	endPoints = req.body;
	findBestMode(endPoints, null, null, null);

<<<<<<< HEAD
  	// API retrieval

  	//Load the request module
  	var request = require('request');
  	var apiKey = "AIzaSyDjyS7OrT48xkaHmbR5nJEvS-QO3pLTk8A"
  	var apiUrl = "";

  	for (int i = 0; i < 3; i++) {
  		apiUrl = "https://maps.googleapis.com/maps/api/directions/json?origin="
  		+ endPoints["start"] + "&destination=" + endPoints["end"] + "&mode" +
  		mode + "&key=" + apiKey
  		var keys = Object.keys(modes)
  		request(apiUrl, function (error, response, body) {
		if (!error && response.statusCode == 200) {
        	modes[keys[i]] = JSON.parse(body);
      		console.log(modes[keys[i]["routes"][0]["legs"]]);
     	}
    });
  	}
  	//Lets try to make a HTTP GET request to modulus.io's website.
=======
  res.send(req.body);
>>>>>>> 1753418d944f38d869c009e7a6c73fe89ab05e95
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

addMode("Cartwheeling", 'walking', function(walkingObject){
  var cartwheelingObject = {};
  cartwheelingObject.time = walkingObject.time*5.4;
  cartwheelingObject.energy = walkingObject.energy*12.5;
  cartwheelingObject.stylepoints = walkingObject.stylepoints*21;
  return cartwheelingObject;
});

addMode("Hoverboarding- Back to the Future Style", 'biking', function(bikingObject){
  var hoverboardingObject = {};
  hoverboardingObject.time = bikingObject.time*0.7;
  hoverboardingObject.energy = bikingObject.energy*0.1;
  hoverboardingObject.stylepoints = bikingObject.stylepoints*65;
  return hoverboardingObject;
});

addMode("Leapfrogging", 'walking', function(walkingObject){
	var leapfroggingObject = {};
  leapfroggingObject.time = walkingObject.time*5.9;
  leapfroggingObject.energy = walkingObject.energy*8.1;
  leapfroggingObject.stylepoints = walkingObject.stylepoints*54;
  return leapfroggingObject;
});

addMode("Wheelchair", 'walking', function(walkingObject){
	var wheelchairObject = {};
  wheelchairObject.time = walkingObject.time*2.9;
  wheelchairObject.energy = walkingObject.energy*0;
  walkingObject.stylepoints = walkingObject.stylepoints*12;
  return wheelchairObject;
});

addMode("Skateboarding", 'walking', function(walkingObject){
  var skateboardingObject = {};
  skateboardingObject.time = bikingObject.time*1.7;
  skateboardingObject.energy = bikingObject.energy*2.6;
  skateboardingObject.stylepoints = bikingObject.stylepoints*15;
  return skateboardingObject;
});

addMode("Golfcarting", 'biking', function(walkingObject){
  var golfcartingObject = {};
  golfcartingObject.time = bikingObject.time*1.7;
  golfcartingObject.energy = bikingObject.energy*2.6;
  golfcartingObject.stylepoints = bikingObject.stylepoints*15;
  return golfcartingObject;
});

//start = start location as a string
//destination =   end location as a string
//enabledModes = list of names of enabled modes as strings
//optimizationParameter = "time", "cost", "energy", "style points"
//optimizationDirection = "up","down"


function findBestMode(endPoints,
										  enabledModes,
										  optimizationParameter,
										  optimizationDirection)
{
	var request = require('request');
  walkingObject = getWalkingDirections(endPoints, request);
  drivingObject = getDrivingDirections(endPoints, request);
  bikingObject = getBikingDirections(endPoints, request);

  var modeResults = [];

  for(var i = 0; i < enabledModes.length; i++){
    var object = {};
    if(modeList[enabledModes[i]].baseMode == 'walking') {
      object = JSON.parse(JSON.stringify(walkingObject));
    }
    else if(modeList[enabledModes[i]].baseMode == 'driving') {
      object = JSON.parse(JSON.stringify(drivingObject));
    }else if(modeList[enabledModes[i]].baseMode == 'biking'){
      object = JSON.parse(JSON.stringify(drivingObject));
    }else {
      //what TODO here? pass start and end lat/lng to object???
    }
    var result = modeList[enabledModes[i]].eval(object);
    modeResults[i] = result;
  }

  //sort modes by chosen paramter
}

function getWalkingDirections(endPoints, request)
{
	var mode = null;
	apiUrl = "https://maps.googleapis.com/maps/api/directions/json?origin="
  + endPoints["start"] + "&destination=" + endPoints["end"] +
  "&mode=walking&key=" + APIKEY

	request(apiUrl, function (error, response, body) {
		if (!error && response.statusCode == 200) {
      mode = JSON.parse(body);
    	console.log(mode["routes"][0]["legs"]);
   	}
  });
	return mode;
}

function getDrivingDirections(endPoints, request)
{
	var mode = null;
	apiUrl = "https://maps.googleapis.com/maps/api/directions/json?origin="
  + endPoints["start"] + "&destination=" + endPoints["end"] +
  "&mode=driving&key=" + APIKEY

  request(apiUrl, function (error, response, body) {
		if (!error && response.statusCode == 200) {
       mode = JSON.parse(body);
    	console.log(mode["routes"][0]["legs"]);
    }
  });
  return mode;
}

function getBikingDirections(endPoints, request)
{
	var mode = null;
	apiUrl = "https://maps.googleapis.com/maps/api/directions/json?origin="
  + endPoints["start"] + "&destination=" + endPoints["end"] +
  "&mode=bicycling&key=" + APIKEY

  request(apiUrl, function (error, response, body) {
			if (!error && response.statusCode == 200) {
         mode = JSON.parse(body);
      	console.log(mode["routes"][0]["legs"]);
     	}
   });
  return mode;
}

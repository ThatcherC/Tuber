//server.js for tuber

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var apis = require("./apis");
var modes = require("./modes");



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


  	// API retrieval

  	//Load the request module
  	var request = require('request');
  	var apiKey = "AIzaSyDjyS7OrT48xkaHmbR5nJEvS-QO3pLTk8A"
  	var apiUrl = "";

  	for (var i = 0; i < 3; i++) {
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

  res.send(req.body);

});

//http://stackoverflow.com/questions/4529586/render-basic-html-view-in-node-js-express
app.get("/",function(req,res){
	res.render('main');
});


console.log(modes.modeList);

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
  walkingObject = apis.getWalkingDirections(endPoints, request);
  drivingObject = apis.getDrivingDirections(endPoints, request);
  bikingObject = apis.getBikingDirections(endPoints, request);

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

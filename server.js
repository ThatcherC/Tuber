//server.js for tuber

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var apis = require("./apis");
var modes = require("./modes");



var app = express();
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(8080);

//Receives post data from the browser. Data is stored in the object req.body
app.post("/",function(req, res, endPoints){
	endPoints = req.body;
	findBestMode(endPoints, null, null, null);
	res.send(req.body);
	// var modes = {"driving":"", "walking":"", "bicycling":""};
	endPoints = {start: req.body.start, end:req.body.end};

  //Test: shows driving direction for endpoints
  apis.getDrivingDirections(endPoints,function(otpt){
    console.log(otpt);
  });
});

//http://stackoverflow.com/questions/4529586/render-basic-html-view-in-node-js-express
app.get("/",function(req,res){
	res.render('main',{modes: modes.modeList});
});

//endPoints = contains the starting and destination locations
//enabledModes = list of names of enabled modes as strings
//optimizationParameter = "time", "cost", "energy", "style points"
//optimizationDirection = "up","down"
function findBestMode(endPoints,
										  enabledModes,
										  optimizationParameter,
										  optimizationDirection)
{
  apis.getWalkingDirections(endPoints, function(walkingObject){
    apis.getDrivingDirections(endPoints, function(drivingObject){
      apis.getBikingDirections(endPoints, function(bikingObject){

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


      });
    });
  });
}

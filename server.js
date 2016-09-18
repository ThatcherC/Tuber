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
app.post("/",function(req, res){
	var endPoints = req.body;

  var enabledModes = Object.keys(req.body).slice(2);

	findBestMode(endPoints, enabledModes, null, null,function(sortedResults){
    res.render('main',{modes: modes.modeList, results: sortedResults, dataAsString: JSON.stringify(sortedResults)});
  });
	//res.send(req.body);
});

//http://stackoverflow.com/questions/4529586/render-basic-html-view-in-node-js-express
app.get("/",function(req,res){
	res.render('main',{modes: modes.modeList, results:null, dataAsString: "{}"});
});



//endPoints = contains the starting and destination locations
//enabledModes = list of names of enabled modes as strings
//optimizationParameter = "time", "cost", "energy", "style points"
//optimizationDirection = "up","down"


function findBestMode(endPoints,
										  enabledModes,
										  optimizationParameter,
										  optimizationDirection,
                      callback)
{
  apis.getWalkingDirections(endPoints, function(walkingObject){
    console.log("Got walking directions...");
    apis.getDrivingDirections(endPoints, function(drivingObject){
      console.log("Got driving directions...");
      apis.getBikingDirections(endPoints, function(bikingObject){
        console.log("Got biking directions. Done.");

        var modeResults = {};

        for(var i = 0; i < enabledModes.length; i++){
          var object = {};

          if(modes.modeList[enabledModes[i]].baseMode == 'walking') {
            object = JSON.parse(JSON.stringify(walkingObject));
          }
          else if(modes.modeList[enabledModes[i]].baseMode == 'driving') {
            object = JSON.parse(JSON.stringify(drivingObject));
          }else if(modes.modeList[enabledModes[i]].baseMode == 'biking'){
            object = JSON.parse(JSON.stringify(bikingObject));
          }else {


            object = {"total_time":enabledModes[i]["time"],"total_energy":enabledModes[i]["energy"],"total_style":enabledModes[i]["stylepoints"],"directions":0}
          }
          var result = modes.modeList[enabledModes[i]].eval(object);
          var modeName = modes.modeList[enabledModes[i]].displayName;
          modeResults[modeName] = result;

          // TODO
          console.log(result.steps_list);
        }

				console.log(modeResults);

				var unsorted_parameters = [];
				var unsorted_names = [];
				for (x in modeResults) {        //break modeResults into two parts
				  unsorted_names.push(x);
	   	 		unsorted_parameters.push(modeResults[x][optimizationParameter]);
				}

        //sort the parameters
				var sorted_parameters = JSON.parse(JSON.stringify(unsorted_parameters)).sort(function(a,b) { return a - b; });
				if (optimizationDirection === "down"){
					sorted_parameters.reverse();
				}


				var sorted_names = [];

        //make sure the names are also sorted
			  for(var i = 0; i < sorted_parameters.length; i++){
					for(var j = 0; j < sorted_parameters.length; j++){

						if ((unsorted_parameters[j] === sorted_parameters[i]) && (sorted_names.indexOf(unsorted_names[j]) === -1))  {
							sorted_names.push(unsorted_names[j]);
						}
					}
				}

        //recombine sorted_names;
				var newModeResults = {};
				for(var i= 0; i < sorted_parameters.length; i++){
					newModeResults[sorted_names[i]] = modeResults[sorted_names[i]];
				}

        callback(modeResults);
      });
    });
  });
}

//apis.js

var request = require('request');

var endPoints = {};
const APIKEY = "AIzaSyDjyS7OrT48xkaHmbR5nJEvS-QO3pLTk8A"

function getWalkingDirections(endPoints, callback)
{
	var mode = null;
	var walking_energy_p_sec = .05;
	var walking_style_p_sec = 1;
	apiUrl = "https://maps.googleapis.com/maps/api/directions/json?origin="
  + endPoints["start"] + "&destination=" + endPoints["end"] +
  "&mode=walking&key=" + APIKEY

  var output = {};

	request(apiUrl, function (error, response, body) {
		if(error){
			console.log("API REQUEST ERROR: \n"+error);
		}
		if (!error && response.statusCode == 200) {
      mode = JSON.parse(body);
      var time = parseTotalTime(mode);
      var energy = time*walking_energy_p_sec;
      var stylepoints = 0.4*time*walking_style_p_sec;
      var steps_list = parseDirections(mode);
			var start_coords = retrieveStartCoords(mode);
			var end_coords = retrieveEndCoords(mode);
      var output = {"time":time,"steps_list":steps_list};
      var output = {"time":time,"energy":energy,"stylepoints":stylepoints,"steps_list":steps_list,
      "start_coords":start_coords,"end_coords":end_coords};
      console.log(output["start_coords"]);

			callback(output);
   	}
  });
}

function getDrivingDirections(endPoints, callback)
{
	var mode = null;
	var driving_energy_p_sec = .01;
	var driving_style_p_sec = 1;
	apiUrl = "https://maps.googleapis.com/maps/api/directions/json?origin="
  + endPoints["start"] + "&destination=" + endPoints["end"] +
  "&mode=driving&key=" + APIKEY

  var output = {};

  request(apiUrl, function (error, response, body) {
		if(error){
			console.log("API REQUEST ERROR: \n"+error);
		}
		if (!error && response.statusCode == 200) {
       mode = JSON.parse(body);
      var time = parseTotalTime(mode);
      var energy = time*driving_energy_p_sec;
      var stylepoints = time*driving_style_p_sec;
      var steps_list = parseDirections(mode);
      var start_coords = retrieveStartCoords(mode);
      var end_coords = retrieveEndCoords(mode);
      var output = {"time":time,"energy":energy,"stylepoints":stylepoints,"steps_list":steps_list,
      "start_coords":start_coords,"end_coords":end_coords};
			callback(output);
   	}
  });
}

function getBikingDirections(endPoints, callback)
{
	var mode = null;
	var biking_energy_p_sec = .14;
	var biking_style_p_sec = 1;
	apiUrl = "https://maps.googleapis.com/maps/api/directions/json?origin="
  + endPoints["start"] + "&destination=" + endPoints["end"] +
  "&mode=bicycling&key=" + APIKEY

  var output = {};

  request(apiUrl, function (error, response, body) {
			if(error){
				console.log("API REQUEST ERROR: \n"+error);
			}
			if (!error && response.statusCode == 200) {
         mode = JSON.parse(body);
      var time = parseTotalTime(mode);
      var energy = time*biking_energy_p_sec;
      var stylepoints = time*biking_energy_p_sec;
      var steps_list = parseDirections(mode);
      var start_coords = retrieveStartCoords(mode);
      var end_coords = retrieveEndCoords(mode);
      var output = {"time":time,"energy":energy,"stylepoints":stylepoints,"steps_list":steps_list,
      "start_coords":start_coords,"end_coords":end_coords};
			callback(output);
   	}
  });
}

function retrieveStartCoords(mode)
{
  /* access w ["lat"] ["lng"] */
  return mode["routes"][0]["legs"][0]["start_location"];
}

function retrieveEndCoords(mode)
{
  /* access w ["lat"] ["lng"] */
  return mode["routes"][0]["legs"][0]["end_location"];
}

function parseTotalTime(mode)
{
  return mode["routes"][0]["legs"][0]["duration"]["value"];
}

function parseDirections(mode)
{

  return mode["routes"][0]["legs"][0]["steps"];
}

 


module.exports = {
  parseDirections: parseDirections,
  parseTotalTime: parseTotalTime,
  retrieveEndCoords: retrieveEndCoords,
  retrieveStartCoords: retrieveStartCoords,
	getWalkingDirections: getWalkingDirections,
	getDrivingDirections: getDrivingDirections,
	getBikingDirections:  getBikingDirections
};

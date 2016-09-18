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
		if (!error && response.statusCode == 200) {
      mode = JSON.parse(body);
      var total_time = parseTotalTime(mode);
      var total_energy = total_time*walking_energy_p_sec;
      var total_style = total_time*walking_style_p_sec;
      var steps_list = parseDirections(mode);
      var output = {"total_time":total_time,"steps_list":steps_list};
      var output = {"total_time":total_time,"total_energy":total_energy,"total_style":total_style,"steps_list":steps_list};

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
		if (!error && response.statusCode == 200) {
       mode = JSON.parse(body);
      var total_time = parseTotalTime(mode);
      var total_energy = total_time*driving_energy_p_sec;
      var total_style = total_time*driving_style_p_sec;
      var steps_list = parseDirections(mode);
      var output = {"total_time":total_time,"total_energy":total_energy,"total_style":total_style,"steps_list":steps_list};
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
			if (!error && response.statusCode == 200) {
         mode = JSON.parse(body);
      var total_time = parseTotalTime(mode);
      var total_energy = total_time*biking_energy_p_sec;
      var total_style = total_time*biking_energy_p_sec;
      var steps_list = parseDirections(mode);
      var output = {"total_time":total_time,"total_energy":total_energy,"total_style":total_style,"steps_list":steps_list};
			callback(output);
   	}
  });
}

function retrieveStartCoords(mode)
{
  /* access w ["lat"] ["lng"] */
  return mode["routes"][0]["legs"]["start_location"];
}

function retrieveEndCoords(mode)
{
  /* access w ["lat"] ["lng"] */
  return mode["routes"][0]["legs"]["end_location"];
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
	getWalkingDirections: getWalkingDirections,
	getDrivingDirections: getDrivingDirections,
	getBikingDirections:  getBikingDirections
};
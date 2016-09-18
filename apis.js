//apis.js

var endPoints = {};
const APIKEY = "AIzaSyDjyS7OrT48xkaHmbR5nJEvS-QO3pLTk8A"

function getWalkingDirections(endPoints, request)
{
	var mode = null;
	apiUrl = "https://maps.googleapis.com/maps/api/directions/json?origin="
  + endPoints["start"] + "&destination=" + endPoints["end"] +
  "&mode=walking&key=" + APIKEY

	request(apiUrl, function (error, response, body) {
		if (!error && response.statusCode == 200) {
      mode = JSON.parse(body);
      
      var total_time = parseTotalTime(mode);
      var steps_list = parseDirections(mode);
      var output = {"total_time":total_time,"steps_list":steps_list};
      
    
   	}
  });
	return output;
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
      var total_time = parseTotalTime(mode);
      var steps_list = parseDirections(mode);
      var output = {"total_time":total_time,"steps_list":steps_list};
      
      
   	}
  });
	return output;
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
      var total_time = parseTotalTime(mode);
      var steps_list = parseDirections(mode);
      var output = {"total_time":total_time,"steps_list":steps_list};
   
   	}
  });
	return output;
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

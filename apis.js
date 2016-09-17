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

module.exports = {
	getWalkingDirections: getWalkingDirections,
	getDrivingDirections: getDrivingDirections,
	getBikingDirections:  getBikingDirections
};

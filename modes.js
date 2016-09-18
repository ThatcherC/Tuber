var apis = require("./apis");

var modeList = {};
var request = require('request');

//Creates a new mode with a name, a base mode (walking, driving, or other),
//and a function to modify the base mode.
function addMode(shortName, displayName, baseMode, eval){
  var obj = {'shortName': shortName,
             'displayName': displayName,
             'baseMode': baseMode,
             'eval':eval};
  modeList[shortName] = obj;
}


addMode("biking1", "Biking", "biking", function(bikingObject){
  var biking1Object = {};
  biking1Object.time = bikingObject.time;
  biking1Object.energy = bikingObject.energy;
  biking1Object.stylepoints = bikingObject.stylepoints;
  return biking1Object;
});

addMode("walking1", "Walking", "walking", function(walkingObject){
  var walking1Object = {};
  walking1Object.time = walkingObject.time;
  walking1Object.energy = walkingObject.energy;
  walking1Object.stylepoints = walkingObject.stylepoints;
  return walking1Object;
});

addMode("driving1", "Driving", "driving", function(drivingObject){
  var driving1Object = {};
  driving1Object.time = drivingObject.time;
  driving1Object.energy = drivingObject.energy;
  driving1Object.stylepoints = drivingObject.stylepoints;
  return driving1Object;
});

addMode("cartwheeling", "Cartwheeling", "walking", function(walkingObject){
  var cartwheelingObject = {};
  cartwheelingObject.time = walkingObject.time*5.4;
  cartwheelingObject.energy = walkingObject.energy*12.5;
  cartwheelingObject.stylepoints = walkingObject.stylepoints*.21;
  return cartwheelingObject;
});



addMode("hoverboarding1","Hoverboarding- Back to the Future Style", "biking", function(bikingObject){

  var hoverboardingObject = {};
  hoverboardingObject.time = bikingObject.time*0.7;
  hoverboardingObject.energy = bikingObject.energy*0.1;
  hoverboardingObject.stylepoints = bikingObject.stylepoints*.65;
  return hoverboardingObject;
});

addMode("hoverboarding2","Hoverboarding- Segway Style", "biking", function(bikingObject){
  var hoverboarding2Object = {};
  hoverboarding2Object.time = bikingObject.time*0.3;
  hoverboarding2Object.energy = bikingObject.energy*0.1;
  hoverboarding2Object.stylepoints = bikingObject.stylepoints*.3;
  return hoverboarding2Object;
});

addMode("leapfrogging", "Leapfrogging", "walking", function(walkingObject){
	var leapfroggingObject = {};
  leapfroggingObject.time = walkingObject.time*5.9;
  leapfroggingObject.energy = walkingObject.energy*8.1;
  leapfroggingObject.stylepoints = walkingObject.stylepoints*.54;
  return leapfroggingObject;
});

addMode("wheelchair","Wheelchair", "walking", function(walkingObject){
	var wheelchairObject = {};
  wheelchairObject.time = walkingObject.time*2.9;
  wheelchairObject.energy = walkingObject.energy*0;
  walkingObject.stylepoints = walkingObject.stylepoints*.12;
  return wheelchairObject;
});

addMode("skateboarding","Skateboarding", "walking", function(bikingObject){
  var skateboardingObject = {};
  skateboardingObject.time = bikingObject.time*1.7;
  skateboardingObject.energy = bikingObject.energy*2.6;
  skateboardingObject.stylepoints = bikingObject.stylepoints*.15;
  return skateboardingObject;
});

addMode("golfcarting", "Golfcarting", "biking", function(bikingObject){
  var golfcartingObject = {};
  golfcartingObject.time = bikingObject.time*1.7;
  golfcartingObject.energy = bikingObject.energy*2.6;
  golfcartingObject.stylepoints = bikingObject.stylepoints*.15;
  return golfcartingObject;
});

addMode("airplane", "Airplane", "walking", function(walkingObject){
  var airplaneObject = {};
  var speed = 250;
  var directDistance = calcStraightDist(walkingObject.start_coords,walkingObject.end_coords);

  airplaneObject.time = directDistance/speed;
  airplaneObject.energy = 0;
  airplaneObject.stylepoints = 5*(airplaneObject.time);/*depends on the type of plane*/
  return airplaneObject;
});

addMode("qm", "Quantum Mechanical Tunneling", "walking", function(walkingObject){
  var qmObject = {};
  var speed = Infinity;
  var directDistance = calcStraightDist(walkingObject.start_coords,walkingObject.end_coords);

  qmObject.time = 0;
  qmObject.energy = 0;
  qmObject.stylepoints = Infinity;/*depends on the type of plane*/
  return qmObject;
});


function calcStraightDist(start_coords, end_coords) {
  var R = 6371e3; // metres
    var lat1 = start_coords["lat"]
    var lat2 = end_coords["lat"]
    var lon1 = start_coords["lng"]
    var lon2 = start_coords["lng"]
    var φ1 = lat1.toRadians();
    var φ2 = lat2.toRadians();
    var Δφ = (lat2-lat1).toRadians();
    var Δλ = (lon2-lon1).toRadians();

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    return d
}

module.exports = {
  modeList: modeList
}

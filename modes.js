/* modes.js */
var apis = require("./apis");
var request = require('request');

/* Mode info */
var baseModeInit = {
  "Cartwheeling": {
    "shortName": "cartwheeling",
    "baseMode": "walking",
    "baseModeObj": "walkingObject",
    "time": 5.4,
    "energy": 12.5,
    "stylepoints": 21
  },
  "Hoverboarding- Back to the Future Style":{
    "shortName": "hoverboarding1",
    "baseMode": "biking",
    "baseModeObj": "bikingObject",
    "time": 0.7,
    "energy": 0.1,
    "stylepoints": .65
  },
  "Leapfrogging": {
    "shortName": "leapfrogging",
    "baseMode": "walking",
    "baseModeObj": "walkingObject",
    "time": 5.9,
    "energy": 8.1,
    "stylepoints": .54
  },
  "Wheelchair": {
    "shortName": "wheelchair",
    "baseMode": "walking",
    "baseModeObj": "walkingObject",
    "time": 2.9,
    "energy": 0,
    "stylepoints": .12
  },
  "Skateboarding": {
    "shortName": "skateboarding",
    "baseMode": "walking",
    "baseModeObj": "walkingObject",
    "time": 1.7,
    "energy": 2.6,
    "stylepoints": .15
  },
  "Golfcarting": {
    "shortName": "golfcarting",
    "baseMode": "biking",
    "baseModeObj": "bikingObject",
    "time": 1.7,
    "energy": 2.6,
    "stylepoints": .15
  }
};

var otherModeInit = {
  "Airplane": {
    "shortName": "airplane",
    "baseMode": "other",
    "baseModeObj": "walkingObject",
    "speed": 250,
    "energy": 0,
    "stylepoints": 1
  }
};

var modeList = {};

//Creates a new mode with a name, a base mode (walking, driving, or other),
//and a function to modify the base mode.
function addMode(shortName, displayName, baseMode, eval){
  var obj = {'shortName': shortName,
             'displayName': displayName,
             'baseMode': baseMode,
             'eval':eval};
  modeList[shortName] = obj;
}

var keys = Object.keys(baseModeInitInfo);
var i = 0
for (i; i < keys.length; i++) {
  var modeToAdd = baseModeInit[keys[i]]
  addMode(modeToAdd["shortName"],
          keys[i],
          modeToAdd["baseMode"],
          function(modeToAdd["baseModeObj"]) {
            var object = {};
            object.time = modeToAdd["time"];
            object.energy = modeToAdd["energy"];
            object.stylepoints = modeToAdd["stylepoints"];
            return object;
          });
}

keys = Object.keys(otherModeInit);
for (i = 0; i < keys.length; i++) {
  var modeToAdd = otherModeInit[keys[i]]
  addMode(modeToAdd["shortName"],
          keys[i],
          modeToAdd["baseMode"],
          function(modeToAdd["baseModeObj"]){
            var object = {};
            var directDistance = calcStraightDist(modeToAdd["baseModeObj"].start_coords,
                                                  modeToAdd["baseModeObj"].end_coords);
            object.time = directDistance/modeToAdd["speed"];
            object.time = modeToAdd["time"];
            object.energy = modeToAdd["energy"];
            object.stylepoints = modeToAdd["stylepoints"];
            return object;
          });
}

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

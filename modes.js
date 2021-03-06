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

addMode("biking", "Biking", 'biking', function(bikingObject){
  var bikingObject = JSON.parse(JSON.stringify(bikingObject));
  bikingObject.time = bikingObject.time*1.0;
  bikingObject.energy = bikingObject.energy*1.0;
  bikingObject.stylepoints = bikingObject.stylepoints*1.0;
  return bikingObject;
});

addMode("walking", "Walking", 'walking', function(walkingObject){
  var walkingObject = JSON.parse(JSON.stringify(walkingObject));
  walkingObject.time = walkingObject.time*1.0;
  walkingObject.energy = walkingObject.energy*1.0;
  walkingObject.stylepoints = walkingObject.stylepoints*.03;
  return walkingObject;
});

addMode("driving", "Driving", 'driving', function(drivingObject){
  var drivingObject = JSON.parse(JSON.stringify(drivingObject));
  drivingObject.time = drivingObject.time*1.0;
  drivingObject.energy = drivingObject.energy*1.0;
  drivingObject.stylepoints = drivingObject.stylepoints*.15;
  return drivingObject;
});

addMode("unicycling", "Unicycling", 'biking', function(bikingObject){
  var bikingObject = JSON.parse(JSON.stringify(bikingObject));
  bikingObject.time = bikingObject.time*1.2;
  bikingObject.energy = bikingObject.energy*1.2;
  bikingObject.stylepoints = bikingObject.stylepoints*1.5+15;
  return bikingObject;
});

addMode("cartwheeling", "Cartwheeling", 'walking', function(walkingObject){
  var cartwheelingObject = JSON.parse(JSON.stringify(walkingObject));
  cartwheelingObject.time = walkingObject.time*5.4;
  cartwheelingObject.energy = walkingObject.energy*12.5;
  cartwheelingObject.stylepoints = walkingObject.stylepoints*.31;
  return cartwheelingObject;
});

addMode("hoverboarding1","Hoverboarding - Fictional", 'biking', function(bikingObject){
  var hoverboardingObject = JSON.parse(JSON.stringify(bikingObject));;
  hoverboardingObject.time = bikingObject.time*1.1;
  hoverboardingObject.energy = bikingObject.energy*0.1;
  hoverboardingObject.stylepoints = bikingObject.stylepoints*1.2+40;
  return hoverboardingObject;
});

addMode("hoverboarding2","Hoverboarding - Real", 'biking', function(bikingObject){
  var hoverboarding2Object = JSON.parse(JSON.stringify(bikingObject));;
  hoverboarding2Object.time = bikingObject.time*1.3;
  hoverboarding2Object.energy = bikingObject.energy*0.1;
  hoverboarding2Object.stylepoints = bikingObject.stylepoints*.45;
  return hoverboarding2Object;
});

addMode("leapfrogging", "Leapfrogging", 'walking', function(walkingObject){
	var leapfroggingObject = JSON.parse(JSON.stringify(walkingObject));;
  leapfroggingObject.time = walkingObject.time*5.9;
  leapfroggingObject.energy = walkingObject.energy*8.1;
  leapfroggingObject.stylepoints = walkingObject.stylepoints*.4;
  return leapfroggingObject;
});


addMode("skateboarding","Skateboarding", 'walking', function(bikingObject){
  var skateboardingObject = JSON.parse(JSON.stringify(bikingObject));;
  skateboardingObject.time = bikingObject.time*1.5;
  skateboardingObject.energy = bikingObject.energy*2.6;
  skateboardingObject.stylepoints = bikingObject.stylepoints*.15+20;
  return skateboardingObject;
});

addMode("golfcarting", "Golfcarting", 'biking', function(bikingObject){
  var golfcartingObject = JSON.parse(JSON.stringify(bikingObject));;
  golfcartingObject.time = bikingObject.time*1.2;
  golfcartingObject.energy = bikingObject.energy*2.6;
  golfcartingObject.stylepoints = bikingObject.stylepoints*.25;
  return golfcartingObject;
});

addMode("airplane", "Airplane", 'walking', function(walkingObject){
  var airplaneObject = JSON.parse(JSON.stringify(walkingObject));;
  var speed = 250;
  var directDistance = calcStraightDist(walkingObject.start_coords,walkingObject.end_coords);

  airplaneObject.time = (directDistance/speed)+3600;
  airplaneObject.energy = 0;
  airplaneObject.stylepoints = 4*(airplaneObject.time)-9000;/*depends on the type of plane*/
  var steps_list = [{ distance: { text: '0.1 mi', value: 166 },
    duration: { text: '2 mins', value: 123 },
    end_location: { lat: 42.3610669, lng: -71.0882724 },
    html_instructions: 'Buy a <b>private jet  </b>',
    polyline: { points: 'ckpaGpg{pLOFWNWNcEtBMD' },
    start_location: { lat: 42.359702, lng: -71.0874498 },
    travel_mode: 'WALKING' },{ distance: { text: '0.1 mi', value: 166 },
      duration: { text: '2 mins', value: 123 },
      end_location: { lat: 42.3610669, lng: -71.0882724 },
      html_instructions: 'Go to a <b>private airport </b>',
      polyline: { points: 'ckpaGpg{pLOFWNWNcEtBMD' },
      start_location: { lat: 42.359702, lng: -71.0874498 },
      travel_mode: 'WALKING' }, { distance: { text: '0.1 mi', value: 166 },
        duration: { text: '2 mins', value: 123 },
        end_location: { lat: 42.3610669, lng: -71.0882724 },
        html_instructions: 'Fly to your <b>destination </b>  </b>',
        polyline: { points: 'ckpaGpg{pLOFWNWNcEtBMD' },
        start_location: { lat: 42.359702, lng: -71.0874498 },
        travel_mode: 'WALKING' }];

  airplaneObject.steps_list = steps_list
  return airplaneObject;
});


addMode("qm", "Quantum Tunneling", 'walking', function(walkingObject){
  var qmObject = JSON.parse(JSON.stringify(walkingObject));;
  var speed = Infinity;
  var directDistance = calcStraightDist(walkingObject.start_coords,walkingObject.end_coords);

  qmObject.time = 0;
  qmObject.energy = 0;
  qmObject.stylepoints = Infinity;/*depends on the type of plane*/

  var steps_list = [{ distance: { text: '0.1 mi', value: 166 },
    duration: { text: '2 mins', value: 123 },
    end_location: { lat: 42.3610669, lng: -71.0882724 },
    html_instructions: 'Wait for a <b>very very </b> </b> long time... </b>',
    polyline: { points: 'ckpaGpg{pLOFWNWNcEtBMD' },
    start_location: { lat: 42.359702, lng: -71.0874498 },
    travel_mode: 'WALKING' },{ distance: { text: '0.1 mi', value: 166 },
      duration: { text: '2 mins', value: 123 },
      end_location: { lat: 42.3610669, lng: -71.0882724 },
      html_instructions: 'Arrive at your <b>destination </b>  </b>',
      polyline: { points: 'ckpaGpg{pLOFWNWNcEtBMD' },
      start_location: { lat: 42.359702, lng: -71.0874498 },
      travel_mode: 'WALKING' }];

  qmObject.steps_list = steps_list

  return qmObject;
});

function toRadians(Value) {
  return Value * Math.PI / 180;

}
function calcStraightDist(start_coords, end_coords) {
  var R = 6371e3; // metres
    var lat1 = start_coords["lat"]
    var lat2 = end_coords["lat"]
    var lon1 = start_coords["lng"]
    var lon2 = start_coords["lng"]
    var φ1 = toRadians(lat1);
    var φ2 = toRadians(lat2);
    var Δφ = toRadians(lat2-lat1);
    var Δλ = toRadians(lon2-lon1);

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


var modeList = {};

//Creates a new mode with a name, a base mode (walking, driving, or other),
//and a function to modify the base mode.
function addMode(name, baseMode, eval){
  var obj = {'name': name,
             'baseMode': baseMode,
             'eval':eval};
  modeList[name] = obj;
}


addMode("Cartwheeling", 'walking', function(walkingObject){
  walkingObject.time = walkingObject.time*0.7;
  walkingObject.energy = walkingObject.energy*2.5;
});

addMode("Cartwheeling", 'walking', function(walkingObject){
  var cartwheelingObject = {};
  cartwheelingObject.time = walkingObject.time*5.4;
  cartwheelingObject.energy = walkingObject.energy*12.5;
  cartwheelingObject.stylepoints = walkingObject.stylepoints*21;
  return cartwheelingObject;
});

addMode("Hoverboarding- Back to the Future Style", 'biking', function(bikingObject){
  var hoverboardingObject = {};
  hoverboardingObject.time = bikingObject.time*0.7;
  hoverboardingObject.energy = bikingObject.energy*0.1;
  hoverboardingObject.stylepoints = bikingObject.stylepoints*65;
  return hoverboardingObject;
});

addMode("Leapfrogging", 'walking', function(walkingObject){
	var leapfroggingObject = {};
  leapfroggingObject.time = walkingObject.time*5.9;
  leapfroggingObject.energy = walkingObject.energy*8.1;
  leapfroggingObject.stylepoints = walkingObject.stylepoints*54;
  return leapfroggingObject;
});

addMode("Wheelchair", 'walking', function(walkingObject){
	var wheelchairObject = {};
  wheelchairObject.time = walkingObject.time*2.9;
  wheelchairObject.energy = walkingObject.energy*0;
  walkingObject.stylepoints = walkingObject.stylepoints*12;
  return wheelchairObject;
});

addMode("Skateboarding", 'walking', function(walkingObject){
  var skateboardingObject = {};
  skateboardingObject.time = bikingObject.time*1.7;
  skateboardingObject.energy = bikingObject.energy*2.6;
  skateboardingObject.stylepoints = bikingObject.stylepoints*15;
  return skateboardingObject;
});

addMode("Golfcarting", 'biking', function(walkingObject){
  var golfcartingObject = {};
  golfcartingObject.time = bikingObject.time*1.7;
  golfcartingObject.energy = bikingObject.energy*2.6;
  golfcartingObject.stylepoints = bikingObject.stylepoints*15;
  return golfcartingObject;
});

module.exports = {
  modeList: modeList
}

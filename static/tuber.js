//tuber js file

var map;
var startMarker;
var endMarker;

var startBox;
var destinationBox;

function initializeMap(){
  map = new google.maps.Map(document.getElementById('gmap'), {
          center: {lat: 42.359667, lng: -71.087549},
          zoom: 13
        });
  startBox = document.getElementById('startLocation');
  endBox   = document.getElementById('endLocation');
}

function setStart(){
  console.log("Setting start point");
  startMarker = new google.maps.Marker({
    position: map.getCenter(),
    map: map,
    label: "Start Point",
    draggable: True
  });
}

function setDestination(){
  console.log("Setting end point");
  endMarker = new google.maps.Marker({
    position: map.getCenter(),
    map: map,
    label: "End Point",
    draggable: True
  });
}

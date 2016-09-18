//tuber js file

var map;
var startMarker;
var endMarker;

var startBox;
var destinationBox;

function initializeMap(){
  map = new google.maps.Map(document.getElementById('gmap'), {
          center: {lat: 42.359667, lng: -71.087549},
          zoom: 14
        });
  startBox = document.getElementById('startLocation');
  endBox   = document.getElementById('endLocation');

  startMarker = new google.maps.Marker({
    position: {lat:0,lng:0},
    map: null,
    label: "Start Point",
    draggable: true
  });

  endMarker = new google.maps.Marker({
    position: {lat:0,lng:0},
    map: null,
    label: "Start Point",
    draggable: true
  });
}

function setStart(){
  var center = map.getCenter();
  startMarker.setMap(null);
  startMarker = new google.maps.Marker({
    position: center,
    map: map,
    label: "Start Point",
    draggable: true
  });
  startBox.value = center.lat().toFixed(5)+", "+center.lng().toFixed(5);
  startMarker.addListener('dragend',function(){
    var p = startMarker.getPosition();
    startBox.value = p.lat().toFixed(5)+", "+p.lng().toFixed(5);
  });
}

function setDestination(){
  var center = map.getCenter();
  endMarker.setMap(null);
  endMarker = new google.maps.Marker({
    position: center,
    map: map,
    label: "End Point",
    draggable: true
  });
  endBox.value = center.lat().toFixed(5)+", "+center.lng().toFixed(5);
  endMarker.addListener('dragend',function(){
    var p = endMarker.getPosition();
    endBox.value = p.lat().toFixed(5)+", "+p.lng().toFixed(5);
  });
}

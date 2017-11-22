'use strict';
//TODO: need to implement functionality on nav-bar item.... this should close the aside when clicked
//TODO: need to implement functionality on the list marker items... when clicked they should open the info window on the marker and should be animated somehow
//TODO: view model function
//should add the creation of markers to this area
var ViewModel = function () {
    this.title = location.title;
    this.lat = location.lat;
    this.lng = location.lng;
    this.showLocation = function () {
        new google.maps.InfoWindow({
        });
    }
    this.location = ko.observableArray([
        {
            position: {lat: 33.515349, lng: -117.755575},
            title: 'La Serina Grill'
        },
        {
            position: {lat: 33.514616, lng: -117.759609},
            title: 'Treasure Island Beach'
        },
        {
            position: {lat: 33.515848, lng: -117.756028},
            title: 'Star-fish Laguna Beach'
        },
        {
            position: {lat: 33.514953, lng: -117.757155},
            title: 'Montage Laguna Beach'
        },
        {
            position: {lat: 33.524058, lng: -117.764995},
            title: 'Casa Laguna Hotel and Spa'
        },
        {
            position: {lat: 33.520655, lng: -117.764603},
            title: 'Pirate Tower'
        },
        {
            position: {lat: 33.513560, lng: -117.755424},
            title: 'Treasure Island Park'
        }
    ]);
};

ko.applyBindings(new ViewModel());

//TODO: put this into a promise so we can handle errors?

//Create a map variable
var map;
  //Complete the following function to initialize the map
function initMap() {
     //use a constructor to create a new map JS object
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 33.514490, lng:  -117.759628},
        zoom: 15,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ] 
    })
   //make part of viewmodel but not knockout observables
    var laSerina = new google.maps.Marker({
        position: {lat: 33.515349, lng: -117.755575},
        map: map,
        title: 'La Serina Grill'
    });
    var infoWindow1 = new google.maps.InfoWindow({
        content: 'La Serina Grill'
    });
    laSerina.addListener('click', function () {
        infoWindow1.open(map, laSerina);
    });
    var marker2 = new google.maps.Marker({
        position: {lat: 33.514616, lng: -117.759609},
        map: map,
        title: 'Treasure Island Beach'
    });
    var infoWindow2 = new google.maps.InfoWindow({
        content: 'Treasure Island Beach'
    });
    marker2.addListener('click', function () {
        infoWindow2.open(map, marker2);
    });
    var marker3 = new google.maps.Marker({
        position: {lat: 33.515848, lng: -117.756028},
        map: map,
        title: 'Star-fish Laguna Beach'
    });
    var infoWindow3 = new google.maps.InfoWindow({
        content: 'Star-fish Laguna Beach'
    });
    marker3.addListener('click', function () {
        infoWindow3.open(map, marker3);
    });
    var marker4 = new google.maps.Marker({
        position: {lat: 33.514953, lng: -117.757155},
        map: map,
        title: 'Montage Laguna Beach'
    });
    var infoWindow4 = new google.maps.InfoWindow({
        content: 'Montage Laguna Beach'
    });
    marker4.addListener('click', function () {
        infoWindow4.open(map, marker4);
    });
    var marker5 = new google.maps.Marker({
        position: {lat: 33.524058, lng: -117.764995},
        map: map,
        title: 'Casa Laguna Hotel and Spa'
    });
    var infoWindow5 = new google.maps.InfoWindow({
        content: 'Casa Laguna Hotel and Spa'
    });
    marker5.addListener('click', function () {
        infoWindow5.open(map, marker5);
    });
    var marker6 = new google.maps.Marker({
        position: {lat: 33.520655, lng: -117.764603},
        map: map,
        title: 'Pirate Tower'
    });
    var infoWindow6 = new google.maps.InfoWindow({
        content: 'Pirate Tower'
    });
    marker6.addListener('click', function () {
        infoWindow6.open(map, marker6);
    });
    var marker7 = new google.maps.Marker({
        position: {lat: 33.513560, lng: -117.755424},
        map: map,
        title: 'Treasure Island Park'
    });
    var infoWindow7 = new google.maps.InfoWindow({
        content: 'Treasure Island Park'
    });
    marker7.addListener('click', function () {
        infoWindow7.open(map, marker7);
    });
}

//TODO: Model (this is where the location information will go)
//need the list and filter functions here


//TODO: add a function to handle errors
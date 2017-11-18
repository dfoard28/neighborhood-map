"use strict";
//TODO: change this to knockout.js form
$(function() {
     // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach(function ($el) {
        $el.addEventListener('click', function () {
  
          // Get the target from the "data-target" attribute
          var target = $el.dataset.target;
          var $target = document.getElementById(target);
  
          // Toggle the class on both the "navbar-burger" and the "navbar-menu"
          $el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });
//view model function
var ViewModel = function () {
    
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
    var laSerina = {lat: 33.515349, lng: -117.755575};
    var marker1 = new google.maps.Marker({
        position: laSerina,
        map: map,
        title: 'La Serina Grill'
    });
    var infoWindow1 = new google.maps.InfoWindow({
        content: 'La Serina Grill'
    });
    marker1.addListener('click', function () {
        infoWindow1.open(map, marker1);
    });
    var treasure = {lat: 33.514616, lng: -117.759609};
    var marker2 = new google.maps.Marker({
        position: treasure,
        map: map,
        title: 'Treasure Island Beach'
    });
    var infoWindow2 = new google.maps.InfoWindow({
        content: 'Treasure Island Beach'
    });
    marker2.addListener('click', function () {
        infoWindow2.open(map, marker2);
    });
    var starFish = {lat: 33.515848, lng: -117.756028};
    var marker3 = new google.maps.Marker({
        position: starFish,
        map: map,
        title: 'Star-fish Laguna Beach'
    });
    var infoWindow3 = new google.maps.InfoWindow({
        content: 'Star-fish Laguna Beach'
    });
    marker3.addListener('click', function () {
        infoWindow3.open(map, marker3);
    });
    var montage = {lat: 33.514953, lng: -117.757155};
    var marker4 = new google.maps.Marker({
        position: montage,
        map: map,
        title: 'Montage Laguna Beach'
    });
    var infoWindow4 = new google.maps.InfoWindow({
        content: 'Montage Laguna Beach'
    });
    marker4.addListener('click', function () {
        infoWindow4.open(map, marker4);
    });
    var casaLaguna = {lat: 33.524058, lng: -117.764995};
    var marker5 = new google.maps.Marker({
        position: casaLaguna,
        map: map,
        title: 'Casa Laguna Hotel and Spa'
    });
    var infoWindow5 = new google.maps.InfoWindow({
        content: 'Casa Laguna Hotel and Spa'
    });
    marker5.addListener('click', function () {
        infoWindow5.open(map, marker5);
    });
    var pirate = {lat: 33.520655, lng: -117.764603};
    var marker6 = new google.maps.Marker({
        position: pirate,
        map: map,
        title: 'Pirate Tower'
    });
    var infoWindow6 = new google.maps.InfoWindow({
        content: 'Pirate Tower'
    });
    marker6.addListener('click', function () {
        infoWindow6.open(map, marker6);
    });
    var treasurePark = {lat: 33.513560, lng: -117.755424};
    var marker7 = new google.maps.Marker({
        position: treasurePark,
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

'use strict';
//array of location markers
var markers = [
    {
        position: {lat: 33.515349, lng: -117.755575},
        title: 'La Serina Grill',
        type: 'Food'

    },
    {
        position: {lat: 33.514616, lng: -117.759609},
        title: 'Treasure Island Beach',
        type: 'Beach'
    },
    {
        position: {lat: 33.515848, lng: -117.756028},
        title: 'Star-fish Laguna Beach',
        type: 'Food'
    },
    {
        position: {lat: 33.514953, lng: -117.757155},
        title: 'Montage Laguna Beach',
        type: 'Hotel'
    },
    {
        position: {lat: 33.524058, lng: -117.764995},
        title: 'Casa Laguna Hotel and Spa',
        type: 'Hotel'
    },
    {
        position: {lat: 33.520655, lng: -117.764603},
        title: 'Pirate Tower',
        type: 'Beach'
    },
    {
        position: {lat: 33.513560, lng: -117.755424},
        title: 'Treasure Island Park',
        type: 'Park'
    }
];

var Location = function (data) {
    this.postion = data.position;
    this.title = data.title;
    this.type = data.type;
};

//viewmodel function
var ViewModel = function () {
    var self = this;
    self.types = ['Food', 'Beach', 'Hotel', 'Park', 'All'];
    self.locations = ko.observableArray([]);
    self.markers = [];
    var renderLocations = function (filteredMarkers) {
        ko.utils.arrayForEach(self.locations(), function (location) {
            console.log(location.marker);
            location.marker.setMap(null);
        })
        self.locations.removeAll();
        filteredMarkers.forEach(function (loca) {
            var location = new Location(loca);
          //  self.locations.push(location);
            location.marker = new google.maps.Marker({
                position: loca.position,
                map: map,
                animation: google.maps.Animation.DROP,
                title: loca.title
            });
            location.marker.addListener('click', function () {
                self.activateMarker(this);
            });
            self.activateMarker = function (marker) {
                var self = marker.marker !== undefined ? marker.marker : marker;
                var info = new google.maps.InfoWindow({
                    content: self.title
                });
                info.open(map, self);
                if (self.getAnimation() !== null) {
                    self.setAnimation(null);
                } else {
                    self.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function () {
                        self.setAnimation(null);
                    }, 2000);
                }
            }
            self.locations.push(location);
        });
    }
 /*   markers.forEach(function (loca) {
        var location = new Location(loca);
      //  self.locations.push(location);
        location.marker = new google.maps.Marker({
            position: loca.position,
            map: map,
            animation: google.maps.Animation.DROP,
            title: loca.title
        });
        location.marker.addListener('click', function () {
            self.activateMarker(this);
        });
        self.activateMarker = function (marker) {
            var self = marker.marker !== undefined ? marker.marker : marker;
            var info = new google.maps.InfoWindow({
                content: self.title
            });
            info.open(map, self);
            if (self.getAnimation() !== null) {
                self.setAnimation(null);
            } else {
                self.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function () {
                    self.setAnimation(null);
                }, 2000);
            }
        }
        self.locations.push(location);
    });*/
            renderLocations(markers);
    self.filter = function (criteria) {
        if(criteria === 'All'){
            renderLocations(markers);
        } else {
        var locations = markers.filter(function (loc) {
                return loc.type === criteria;
        });
            renderLocations(locations);
        }
    };
};


//map variable
var map;
  //initialize the map
function initMap() {
     //use a constructor to create a new map JS object
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 33.514490, lng: -117.759628},
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

    });
    var viewModel = new ViewModel();
    ko.applyBindings(viewModel);
   // addMar(viewModel);
}

//forEach loop that adds a marker, info window, and an event listener for the info window to the map
/*function addMar(viewModel) {
    ko.utils.arrayForEach(viewModel.locations, function (element) {
        var mark = new google.maps.Marker({
            position: element.position,
            map: map,
            animation: google.maps.Animation.DROP,
            title: element.title
        });
        var info = new google.maps.InfoWindow({
            content: element.title
        });
        mark.addListener('click', function () {
            info.open(map, mark);
            toggleBounce();
        });

    //function to make markers bounce when clicked on (attribute to google maps api)
        function toggleBounce() {
            if (mark.getAnimation() !== null) {
                mark.setAnimation(null);
            } else {
                mark.setAnimation(google.maps.Animation.BOUNCE);
              setTimeout(function () {mark.setAnimation(null);}, 2000);
            }
        }
    });
}*/

//function to handle errors
function errors() {
    alert("failed to load")
}

//add an is-active class to the dropdown element when clicked, this is required by bulma for dropdown
$('.dropdown').click(function () {
    $(this).toggleClass('is-active');
});
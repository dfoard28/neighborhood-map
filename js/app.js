'use strict';
//array of location markers that includes the position, title, and type
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
        position: {lat: 33.514619, lng: -117.757290},
        title: 'Mosaic Bar and Grille',
        type: 'Food'
    },
    {
        position: {lat: 33.514953, lng: -117.757155},
        title: 'Montage Laguna Beach',
        type: 'Hotel'
    },
    {
        position: {lat: 33.524058, lng: -117.764995},
        title: 'Casa Laguna Inn & Spa',
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
//location constructor
var Location = function (data) {
    this.postion = data.position;
    this.title = data.title;
    this.type = data.type;
    this.address = data.address;
    this.link = data.link;
};

//empty array to push promises into
var promises = [];
//loop on markers to create some var's to hold information to put into the ajax url call (so I am not duplicating over and over again during each call)
markers.forEach(function (marker) {
    var lat = marker.position.lat;
    var lng = marker.position.lng;
    var query = marker.title;
    var startUrl = 'https://api.foursquare.com/v2/venues/<uri>?client_id=HU2F5LJ2CX0VCC2RKL3MRHKFOVOPAYXBWHP4FJ3HCQDJGIMX&client_secret=DBD5U4JFV1TXDF1WSRAOSDFHYWF3EPIE0ARJGP21DCQFF5CH&v=20170801&';
    //Promise to hold the first ajax call to foursquares API
    var promise = new Promise(function (resolve) {
        $.ajax({
            url: startUrl.replace('<uri>', 'search') + 'll=' + lat + ',' + lng + '&query=' + query + '&limit=1&intent=match',
            method: 'GET'
        }).done(handleResponse).fail(function (error) {
            errors(error);
            resolve(error);
        })
        //this is to handle the response from foursquares API
        function handleResponse(data) {
            //get the id for the given location from foursquare api
            var id = data.response.venues[0].id;
            //adding an address to the marker array
            marker.address = data.response.venues[0].location.formattedAddress;
            //innerPromises empty array (going to push a second promise with another foursquare ajax call within)
            var innerPromises = [];
            //another promise that does a second ajax call to foursquare
            var innerPromise = new Promise(function (innerResolve) {
                $.ajax({
                    url: startUrl.replace('<uri>', '/' + id + '/links'),
                    method: 'GET'
                }).done(function (linkData) {
                    //this is going to take a url that is returned from fousquare and if it is not undefined then it is being added with a anchor tag so it can be clicked on
                    marker.link = linkData.response.links.items.reduce(function (r,link) {
                        var url = link.url;
                        if (url !== undefined) {
                            return r + '<a target="_blank" href="' + url + '">' + url + '</a>,';
                        } else {
                            return r;
                        }
                    },'').slice(0, -1);
                    innerResolve(linkData);
                }).fail(function (error) {
                    //non catastrophic error, alert and continue
                    errors(error);
                    innerResolve(linkData);
                });
            });
            //pushing the innerPromise into the innerPromises empty array
            innerPromises.push(innerPromise);
            Promise.all(innerPromises).then(function () { 
                resolve(data);
            });
        }
    });
    promises.push(promise);
});
//this promise makes sure all promises are settled before running
Promise.all(promises).then(function (result) {
    //viewmodel function
    var ViewModel = function () {
        var self = this;
        //array for filter types
        self.types = ['Food', 'Beach', 'Hotel', 'Park', 'All'];
        //observable array for markers
        self.locations = ko.observableArray([]);
        self.markers = [];
        //rendersLocations function, this renders the map markers along with the list
        var renderLocations = function (filteredMarkers) {
        //does a foreach on the locations to not show locations based off of filter
            ko.utils.arrayForEach(self.locations(), function (location) {
                location.marker.setMap(null);
            });
            //removing all of the locations list based off of filter function
            self.locations.removeAll();
            filteredMarkers.forEach(function (loca) {
                var location = new Location(loca);
                //adding markers to the map
                location.marker = new google.maps.Marker({
                    position: loca.position,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    title: loca.title,
                    address: loca.address,
                    link: loca.link
                });
                //adding a listener for when the markers are clicked
                location.marker.addListener('click', function () {
                    self.activateMarker(this);
                });
                //opening the infowindow when clicked from list and from map
                self.activateMarker = function (marker) {
                    var self = marker.marker !== undefined ? marker.marker : marker;
                    var info = new google.maps.InfoWindow({
                        content: self.title + '<br>' + self.address.join('<br>') + '<br>' + self.link
                    });
                    info.open(map, self);
                    //animation for when a marker is clicked (from list or map)
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
        };
        //calling the renderLocations function
        renderLocations(markers);
        //filter function, used to filter on the types of locations
        self.filter = function (criteria) {
            if (criteria === 'All'){
                renderLocations(markers);
            } else {
                var locations = markers.filter(function (loc) {
                    return loc.type === criteria;
                });
                renderLocations(locations);
            }
        };
    };
    var viewModel = new ViewModel();
    ko.applyBindings(viewModel);
});

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
}

//function to handle errors
function errors(err) {
    alert("failed to load");
}

//add an is-active class to the dropdown element when clicked, this is required by bulma for dropdown
$('.dropdown').click(function () {
    $(this).toggleClass('is-active');
});
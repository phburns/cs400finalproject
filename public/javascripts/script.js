let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.4108, lng: -94.7048}, 
        zoom: 13
    });

    let searchBox = new google.maps.places.SearchBox(document.getElementById('search-box'));

    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener('places_changed', function() {
        let places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        let bounds = new google.maps.LatLngBounds();
        let infoWindow = new google.maps.InfoWindow();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            let icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
        
            // Create the marker.
            let marker = new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            });
        
            markers.push(marker);
        
            // Add a click event listener to the marker.
            marker.addListener('click', function() {
                // Set the content of the InfoWindow to the details of the place.
                infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                    'Place ID: ' + place.place_id + '<br>' +
                    place.formatted_address + '</div>');
        
                // Open the InfoWindow at the marker's position.
                infoWindow.open(map, marker);
            });
        
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

function getPlaceId(placeName) {
    // Create a new instance of PlacesService
    let service = new google.maps.places.PlacesService(map);

    // Create a request object
    let request = {
        query: placeName,
        fields: ['place_id'],
    };

    // Call the findPlaceFromQuery method
    service.findPlaceFromQuery(request, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            // Log the place id of the first result
            console.log(results[0].place_id);
        }
    });
}

function getPlaceDetails(placeId) {
    // Create a new instance of PlacesService
    let service = new google.maps.places.PlacesService(map);

    // Create a request object
    let request = {
        placeId: placeId
    };

    // Call the getDetails method
    service.getDetails(request, function(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            // Log the place details
            console.log(place);
        }
    });
}

function showPlaceOnMap(placeId) {
    // Create a new instance of PlacesService
    let service = new google.maps.places.PlacesService(map);

    // Create a request object
    let request = {
        placeId: placeId
    };

    // Call the getDetails method
    service.getDetails(request, function(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            // Create a new marker
            let marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });

            // Center the map on the place
            map.setCenter(place.geometry.location);
        }
    });
}
// Map Initialization
var map;
var markers = [];
function initMap() {
    map = new google.maps.Map(document.getElementById('output'), {
        zoom: 2,
        maxZoom: 12,
        center: new google.maps.LatLng(2.8,-187.3),
        mapTypeId: 'terrain'
    });
}

// Functions
function ajax(method, url, success) {
    $.ajax({
        method: method,
        url: url,
        dataType: "json",
        success: success,
        error: function() {
            console.log("Oh no, something went wrong! ", error);
        }
    });
}

function drawMarkers(data) {
    for (var i = 0; i < data.results.length; i++) {
        var coords = data.results[i].geometry.location;
        var latLng = new google.maps.LatLng(coords.lat,coords.lng);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
        markers.push(marker);
    }
    zoomBounds();
}

function zoomBounds() {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
        bounds.extend(markers[i].getPosition());
    }
    map.fitBounds(bounds);
}

function removeMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

// Event handler
$("#submit").on("click", function(e) {
    e.preventDefault();
    var searchTerm = $("#input").val();

    removeMarkers();
    ajax("POST", "http://maps.googleapis.com/maps/api/geocode/json?address=" + searchTerm, drawMarkers);
});
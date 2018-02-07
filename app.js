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
    zoomBounds(markers);
    appendDivs(data.results);
}

function zoomBounds(array) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < array.length; i++) {
        bounds.extend(array[i].getPosition());
    }
    map.fitBounds(bounds);
}

function removeMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

function appendDivs(data) {
    $("#info").empty();
    for (var i = 0; i < data.length; i++) {
        var el = $("<p>" + data[i].formatted_address + "</p><button class=\"btn btn-primary search-res\">Show Me</button><br>");
        $("#info").append(el);
    }
}

$(document).ready(function() {
    // Event handler
    $("#submit").on("click", function(e) {
        e.preventDefault();
        var searchTerm = $("#input").val();
        removeMarkers();
        ajax("POST", "http://maps.googleapis.com/maps/api/geocode/json?address=" + searchTerm, drawMarkers);
    });

    $(document).on("click", ".search-res", function() {
        var index = $(this).index(".search-res");
        zoomBounds([markers[index]]);
    });
});
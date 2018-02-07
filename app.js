$(document).ready(function() {
    $("#submit").on("click", function(e) {
        e.preventDefault();
        var value = $("#input").val();

        $.ajax({
            method: "POST",
            url: "http://maps.googleapis.com/maps/api/geocode/json?address=" + value,
            dataType: "json",
            success: function(data) {
                console.log(data);
                var out = $("#output");
                out.empty();

                // Checks for an empty result array
                if (data.results.length === 0) {
                    console.log("Empty array");
                    out.append("<p>Your search returned no results. Please try again.</p>")
                } else {
                    for (var i = 0; i < data.results.length; i++) {
                        var res = data.results[i];
                        out.append($("<h2>" + res.formatted_address + "</h2>"));
                        out.append($("<p>Latitude: " + res.geometry.location.lat + "</p>"));
                        out.append($("<p>Longitude: " + res.geometry.location.lng + "</p>"));
                    }
                }
            },
            error: function(error) {
                console.log("Oh no, something went wrong! ", error);
                var out = $("#output");
                out.empty();
                out.append("<p>Please enter a search term.</p>");
            }
        });
    });
});
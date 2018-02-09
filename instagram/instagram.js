$(document).ready(function() {
    var clientID;
    var redirectURL;
    var accessToken;

    function ajax(url, success, error) {
        $.ajax({
            method: "GET",
            url: url,
            dataType: "json",
            success: success,
            error: error
        });
    }

    ajax("../../config.json", function(config) {
        console.log(config);

        clientID = config[0].clientID;
        redirectURL = config[0].redirectURL;
        accessToken = config[0].accessToken;

        ajax("https://api.instagram.com/v1/users/self/media/recent/?access_token=" + accessToken, function(res) {
            console.log(res);

            var elements = [];

            for (var i = 0; i < res.data.length; i++) {
                var newEl = $("<div class=\"igImage\"><img src=\""+ res.data[i].images.low_resolution.url +"\" alt=\"" + res.data[i].caption.text + "\"><p style=\"max-width:" + res.data[i].images.low_resolution.width + "px\">" + res.data[i].caption.text + "</p></div>");
                elements.push(newEl);
            }

            for (var i = 0; i < elements.length; i++) {
                $("#igFeed").append(elements[i]);
            }

        }, function(error) {
            throw "error";
        });
    }, function(error) {
        throw "error";
    });
});
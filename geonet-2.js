var url = "http://api.geonet.org.nz/quake?MMI=-1";

"use strict";

google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    $.ajax({
        method: "GET",
        url: url,
        dataType: "json",
        success: function(data) {
            var dataTable = new google.visualization.DataTable();
            dataTable.addColumn("number", "Earthquake #");
            dataTable.addColumn("number", "Earthquake Magnitude");

            for (var i = 0; i < data.features.length; i++) {
                dataTable.addRow([i + 1, data.features[i].properties.magnitude]);
            }

            console.log(data);
        
            chart = new google.visualization.LineChart(document.getElementById('chartLocation'));

            google.visualization.events.addListener(chart, "select", function() {
                var index = chart.getSelection()[0].row;
                chart.setSelection();
                var eqData = data.features[index].properties.publicID;
                var newURL = "http://api.geonet.org.nz/quake/" + eqData;
                ajax(newURL, function(public) {
                    console.log(public);
                });
            });
        
            chart.draw(dataTable, null);
        },
        error: function(error) {
            console.log(error + " Something went wrong");
        }
    });
}

function ajax(url, success) {
    $.ajax({
        method: "GET",
        url: url,
        dataType: "json",
        success: success
    });
}
var url = "http://api.geonet.org.nz/quake/stats";

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
            dataTable.addColumn("string", "Date");
            dataTable.addColumn("number", "Magnitude");
            dataTable.addColumn("number", "Reading");

            console.log(data.magnitudeCount);

            dataTable.addRow(["2017", ]);
        
            chart = new google.visualization.BarChart(document.getElementById('chartLocation'));
        
            chart.draw(dataTable, null);

            setTimeout(getLatest, 5000);
        },
        error: function(error) {
            console.log(error + " Something went wrong");
        }
    });
}
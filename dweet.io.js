"use strict";

google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawChart);

var dataTable;
var chart;

function drawChart() {
    $.ajax({
        method: "GET",
        url: "https://dweet.io:443/get/latest/dweet/for/481231530myesp8266",
        dataType: "json",
        success: function(res) {
            dataTable = new google.visualization.DataTable();
            dataTable.addColumn("number", "Date");
            dataTable.addColumn("number", "Temp");
            dataTable.addColumn("number", "Humidity");

            var data = res.with[0].content;
            console.log(data);
            // $("#heading").text(data[":owner"] + ", " + data[":name"]);

            dataTable.addRow([new Date().getTime(), data.temperature, data.humidity]);
        
            chart = new google.visualization.LineChart(document.getElementById('chartLocation'));
        
            chart.draw(dataTable, null);

            setTimeout(getLatest, 5000);
        },
        error: function(error) {
            console.log(error + " Something went wrong");
        }
    });
}

function getLatest() {
    $.ajax({
        method: "GET",
        url: "https://dweet.io:443/get/latest/dweet/for/481231530myesp8266",
        success: function(data) {
            // $("#btcPrice").text(data.with[0].content[":estimated_current_worth:median:text"]);
            dataTable.addRow([new Date().getTime(), data.with[0].content.temperature, data.with[0].content.humidity]);
            chart.draw(dataTable, null);
            setTimeout(getLatest, 5000);
        }
    })
}
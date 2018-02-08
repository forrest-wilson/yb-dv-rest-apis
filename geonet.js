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
            dataTable.addColumn("number", "Earthquake Frequency");

            var rate = data.rate.perDay;

            var stillestDay = null,
                stillCount = null,
                shakiestDay = null,
                shakeCount = null;

            for (i in rate) {
                var parsedDate = i.substr(0, 10);
                dataTable.addRow([parsedDate, rate[i]]);

                if (shakeCount === null) {
                    shakeCount = rate[i];
                    shakiestDay = {[parsedDate]: rate[i]};
                } else {
                    if (rate[i] > shakeCount) {
                        shakeCount = rate[i];
                        shakiestDay = {[parsedDate]: rate[i]};
                    }
                }

                if (stillCount === null) {
                    stillCount = rate[i];
                    stillestDay = {[parsedDate]: rate[i]};
                } else {
                    if (rate[i] < stillCount) {
                        stillCount = rate[i];
                        stillestDay = {[parsedDate]: rate[i]};
                    }
                }
            }

            var stillKey,
                shakyKey;

            for (i in stillestDay) {
                stillKey = i;
            }

            for (i in shakiestDay) {
                shakyKey = i;
            }

            $("#summary").append("<p>Stillest Day: " + stillKey + ", " + stillestDay[stillKey] + " earthquakes.</p>");
            $("#summary").append("<p>Shakiest Day: " + shakyKey + ", " + shakiestDay[shakyKey] + " earthquakes.</p>");
        
            chart = new google.visualization.LineChart(document.getElementById('chartLocation'));
        
            chart.draw(dataTable, null);
        },
        error: function(error) {
            console.log(error + " Something went wrong");
        }
    });
}

/**
 * 
 */
function main()
{
    
	
	/**
	 * Add the countries that we have data for. 
	 */
	for(var i = 0; i < PLACES.length; i++)
	{
		var place = PLACES[i][0];

		$("#location").append("<option>" + place + "</option>");	
	}
	
	add_variables();
	
	update();
}

/**
 * Add the names of the data-sets that are available for the country.  
 */
function add_variables()
{
	var place = $("#location option:selected").text();
	
	var variables = place_info(place)[2];
	
	for(var i = 0; i < variables.length; i++)
	{
		$("#variable").append("<option>" + variables[i] + "</option>");
	}
}

/**
 * This event is fired when the user selects a data-set to display. 
 */
function update()
{
	$("#message-1").remove();
	$("#graph-canvas").remove();
	
	$("#graph-section").append("<canvas id='graph-canvas'></canvas>");
	
	// Get the user's selections. 
	var place = $("#location option:selected").text();
	var variable = $("#variable option:selected").text();
	
	var data = graph_data(place, variable);
	
	var options = {

	    ///Boolean - Whether grid lines are shown across the chart
	    scaleShowGridLines : true,

	    //String - Colour of the grid lines
	    scaleGridLineColor : "rgba(0,0,0,.05)",

	    //Number - Width of the grid lines
	    scaleGridLineWidth : 1,

	    //Boolean - Whether the line is curved between points
	    bezierCurve : true,

	    //Number - Tension of the bezier curve between points
	    bezierCurveTension : 0.4,

	    //Boolean - Whether to show a dot for each point
	    pointDot : true,

	    //Number - Radius of each point dot in pixels
	    pointDotRadius : 4,

	    //Number - Pixel width of point dot stroke
	    pointDotStrokeWidth : 1,

	    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
	    pointHitDetectionRadius : 20,

	    //Boolean - Whether to show a stroke for datasets
	    datasetStroke : true,

	    //Number - Pixel width of dataset stroke
	    datasetStrokeWidth : 2,

	    //Boolean - Whether to fill the dataset with a colour
	    datasetFill : true,
	    
	}; 
	
	// Calculate the size of the graph. 
	var height = 500;
	var width = data["datasets"][0]["data"].length * 50;
	//width = Math.floor($("#graph-section").width() * 0.99);
	width = $("#graph-section").width() > width ? Math.floor($("#graph-section").width() * 0.99) : width;  
	
	// Set the size of the graph.
	$("#graph-canvas").removeAttr("style");
	$("#graph-canvas").attr("height", height);
	$("#graph-canvas").attr("width", width);
	$("#graph-section").scrollLeft(width);
	
	// Draw the graph. 
	var context = $("#graph-canvas").get(0).getContext("2d");
	var chart = new Chart(context);
	graph = chart;
	chart.Line(data, options);
	chart.height = height;
	chart.width = width;
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	var labels = data["labels"];
	var points = data["datasets"][0]["data"];
	
	$("#points-table").empty();
	
	$("#points-table").append("<tr> <td> <b>Date</b> </td>  <td> <b>Value</b> </td> </tr>");
	
	for(var i = labels.length - 1; i >= 0; i--)
	{
		var date = labels[i];
		var value = points[i];
		
		$("#points-table").append("<tr> <td>" + date + "</td> <td>" + value + "</td> </tr>");
	}
	
}

function event_location_changed()
{
	$("#variable").empty();
	
	add_variables();
	
	update();
}

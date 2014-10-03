
/**
 * These are the locations that we have data for. 
 * 
 * [location, [location-key, data-provider-function]]
 * 
 */
var PLACES = [["Liberia (National)",           ["national",           liberia]],
	          ["Liberia (Bomi County)",        ["bomi county",        liberia]],
	          ["Liberia (Bong County)",        ["bong county",        liberia]],
	          ["Liberia (Gbarpolu County)",    ["gbarpolu county",    liberia]],
	          ["Liberia (Grand Bassa)",        ["grand bassa",        liberia]],
	          ["Liberia (Grand Cape Mount)",   ["grand cape mount",   liberia]],
	          ["Liberia (Grand Gedeh)",        ["grand gedeh",        liberia]],
	          ["Liberia (Lofa County)",        ["lofa county",        liberia]],
	          ["Liberia (Margibi County)",     ["margibi county",     liberia]],
	          ["Liberia (Maryland County)",    ["maryland county",    liberia]],
	          ["Liberia (Montserrado County)", ["montserrado county", liberia]],
	          ["Liberia (Nimba County)",       ["nimba county",       liberia]]];

/**
 * This function constructs an object to pass to the graphing library.
 * 
 * @param place is the name of the locality as it appears in the location selection box.
 * @param variable is the data-set variable to graph.   
 */
function graph_data(place, variable)
{
	/**
	 * Construct a list of containing the data-points to graph. 
	 * Each element in the list is a list containing two values.
	 * The first value is a date. 
	 * The second value is a number (i.e. number of persons).  
	 * 
	 * Example: [["7/1/2014", 3], ["8/3/2014", 5], ["9/5/2014", 7]]
	 */
	var points = get_points(place, variable);
	
	/**
	 * This method will create two lists and return them in a list.
	 * The first list contains the dates from the list of points.
	 * The second list contains the numbers from the list of points.
	 * 
	 * Example: [["7/1/2014", "8/3/2014", "9/5/2014"], [3, 5, 7]]
	 */
	var list = create_graph_info(points);
	
	/**
	 * This object will be passed to the ChartJS library. 
	 */
	var data = {
		    labels: list[0],
		    datasets: [
		        {
		            label: "My First dataset",
		            fillColor: "rgba(151,187,205,0.2)",
		            strokeColor: "rgba(151,187,205,1)",
		            pointColor: "rgba(151,187,205,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(151,187,205,1)",
		            data: list[1]
		        },
		    ]
		};
	
	return data;
}

/**
 * This method retrieves a list of data-points for a particular location and data-variable. 
 * 
 * Example Returned List:  [["7/1/2014", 3], ["8/3/2014", 5], ["9/5/2014", 7]]
 * 
 * @param place is the location. Example: "Liberia (National)"
 * @param variable
 * @returns
 */
function get_points(place, variable)
{
	// For each place in PLACES:
	for(var i = 0; i < PLACES.length; i++)
	{
		if(PLACES[i][0] == place)
		{
			// Get the JSON data. 
			var data = PLACES[i][1][1]();
			
			// Get the name of the location, as it appears in the data. 
			var location = PLACES[i][1][0];
			
			// Create and return the data-points. 
			return points_of(data, location, variable);		
		}
	}
	
	return null;
}

/**
 * This method converts a list of points to a a more usable form. 
 * 
 * Example Input: [["7/1/2014", 3], ["8/3/2014", 5], ["9/5/2014", 7]]
 * 
 * Example Output: [["7/1/2014", "8/3/2014", "9/5/2014"], [3, 5, 7]]
 * 
 * @param points is a list of data-points. 
 * @returns {Array}
 */
function create_graph_info(points)
{
	// These are the labels that will appear on the X-axis of the graph. 
	var labels = [];
	
	// These are the values associated with the labels. 
	var data = [];
	
	for(var i = 0; i < points.length; i++)
	{
		labels.push(points[i][0]);
		data.push(points[i][1]);
	}
	
	return [labels, data];
}

/**
 * This method creates a list of data points for a particular location and data-variable. 
 * 
 * @param data is the data-set. 
 * @param place is the location as it appears in the data. Example: "national" not "National".  
 * @param variable is the data-variable.                   Example: "Total Cases"
 * @returns {Array} an array of data-points.               Example: [["7/1/2014", 3], ["8/3/2014", 5], ["9/5/2014", 7]]
 */
function points_of(data, place, variable)
{
	var result = [];
	
	// For each line in the data. 
	for(var i = 0; i < data.length; i++)
	{
		var line = data[i];
	
		/**
		 * If the line provides information regarding the desired data-variable,
		 * then we need to create a point for it.  
		 */
		if(get_value(line, "variable") == variable)
		{
			// A point is a list: [date, c]
			var date = get_value(line, "date");
			var cell = get_value(line, place);
			
			if(date != null && cell != null)
			{
				result.push([date, cell]);
			}
		}
	}
	
	return result;
}

/**
 * This method retrieves a cell from a line of data. 
 * 
 * Example Line: [["date", "10/1/2014"], ["variable", "Total Cases"], ["America", 1]]
 * 
 * The keys in the example are: "date", "variable", and "America".
 * The values in the example are: "10/1/2014", "Total Cases", and 1.  
 * 
 * @param line is the line of data, which is a list of pairs. 
 * @param key is the key of the pair whose associated value will be returned. 
 * @returns the value associated with the key. 
 */
function get_value(line, key)
{
	for(var i = 0; i < line.length; i++)
	{
		if(line[i][0] == key)
		{
			return line[i][1];
		}
	}
	
	return null;
}

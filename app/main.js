define(["ajaxcall", "layout","events"], function (ajaxcall, layout,events) {
	var search_button = document.getElementById("search_button");
	
	//Event triggered when someone pushes the search button
	search_button.addEventListener("click", function() {
		var query = document.getElementById("query").value;
			//Check if there is a query string
			if (query !== "") {
				//Get the results form Google Search Api and put them formatted in the web page
    			ajaxcall.getData({callback:
    				function(response) { 
    					if (response === "error") { 
    						if (document.getElementById("itembox").style.display !== "block") {
    					    	document.getElementById("itembox").style.display = "block";
    					    }
    						document.getElementById("itembox").innerHTML = '<li><h4>Unable to connect to API server</h4>';
    					}
    					else if (response === "loading") {
    						if (document.getElementById("itembox").style.display !== "block") {
    					    	document.getElementById("itembox").style.display = "block";
    					    }
    						document.getElementById("itembox").innerHTML = '<li><h4>Loading...</h4>';
    					}
    					else if (response !== "error" && response !== "loading") {
    						var totalResults = layout.printIt(response, 1, 1);
    						events.addEvents(totalResults);
    						document.getElementById("imagebox").style.display = "block";
    						document.getElementById("itembox").style.display = "block";	
    		   			}
    				}, query:query, startIndex:0});
    		}
    	});
    	
});

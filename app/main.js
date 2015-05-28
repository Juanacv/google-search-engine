define(function (require) {
    //requering ajaxcall.js module
    var messages = require('ajaxcall');
    // Load library to load the data in html
    var layout = require('layout');
	var search_button = document.getElementById("search_button");
	var pagination = document.querySelectorAll("a");
	
	//Event triggered when someone pushes the search button
	search_button.addEventListener("click", function(e) {
		var query = document.getElementById("query").value;
		//Get the results form Google Search Api and put them formatted in the web page
    	messages.getData({callback:
    		function(response) { 
    			if (response=="error") { 
    				document.getElementById("itembox").style.display = "block"
    				var itembox = document.getElementById("itembox");
    				itembox.innerHTML = '<li><h4>Unable to connect to API server</h4>';
    			}
    			else {
    				layout.printIt(response, 1, 1);
    				document.getElementById("imagebox").style.display = "block";
    				document.getElementById("itembox").style.display = "block"	
    		   }
    		}, query:query, startIndex:0});
    	});
});

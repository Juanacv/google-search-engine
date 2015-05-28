define(function(require) {

  function getPage(startIndex, active, firstPage) {
      	//requering ajaxcall.js module
  		var messages = require('ajaxcall');
    	// Load library to load the data in html
    	var layout = require('layout');
		var query = document.getElementById("query").value;
    	messages.getData({callback:function(response) { layout.printIt(response, firstPage, active); }, query:query, startIndex:startIndex});
  }
  
  return {
    addEvents: function(totalResults) {
 		//Get all the pagination anchors
		var Anchors = document.getElementsByTagName("a");

		for (var i = 0; i < Anchors.length ; i++) {
		 	//adding event listener to every anchor
    		Anchors[i].addEventListener("click", 
        		function (event) {
            		event.preventDefault();
            		var active = 1;
            		var active_item = 1; //item with the active class
            		var startIndex = 1; //Index page to get from the API
            		var firstPage = 1; //first number in the navigation anchor list
            		if (this.id != "prev" && this.id != "next") {     //If is an anchor "item-" + anchor	
            			startIndex = parseInt(document.getElementById(this.id).innerHTML); //anchor clicked is the selectedIndex
            		    active = this.parentNode.id.split("-"); 
						active_item = active[1]; //the next active item is the item clicked too
						//the first number in pagination doesn't change, so we take the first anchor number 
	            		var id = document.getElementById("item-1").firstChild.id; 
						firstPage = parseInt(document.getElementById(id).innerHTML);
	            	}
	            	else {
	            		if (this.id == "prev") { //if the "prev" anchor is clicked
	            			var active_list_item = document.querySelector(".active"); //get the active item
	            			//Index page from the anchor in active item
	            			startIndex = parseInt(document.getElementById(active_list_item.firstChild.id).innerHTML);
	            			//Get the active item
	            			active = active_list_item.id.split("-");
	            			active_item = parseInt(active[1]);
	            			if (active_item == 1) {
	            				if (startIndex > 1) {
	            					startIndex = startIndex - 1; //substract 1 if we are in the first item
	            				}
	            				firstPage = startIndex; //the first page is also the index
	            			}
	            			else {
	            				active_item = active_item - 1; //if we are not in the last item, substract 1
	            				startIndex = startIndex - 1; //previous index
	            				//the first number in pagination doesn't change, so we take the first anchor number 
	            				var id = document.getElementById("item-1").firstChild.id;
								firstPage = parseInt(document.getElementById(id).innerHTML);
	            			}
	            		}
	            		if (this.id == "next") { //if the "next" anchor is clicked
	            			var active_list_item = document.querySelector(".active"); //get the active item
	            			//Index page from the anchor in active item
	            			startIndex = parseInt(document.getElementById(active_list_item.firstChild.id).innerHTML);
	            			//Get the active item
	            			active = active_list_item.id.split("-");
	            			active_item = parseInt(active[1]);
	            			if (active_item == 6) {
	            				if (startIndex < totalResults) {
	            					startIndex = startIndex + 1; //adds 1 if we are in the last item
	            				}
	            				firstPage = startIndex - 5; //the first page is the new last pages minus 5
	            			}
	            			else {
	            				active_item = active_item + 1; //if we are not in the last item, add 1
	            				startIndex = startIndex + 1; //next index
	            				//the first number in pagination doesn't change, so we take the first anchor number 
	            				var id = document.getElementById("item-1").firstChild.id;
								firstPage = parseInt(document.getElementById(id).innerHTML);
	            			}
	            		}
	            	}
	            	getPage(startIndex, active_item, firstPage);
        		}, 
        	false);
		}
    }
  }
});
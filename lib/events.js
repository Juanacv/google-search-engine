define(["getpage"], function (getpage) {   
  function addEvents(totalResults) {
    //adding event listener to every anchor
	document.addEventListener("click", 
    	function (event) {
        	var el = event.target, found;
       		if (el.id === "" || !(el.id.startsWith("anchor-"))) {
            	while (el && !(found = el.id === "prev" || el.id === "next" || el.id.startsWith("anchor-")))    {
                	el = el.parentElement;
            	}
        	}  
			else if (el.id.startsWith("anchor-")) {
				found = true;
			}
			if (found) {		
            	event.preventDefault();
            	var active = 1;
            	var active_item; //item with the active class
            	var startIndex = 1; //Index page to get from the API
            	var firstPage = 1; //first number in the navigation anchor list
            	if (el.id !== "prev" && el.id !== "next") {     //If is an anchor "item-" + anchor	
            		startIndex = parseInt(document.getElementById(el.id).innerHTML); //anchor clicked is the selectedIndex
            		active_item = el.parentNode.id.split("-"); 
					active = active_item[1]; //the next active item is the item clicked too
					//the first number in pagination doesn't change, so we take the first anchor number 
	        		id = document.getElementById("item-1").firstChild.id; 
					firstPage = parseInt(document.getElementById(id).innerHTML);
	        	}
	            else {
	            	var id, active_list_item;
	            	if (el.id === "prev") { //if the "prev" anchor is clicked
	            		active_list_item = document.querySelector(".active"); //get the active item
	            		//Index page from the anchor in active item
	            		startIndex = parseInt(document.getElementById(active_list_item.firstChild.id).innerHTML);
	            		//Get the active item
	            		active_item = active_list_item.id.split("-");
	            		active = parseInt(active_item[1]);
	            		if (active === 1) {
	            			if (startIndex > 1) {
	            				startIndex = startIndex - 1; //substract 1 if we are in the first item
	            			}
	            			firstPage = startIndex; //the first page is also the index
	            		}
	            		else {
	            			active = active - 1; //if we are not in the last item, substract 1
	            			startIndex = startIndex - 1; //previous index
	            			//the first number in pagination doesn't change, so we take the first anchor number 
	            			id = document.getElementById("item-1").firstChild.id;
							firstPage = parseInt(document.getElementById(id).innerHTML);
	            		}
	            	}
	            	if (el.id === "next") { //if the "next" anchor is clicked
	            		active_list_item = document.querySelector(".active"); //get the active item
	            		//Index page from the anchor in active item
	            		startIndex = parseInt(document.getElementById(active_list_item.firstChild.id).innerHTML);
	            		//Get the active item
	            		active_item = active_list_item.id.split("-");
	            		active = parseInt(active_item[1]);
	            		if (active === 6) {
	            			if (startIndex < totalResults) {
	            				startIndex = startIndex + 1; //adds 1 if we are in the last item
	            			}
	            			firstPage = startIndex - 5; //the first page is the new last page minus 5
	            		}
	            		else {
	            			active = active + 1; //if we are not in the last item, add 1
	            			startIndex = startIndex + 1; //next index
	            			//the first number in pagination doesn't change, so we take the first anchor number 
	            			id = document.getElementById("item-1").firstChild.id;
							firstPage = parseInt(document.getElementById(id).innerHTML);
	            		}
	            	}
	            }
	            getpage.getPageData(startIndex, active, firstPage);
        	}
        }, false);
	}
  	return {
		addEvents: addEvents
  	};
});
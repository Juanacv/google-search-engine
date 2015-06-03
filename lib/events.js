define(["getpage"], function (getpage) {   
  'use strict';
  var FIRST_ITEM = 1;
  var LAST_ITEM = 6;
  function returnFirstPage() {
  	return parseInt(document.getElementById(document.getElementById("item-1").firstChild.id).innerHTML);
  }
  
  function returnActiveAndStartIndex(item) {
  	var activeItem; //item with the active class
  	var startIndex;
  	var active;
  	if (item === ".active") {
  		var activeListItem = document.querySelector(".active"); //get the active item
	    //Index page from the anchor in active item
	    startIndex = parseInt(document.getElementById(activeListItem.firstChild.id).innerHTML);
	    //Get the active item
	    activeItem = activeListItem.id.split("-");
	    active = parseInt(activeItem[1]);
  	}
  	else {
  		startIndex = parseInt(document.getElementById(item.id).innerHTML); //anchor clicked is the selectedIndex
    	activeItem = item.parentNode.id.split("-"); 
		active = parseInt(activeItem[1]); //the next active item is the item clicked too
	}
	return {active:active,startIndex:startIndex};
  }
  
  function addEvents(totalResults) {
    //adding event listener to every anchor in pagination
  	var parentUl = document.getElementById("itembox"); //getting the parent ul 
	parentUl.addEventListener("click", 
    	function (event) {
        	var el = event.target, found;
       		if (el.id === "" || !(el.id.startsWith("anchor-"))) {
       			found = (el.id === "prev" || el.id === "next") || el.id.startsWith("anchor-");
            	while (el && !found)    {
                	el = el.parentElement;
                	found = (el.id === "prev" || el.id === "next") || el.id.startsWith("anchor-");
            	}
        	}  
			else if (el.id.startsWith("anchor-")) {
				found = true;
			}
			if (found) {		
            	event.preventDefault();
            	var paginationObject;
            	var firstPage = 1; //first number in the navigation anchor list
            	var id;
            	if (el.id !== "prev" && el.id !== "next") {     //If is an anchor "item-" + anchor	
					paginationObject = returnActiveAndStartIndex(el);
					//the first number in pagination doesn't change, so we take the first anchor number 
	        		firstPage = returnFirstPage();
	        	}
	            else {
	            	paginationObject = returnActiveAndStartIndex(".active");
	            	if (el.id === "prev") { //if the "prev" anchor is clicked
	            		if (paginationObject.active === FIRST_ITEM) {
	            			if (paginationObject.startIndex > 1) {
	            				paginationObject.startIndex = paginationObject.startIndex - 1; //substract 1 if we are in the first item
	            			}
	            			firstPage = paginationObject.startIndex; //the first page is also the index
	            		}
	            		else {
	            			paginationObject.active = paginationObject.active - 1; //if we are not in the last item, substract 1
	            			paginationObject.startIndex = paginationObject.startIndex - 1; //previous index
	            			//the first number in pagination doesn't change, so we take the first anchor number 
							firstPage = returnFirstPage();
	            		}
	            	}
	            	if (el.id === "next") { //if the "next" anchor is clicked
	            		if (paginationObject.active === LAST_ITEM) {
	            			if (paginationObject.startIndex < totalResults) {
	            				paginationObject.startIndex = paginationObject.startIndex + 1; //adds 1 if we are in the last item
	            			}
	            			firstPage = paginationObject.startIndex - (LAST_ITEM-1); //the first page is the new last page minus 5
	            		}
	            		else {
	            			paginationObject.active = paginationObject.active + 1; //if we are not in the last item, add 1
	            			paginationObject.startIndex = paginationObject.startIndex + 1; //next index
	            			//the first number in pagination doesn't change, so we take the first anchor number 
							firstPage = returnFirstPage();
	            		}
	            	}
	            }
	            getpage.getPageData(paginationObject.startIndex, paginationObject.active, firstPage);
        	}
        }, false);
	}
  	return {
		addEvents: addEvents
  	};
});
define(["ajaxcall", "layout"], function (ajaxcall, layout) {  
  'use strict';
  //Return the results related to a new index chosen with the pagination links
  /**
  	@param {int} startIndex: results page index
  	@param {int} active: new active item in pagination anchor list
  	@param {int} firstPage: new first page number in pagination anchor list
  */
  function getPageData(startIndex, active, firstPage) { 
		var query = document.getElementById("query").value;
		if (query !== "") {
    		ajaxcall.getData({callback:function(response) { //call api
    			if (response !== "error" && response !== "loading") {
    				layout.paintIt(response, active, firstPage); //repaint web results, as callback
    			}
    		}, query:query, startIndex:startIndex});
    	}
  }
  return {
  	getPageData:getPageData
  };
});
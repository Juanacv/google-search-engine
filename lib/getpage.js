define(["ajaxcall", "layout"], function (ajaxcall, layout) {  
  'use strict';
  function getPageData(startIndex, active, firstPage) {
		var query = document.getElementById("query").value;
		if (query !== "") {
    		ajaxcall.getData({callback:function(response) { 
    			if (response !== "error" && response !== "loading") {
    				layout.printIt(response, active, firstPage); 
    			}
    		}, query:query, startIndex:startIndex});
    	}
  }
  return {
  	getPageData:getPageData
  };
});
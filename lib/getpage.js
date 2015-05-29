define(["ajaxcall", "layout"], function (ajaxcall, layout) {  
  function getPageData(startIndex, active, firstPage) {
		var query = document.getElementById("query").value;
		if (query !== "") {
    		ajaxcall.getData({callback:function(response) { 
    			if (response !== "error") {
    				layout.printIt(response, active, firstPage); 
    			}
    		}, query:query, startIndex:startIndex});
    	}
  }
  return {
  	getPageData:getPageData
  };
});
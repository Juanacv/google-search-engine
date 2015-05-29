define(function () {
	var TOTAL_LINKS_PAGINATION = 6;
	var MAX_ITEMS = 10;
	function printIt(result, active, firstPage) {
    	//text to json object
    	var obj = JSON.parse(result);
    	//last page
  		var lastPage = firstPage + TOTAL_LINKS_PAGINATION;
  		var itembox = document.getElementById("itembox");
  		//Add the result set
  		itembox.innerHTML = "";
  		for (var i=0; i < MAX_ITEMS; i++) {
  			var title = obj.items[i].title;
  			var link = obj.items[i].link;
  			var snippet = obj.items[i].htmlSnippet;
  			itembox.innerHTML = itembox.innerHTML + '<li><h5>'+title.replace(/'/g, "&apos;")+'</h5><a target="_blank" href="'+link+'">'+link+'</a><p>'+snippet.replace(/'/g, "&apos;")+'</p></li>';
  		}
  		//Add the pagination links
  		var pagination = '<li><nav><ul id="pagination" class="pagination"><li><a class="page_link" id="prev" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
  		var pages_numbers = "";
  		var total = 0;
  		var totalResults = obj.queries.nextPage[0].totalResults;
  		if (lastPage < totalResults) {
  			total = lastPage;
  		}
  		else {
  			total = totalResults;
  		}
  		var item_counter = 1;
  		for (i=firstPage; i < total; i++) {
  			if (item_counter==active) { //sets the active class
  				pages_numbers = pages_numbers + '<li id="item-'+item_counter+ '" class="active"><a class="page_link" id="anchor-'+i+'" href="#">'+i+'</a></li>';
  			}
  			else {
  				pages_numbers = pages_numbers + '<li id="item-'+item_counter+'"><a class="page_link" id="anchor-'+i+'" href="#">'+i+'</a></li>';  				
  			}
  			item_counter = item_counter + 1;
  		}
  		pagination = pagination + pages_numbers;
  		pagination = pagination + '<li><a class="page_link" id="next" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li></ul></nav></li>';
  		itembox.innerHTML = itembox.innerHTML + pagination;
		//Sets the result images
		var ul = document.getElementById("imagebox");
		ul.innerHTML  = "";
		for (i=0; i < MAX_ITEMS; i++) {
			if (typeof obj.items[i].pagemap !== "undefined" && typeof  obj.items[i].pagemap.cse_thumbnail !== "undefined" && typeof obj.items[i].pagemap.cse_thumbnail[0].src !== "undefined") {
				ul.innerHTML = ul.innerHTML + '<li><img id="image-"'+i+ ' src="'+obj.items[i].pagemap.cse_thumbnail[0].src+'"></li>';
			}
		}
		return totalResults;
    }
        
    return {
		printIt : printIt
    };
});

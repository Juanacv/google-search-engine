define(function () {
	'use strict';
	var TOTAL_LINKS_PAGINATION = 6;
	var MAX_ITEMS = 10;
	function paintIt(response, active, firstPage) {
    	//text to json object
    	var obj = JSON.parse(response);
    	//last page
  		var lastPage = firstPage + TOTAL_LINKS_PAGINATION;
  		var itembox = document.getElementById("itembox");
  		//Add the pagination links
  		var pagination = '<li><nav><ul id="pagination" class="pagination"><li><a class="page_link" id="prev" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
  		var pages_numbers = "";
  		var total = 0;
  		var totalResults = obj.queries.nextPage[0].totalResults;
  		var item_counter = 1;
		var ul = document.getElementById("imagebox");
		var i=0;
  		var title;
  		var link;
  		var snippet;
  		//Add the result set
  		itembox.innerHTML = "";
  		while (i < MAX_ITEMS) {
  			title = obj.items[i].title;
  			link = obj.items[i].link;
  			snippet = obj.items[i].htmlSnippet;
  			itembox.innerHTML = itembox.innerHTML + '<li><h5>'+title.replace(/'/g, "&apos;")+'</h5><a target="_blank" href="'+link+'">'+link+'</a><p>'+snippet.replace(/'/g, "&apos;")+'</p></li>';
  			i+=1;
  		}
  		if (lastPage < totalResults) {
  			total = lastPage;
  		}
  		else {
  			total = totalResults;
  		}
  		i=firstPage;
  		while (i < total) {
  			if (item_counter===active) { //sets the active class
  				pages_numbers = pages_numbers + '<li id="item-'+item_counter+ '" class="active"><a class="page_link" id="anchor-'+i+'" href="#">'+i+'</a></li>';
  			}
  			else {
  				pages_numbers = pages_numbers + '<li id="item-'+item_counter+'"><a class="page_link" id="anchor-'+i+'" href="#">'+i+'</a></li>';  				
  			}
  			item_counter = item_counter + 1;
  			i+=1;
  		}
  		pagination = pagination + pages_numbers;
  		pagination = pagination + '<li><a class="page_link" id="next" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li></ul></nav></li>';
  		itembox.innerHTML = itembox.innerHTML + pagination;
		//Sets the result images
		ul.innerHTML  = "";
		i=0;
		while(i < MAX_ITEMS) {
			if (obj.items[i].pagemap !== undefined && obj.items[i].pagemap.cse_thumbnail !== undefined && obj.items[i].pagemap.cse_thumbnail[0].src !== undefined) {
				ul.innerHTML = ul.innerHTML + '<li><img id="image-"'+i+ ' src="'+obj.items[i].pagemap.cse_thumbnail[0].src+'"></li>';
			}
			i+=1;
		}
		return totalResults;
    }
    return {
		paintIt : paintIt
    };
});

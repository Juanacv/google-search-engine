define(function () {
	'use strict';
	var TOTAL_LINKS_PAGINATION = 6;
	var MAX_ITEMS = 10;
	function paintIt(response, active, firstPage) {
    	//text to json object
    	var obj = JSON.parse(response);
    	//last page
  		var lastPage = firstPage + TOTAL_LINKS_PAGINATION;
  		var itemBox = document.getElementById("itembox");
  		//Add the pagination links
  		var pagination = '<li><nav><ul id="pagination" class="pagination"><li><a class="page_link" id="prev" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
  		var pagesNumbers = "";
  		var total = 0;
  		var totalResults = obj.queries.nextPage[0].totalResults;
  		var itemCounter = 1;
		var imageBox = document.getElementById("imagebox");
  		var title;
  		var link;
  		var snippet;
  		var i=0;
  		//Add the result set
  		itemBox.innerHTML = "";
  		while (i < MAX_ITEMS) {
  			title = obj.items[i].title;
  			link = obj.items[i].link;
  			snippet = obj.items[i].htmlSnippet;
  			itemBox.innerHTML = itemBox.innerHTML + '<li><h5>'+title.replace(/'/g, "&apos;")+'</h5><a target="_blank" href="'+link+'">'+link+'</a><p>'+snippet.replace(/'/g, "&apos;")+'</p></li>';
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
  			if (itemCounter===active) { //sets the active class
  				pagesNumbers = pagesNumbers + '<li id="item-'+itemCounter+ '" class="active"><a class="page_link" id="anchor-'+i+'" href="#">'+i+'</a></li>';
  			}
  			else {
  				pagesNumbers = pagesNumbers + '<li id="item-'+itemCounter+'"><a class="page_link" id="anchor-'+i+'" href="#">'+i+'</a></li>';  				
  			}
  			itemCounter = itemCounter + 1;
  			i+=1;
  		}
  		pagination = pagination + pagesNumbers;
  		pagination = pagination + '<li><a class="page_link" id="next" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li></ul></nav></li>';
  		itemBox.innerHTML = itemBox.innerHTML + pagination;
		//Sets the result images
		imageBox.innerHTML  = "";
		i=0;
		while(i < MAX_ITEMS) {
			if (obj.items[i].pagemap !== undefined && obj.items[i].pagemap.cse_thumbnail !== undefined && obj.items[i].pagemap.cse_thumbnail[0].src !== undefined) {
				imageBox.innerHTML = imageBox.innerHTML + '<li><img id="image-"'+i+ ' src="'+obj.items[i].pagemap.cse_thumbnail[0].src+'"></li>';
			}
			i+=1;
		}
		return totalResults;
    }
    return {
		paintIt : paintIt
    };
});

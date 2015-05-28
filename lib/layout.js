define(["events"], function (events) {
	var TOTAL_LINKS_PAGINATION = 6;
    return {
    	printIt:function(result, firstPage, active) {
    		//text to json object
    		var obj = eval ("("+result+")");
    		//last page
  			var lastPage = firstPage + TOTAL_LINKS_PAGINATION;
  			var itembox = document.getElementById("itembox");
  			//Add the result set
  			itembox.innerHTML = "";
  			for (var i=0; i < 4; i++) {
  				var title = obj.items[i].title;
  				var link = obj.items[i].link;
  				var snippet = obj.items[i].htmlSnippet;
  				itembox.innerHTML = itembox.innerHTML + '<li><h4>'+title.replace(/'/g, "&apos;")+'</h4><a target="_blank" href="'+link+'">'+link+'</a><p>'+snippet.replace(/'/g, "&apos;")+'</p></li>';
  			}
  			//Add the pagination links
  			var pagination = '<li><nav><ul id="pagination" class="pagination"><li><a id="prev" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
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
  			for (var i=firstPage; i < total; i++) {
  				if (item_counter==active) { //sets the active class
  					pages_numbers = pages_numbers + '<li id="item-'+item_counter+ '" class="active"><a id="anchor-'+i+'" href="#">'+i+'</a></li>';
  				}
  				else {
  					pages_numbers = pages_numbers + '<li id="item-'+item_counter+'"><a id="anchor-'+i+'" href="#">'+i+'</a></li>';  				
  				}
  				item_counter = item_counter + 1;
  			}
  			pagination = pagination + pages_numbers;
  			pagination = pagination + '<li><a id="next" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li></ul></nav></li>';
  			itembox.innerHTML = itembox.innerHTML + pagination;
			//Sets the result images
			document.getElementById("image-0").src = obj.items[0].pagemap.cse_thumbnail[0].src;
			document.getElementById("image-1").src = obj.items[1].pagemap.cse_thumbnail[0].src;
			document.getElementById("image-2").src = obj.items[2].pagemap.cse_thumbnail[0].src;
			document.getElementById("image-3").src = obj.items[3].pagemap.cse_thumbnail[0].src;
			
  			events.addEvents(totalResults);
        }
    };
});

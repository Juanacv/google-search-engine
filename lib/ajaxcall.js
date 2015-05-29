define(function () {
	//API id
	var API_ID = "AIzaSyAOkeze_9eWjH5XkE5m3N0iptgzRPeiAR4";
	//Custom Search Identifier
	var CX = "018042016272617285396:zbz1kqzxosw";
	var MAX_ITEMS = 10;
	function getData(options) {
		//Url with the api
		var url = "https://www.googleapis.com/customsearch/v1?key="+API_ID+"&cx="+CX+"&q=";
		//Ajax object
		var xmlhttp =new XMLHttpRequest();
		//Checking call result
		xmlhttp.onreadystatechange=function()
  		{
  			//On success, send result to callback
  			if (xmlhttp.readyState==4 && xmlhttp.status==200)
    		{
    			options.callback(xmlhttp.responseText);
  			}
  			else {
  				options.callback("error");
  			}
  		};
  		var startIndex = options.startIndex  > 0 ?  options.startIndex - 1 : options.startIndex;
  		//url with the string query
  		url = url + options.query.replace(/ /g,"%20").replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  		//url with the number of items we want and start index
  		url = url + "&num="+MAX_ITEMS+"&start=" + ((startIndex * MAX_ITEMS) + 1);
  		//url = "json.txt";
  		//ajax call
		xmlhttp.open("GET",url,true);
		xmlhttp.send();
	}
	
    return {
        getData: getData
    };
});

define(function () {
	//API id
	var API_ID = "AIzaSyAOkeze_9eWjH5XkE5m3N0iptgzRPeiAR4";
	//Custom Search Identifier
	var CX = "018042016272617285396:zbz1kqzxosw";
	//Url with the api
	var url = "https://www.googleapis.com/customsearch/v1?key="+API_ID+"&cx="+CX+"&q="
	function getData(options) {
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
  		}
  		var startIndex = options.startIndex;
  		if (startIndex > 1) {
  			startIndex = startIndex - 1;
  		}
  		//url with the string query
  		url = url + options.query;
  		url = url + "&num=4&start=" + ((startIndex * 4) + 1);
  		//url = "json.txt";
  		//ajax call
		xmlhttp.open("GET",url,true);
		xmlhttp.send();
	}
	
    return {
        getData: getData
    }
});

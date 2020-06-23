(function (global) {    //IIFE
	// set up a namespace for our utility

  var ajaxUtils={};

 //this functions returns an HTTP request object
 function getRequestObject() {
 	
 	 if(window.XMLHttpRequest){
 	 	return (new XMLHttpRequest());
 	 }
 
    else{
    	global.alert("Ajax is not supported!");
    	return(null);
    }
    
}

//this function makes an Ajax request to 'requestUrl'

 ajaxUtils.sendGetRequest=
    function(requestUrl,responseHandler,isJsonResponse){

    var request=getRequestObject();
    request.onreadystatechange=
      function(){
      	handleResponse(request,responseHandler,isJsonResponse);
      };

      request.open("GET",requestUrl,true);
      request.send(null); //for post only
    };

//only calls user provided 'responseHandler'
//function if response is ready
//and not an error

function handleResponse(request,
	                  responseHandler,isJsonResponse) {
  if ((request.readyState==4)&&
  	         (request.status==200)) {
  	
  	if (isJsonResponse===undefined) {
  		isJsonResponse=true;
  	}
  	if (isJsonResponse) {
  		responseHandler(JSON.parse(request.responseText))
  	}
  	else{
  		responseHandler(request.responseText);
  	}
  }
}

//Expose utility to the global object
global.$ajaxUtils=ajaxUtils;

})(window); 
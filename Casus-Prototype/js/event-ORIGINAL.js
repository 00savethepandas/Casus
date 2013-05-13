var key = "X2K9FTVqcvH9vVFr";


        $(document).ready(function() {
        // console.log is used to send text data to the console
        console.log('doc ready!');
        
        
        
        

        // a function called when a click event is registered on 
        // an element with the id of 'submit'
        $('#submit').click(function(){
          // create a simple array with one member key 
          // this is the twitter search term, feel free to modify this	
          var search_term = $("input#event").val()
          var location_term = $("input#location").val()
          
          //var location_term = $("$input#location").val()
          // pass the search term to the search function defined below
          search(search_term, location_term);
        });
      });
      
      
      
      //=========
     // =======
    
      
      

/*

      $(document).ready(function() {
        // console.log is used to send text data to the console
        console.log('doc ready!');
        
        
        
        

        // a function called when a click event is registered on 
        // an element with the id of 'submit'
        $('#submit').click(function(){
          // create a simple array with one member key 
          // this is the twitter search term, feel free to modify this
          var search_term = {
            $("input#event").val()
          };
          // pass the search term to the search function defined below
          search(search_term);
        });
      });
      
      */

      /*
        the main search function

        this takes a search term defined by 'search_term' and then uses the 
        jquery ajax function to connect to the twitter search api as outlined here:
        - https://dev.twitter.com/docs/api/1/get/search 
        
        for more info on what you can do with the jquery ajax function see:
        - http://api.jquery.com/jQuery.ajax/
      */
      function search(search_term, location_term) {
        $.ajax({
          /* the 'param' function ensures that our search terms are properly encoded
             see: http://api.jquery.com/jQuery.param/ */
          //url: 'http://api.eventful.com/json/events/search?app_key=zVwQWb6RdTz8gF85',          //+ $.param(search_term),
       //  url:  "http://api.evdb.com/json/categories/list?app_key=zVwQWb6RdTz8gF85",
         url: "http://api.eventful.com/json/events/search?app_key=zVwQWb6RdTz8gF85&keywords="+search_term+"&location="+location_term+"&date=Future",
         
        /* url: "http://api.eventful.com/json/events/search?app_key=zVwQWb6RdTz8gF85&keywords="+search_term+"&location=Newark+&date=Future",
*/
         // q: $("input#event").val(),
        //  + $.param(search_term),
          //app_key: key,
          

          /* the data type should be set to jsonp. for more info on that see:
             http://en.wikipedia.org/wiki/JSONP */
          dataType: 'jsonp',

          /* since the function runs asynchronously, we need to define what should happen
             when the twitter API sends back a successful response (i.e. HTTP code 200)
          */

          success: function(data) {
            // uncomment the below to see the data in the console
           // console.dir(data);

console.log(data);
var output='';
var output2='';

for (var i = 0; i < data.events.event.length; i++){
var title = data.events.event[i].title;
var venueaddress = data.events.event[i].venue_address;
var venueName = data.events.event[i].venue_name;
var id = data.events.event[i].id;
var description = data.events.event[i].description;
var starttime  = data.events.event[i].start_time;
var venueDisplay = data.events.event[i].venue_display;
var k = i;

console.log(k);
console.log(title);
console.log(venueDisplay);

console.log(description);
console.log(starttime);

console.log(venueaddress);
console.log(venueName);
console.log(id);
var blocktype =
			((i%3)===2) ? 'c':
			((i%3)===1) ? 'b':
			'a';
		//output += '<h2>' + k +'</h2>'
	
		/*output2 += '<h3>'+ k + title +'</h3>' + '<div><p>' + venueDisplay + '<p>' + '<p>' + description + '<p>' + '<p>' + starttime + '<p>' + '<p>' + venueaddress + '<p>' + '<p>' + venueName + '<p>' + '<p>' + id + '<p></div>'
		*/
				output += '<li><a href="#page2">' + title + '</a></li>'

		
		/*output += '<div><p>' + venueDisplay + '<p>'

		output += '<p>' + description + '<p>'
		 output += '<p>' + starttime + '<p>'

		output += '<p>' + venueaddress + '<p>'
		output += '<p>' + venueName + '<p>'
		output += '<p>' + id + '<p></div>'
*/
		
 $("#eventinfo ul").append("<li><a onclick=getEvents('"+id+"') href=#page3>"+title+"</a></li>");
          $("#eventinfo ul").listview('refresh');  


}

//$('#eventinfo').html(output);
//$('#eventlist').html(output2);
/*
console.log(description);
console.log(venueaddress);
console.log(venueName);
  */
  
  
            /* loop through each item inside of data['results'] and
               extract the 'text' property.
               we then use that to create a list item tag (<li>) and append
               that to the HTML element with id 'tweets'
            */
            
           //var info = JSON.parse(data)
           
            //alert(info.events);
          /*
            for (i=0; i<data.events.length;) {
              $('#event').append(
                '<li>' + data['results'][item]['text'] + '</li>'); 
                
            }*/
          }
        });
      }
      
      
      
      function getEvents(id) {
      a = id;
      saveModel(a)
        $.ajax({
          /* the 'param' function ensures that our search terms are properly encoded
             see: http://api.jquery.com/jQuery.param/ */
          //url: 'http://api.eventful.com/json/events/search?app_key=zVwQWb6RdTz8gF85',          //+ $.param(search_term),
       //  url:  "http://api.evdb.com/json/categories/list?app_key=zVwQWb6RdTz8gF85",
         url: "http://api.evdb.com/json/events/get?app_key=zVwQWb6RdTz8gF85&id="+id,
         
        /* url: "http://api.eventful.com/json/events/search?app_key=zVwQWb6RdTz8gF85&keywords="+search_term+"&location=Newark+&date=Future",
*/
         // q: $("input#event").val(),
        //  + $.param(search_term),
          //app_key: key,
          

          /* the data type should be set to jsonp. for more info on that see:
             http://en.wikipedia.org/wiki/JSONP */
          dataType: 'jsonp',

          /* since the function runs asynchronously, we need to define what should happen
             when the twitter API sends back a successful response (i.e. HTTP code 200)
          */

          success: function(data) {
            // uncomment the below to see the data in the console
           // console.dir(data);

console.log(data);


var output='';
var output2='';

for (var i = 0; i < 1; i++){
/*var title = data.events.event[i].title;
var venueaddress = data.events.event[i].venue_address;
var venueName = data.events.event[i].venue_name;
var id = data.events.event[i].id;
var description = data.events.event[i].description;
var starttime  = data.events.event[i].start_time;
var venueDisplay = data.events.event[i].venue_display;
var k = i;
*/

var titeEvent = data.title;
var timeInf = data.start_time;
var desc = data.description;
var addr = data.address;
var image = data.image
/*
console.log(k);
console.log(title);
console.log(venueDisplay);

console.log(description);
console.log(starttime);

console.log(venueaddress);
console.log(venueName);
console.log(id);

var blocktype =
			((i%3)===2) ? 'c':
			((i%3)===1) ? 'b':
			'a';
			*/
			
		//output += '<h2>' + k +'</h2>'
		output2 += '<h3>'+ titeEvent +'</h3>'
		output2 += '<p>'+ desc +'<p>'

		
	/*
		output2 += '<h3>'+ k + title +'</h3>' + '<div><p>' + venueDisplay + '<p>' + '<p>' + description + '<p>' + '<p>' + starttime + '<p>' + '<p>' + venueaddress + '<p>' + '<p>' + venueName + '<p>' + '<p>' + id + '<p></div>'
		*/
				//output += '<li><a href="#page2">' + title + '</a></li>'

		
		
		
		/*output += '<div><p>' + venueDisplay + '<p>'

		output += '<p>' + description + '<p>'
		 output += '<p>' + starttime + '<p>'

		output += '<p>' + venueaddress + '<p>'
		output += '<p>' + venueName + '<p>'
		output += '<p>' + id + '<p></div>'
*/
		


}

$('#eventinfo').html(output);
$('#eventlist').html(output2);
/*
console.log(description);
console.log(venueaddress);
console.log(venueName);
  */
  
  
            /* loop through each item inside of data['results'] and
               extract the 'text' property.
               we then use that to create a list item tag (<li>) and append
               that to the HTML element with id 'tweets'
            */
            
           //var info = JSON.parse(data)
           
            //alert(info.events);
          /*
            for (i=0; i<data.events.length;) {
              $('#event').append(
                '<li>' + data['results'][item]['text'] + '</li>'); 
                
            }*/
          }
        });
      }
      
      
      
function saveModel(a){
	console.log(a);
	sessionStorage.setItem('favEvent', a);	
}

function addFavs(){
  favE = sessionStorage.getItem("favEvent");
  alert('Added to Favorites.');

  var favEvents = JSON.parse(localStorage.getItem("event")) || [];
  favEvents.push(favE);
  localStorage.setItem('event', JSON.stringify(favEvents));
  
  //console.log(JSON.parse(localStorage.getItem("key")));
  loadFavs();
}

function loadFavs() {
  console.log(JSON.parse(localStorage.getItem("event")));
  var Eventarray = JSON.parse(localStorage.getItem("event"));
  //alert(array[5]);
 
  $("#favorite ul").empty();
  for (var i=0; i<Eventarray.length; i++) {
    var favEvent = Eventarray[i];
    $("#favorite ul").append("<li><a onclick=getEvents('"+favEvent+"') href=#page3>"+favEvent+"</a></li>");
    $("#favorite ul").listview('refresh');  
  }
}

function clearFavs(){
  localStorage.clear();
  location.reload();
}

      
      
      
      

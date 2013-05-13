var key = "X2K9FTVqcvH9vVFr";

$(document).ready(function() {
        $('#submit').click(function(){
          // create a simple array with one member key 
          // this is the twitter search term, feel free to modify this	
          var search_term = $("input#event").val()
          var location_term = $("input#location").val()
          
          // pass the search term to the search function defined below
          search(search_term, location_term);
    });
});
      
 
      function search(search_term, location_term) {
        $.ajax({
         url: "http://api.eventful.com/json/events/search?app_key=zVwQWb6RdTz8gF85&keywords="+search_term+"&location="+location_term+"&date=Future",
         
          dataType: 'jsonp',

          success: function(data) {

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

				output += '<li><a href="#page2">' + title + '</a></li>'

		
 $("#eventinfo ul").append("<li><a onclick=getEvents('"+id+"') href=#page3>"+title+"</a></li>");
          $("#eventinfo ul").listview('refresh');  
}

          }
        });
      }
 
      function getEvents(id) {
      a = id;
      saveModel(a)
        $.ajax({

         url: "http://api.evdb.com/json/events/get?app_key=zVwQWb6RdTz8gF85&id="+id,
         
          dataType: 'jsonp',

          
          success: function(data) {
          
console.log(data);


var output='';
var output2='';

for (var i = 0; i < 1; i++){

var titeEvent = data.title;
var timeInf = data.start_time;
var desc = data.description;
var addr = data.address;
var image = data.image

		output2 += '<h3>'+ titeEvent +'</h3>'
		output2 += '<p>'+ desc +'<p>'
}

$('#eventinfo').html(output);
$('#eventlist').html(output2);

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

      
      
      
      

// MAIN TODO MODEL
var Todo = Backbone.Model.extend({
    defaults: function() {
      return {
	id: 0,
	title: 'defaultname',
	/*imgUrl: 'defaultimageurl',
        order: searchTemp.nextOrder(),
        rating: 0,
        timeToMake: '',
        salty: 0,
        sour: 0,
        sweet: 0,
        bitter: 0,	
        isPerm: false,*/
	desc: 'description', // ingrs: result[i].ingredients,
	addr: 'address',
	startTime: 'start',
	endTime: 'end',
	venue: 'venue',
	venueAddy: 'venuAddress',
	city: 'city',
	state: 'state',
	zip: 'zip',
	venueURL: 'venue_URL',
	eventImg: 'eventImage',
		
	taggedForList: false
      };
    },		
    initialize: function(){
      if( !this.get('ingrs') ){ 
        this.set({ingrs: new Array()});
      }
    },
    saveModel: function() {
	this.set({isPerm: true});
	this.save();
    }
});

// THE COLLECTION

var TodoList = Backbone.Collection.extend({
  model: Todo,
  localStorage: new Backbone.LocalStorage("searchTemp"),
  initialize: function() {
  },

  nextOrder: function() {
  if (!this.length) return 1;
  return this.last().get('order') + 1;
  },
  comparator: 'order',
  taggedForList: function() {
    return this.where({taggedForList: true});
  },
  
  taggedForList: function() {
    return this.where({taggedForList: true});
  },
  
  remaining: function() {
    return this.without.apply(this, this.taggedForList);
  },
  
  //function to reset the collection
  wipe: function() {
    this.reset();  //resets the entire collection
    console.log("wipe() called, current state:");
    console.log(this.models);
  },
  //
  restore: function() {
    this.reset(this.fetch());
    console.log("collection restored, current state:");
  },
  extractIngrs: function() {
    savedTemp=this.fetch(); //want to only get things saved to local storage
    var allIngrs = new Array(); 
    var rawIngrs = searchTemp.pluck("ingrs");
    $.each(rawIngrs, function(i, item) {
        allIngrs = _.union(allIngrs, rawIngrs[i]);
    });
    return allIngrs;
  },
  findEvents: function(search_term, location) { 
    console.log("findEvents called");
    searchTemp.wipe();
    $.ajax({
      url: "http://api.eventful.com/json/events/search?app_key=zVwQWb6RdTz8gF85&keywords="+search_term+"&location=" + location + "&date=Future", 
	  
	  dataType: 'jsonp',
       complete:function(){
            $('[data-role="listview"]').listview(); //re-active all listview
        },
    success: function(apiStuff){
	console.log(apiStuff);
	var result = new Array();     
	result = apiStuff.events.event;          //saves the API's response as a new array
	console.log(result);
	  
	$.each(result, function(i, item) {
	  var anotherEvent= new Todo();    // makes a new model for each result
	  
	  anotherEvent.set({
	    id: result[i].id,            //then sets the attributes
	    title: result[i].title, // .title	
	    desc: result[i].description, // ingrs: result[i].ingredients,
		addr: result[i].address,
		startTime: result[i].start_time,
		endTime: result[i].stop_time,
		venue: result[i].venue_name,
		venueAddy: result[i].venue_address,
		city: result[i].city_name,
		state: result[i].region_abbr,
		zip: result[i].postal_code,
		venueURL: result[i].venue_url,
		eventImg: result[i].image,
        });


	  searchTemp.add(anotherEvent);    //adds the model to the temporary     
	});
      }  
  });
  }  
});

// SHOP ITEM MODEL

var ShopItem = Backbone.Model.extend({
    idAttribute:"_id", 
    defaults: function() {
        return {
            ingr : 'ingredient',
            done : false
        }
    },
    toggle: function() {
      this.save({done: !this.get("done")}); 
    }
});
  
// HOME VIEW ( JQUERY BACKBONE TEMPLATE - SAME FOR CASUS

window.HomeView = Backbone.View.extend({
    template:_.template($('#home').html()), 
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});


// NEW SEARCH VIEW
window.newSearchView = Backbone.View.extend({
    template:_.template($('#newSearch').html()),
    initialize: function() {
        console.log(searchTemp);
        searchTemp.wipe();
        searchTemp.bind('add', this.render, this);
    },
    render:function (eventName) {
        results = searchTemp.toJSON();
        var variables = {
            recipes: results
        };
        $(this.el).html(this.template());
        return this;
    },
    events: {
      "keypress #event-search":  "searchOnEnter",
      //add a listener to newSearch to change what's displayed on this list
    },
    searchOnEnter: function(e) {   //the search bar's functionality
      if (e.keyCode != 13) return;
	  var sLocation = $("input[id='location-search']").val();
      var searching = $("input[id='event-search']").val();
	  searchTemp.findEvents(searching, sLocation); // findRecipes
    }
});

// NEW WINDOW.NEW LIST VIEW
window.newListView = Backbone.View.extend({
    template : _.template($('#newList').html()),
    initialize: function() {
    },
    render:function (eventName) {
        Event = this.model.toJSON();
        $(this.el).html(this.template());
        return this;
    },
    events: {
      "click #save-this":  "saveModel"
    },
    saveModel: function() {
	console.log("saveModel() called");
        this.model.saveModel();
        searchTemp.each(function (model) {
	    if(model.isPerm) {
		model.save();
	    }
	});
    }
});

// WINDOW SAVED RECIPES VIEW
window.savedEventsView = Backbone.View.extend({ // savedRecipessView
    template:_.template($('#savedEvents').html()), // savedRecipes
    initialize: function() {
	searchTemp.fetch();
    },
    render:function (data) {    
        results = searchTemp.toJSON();
        var variables = {
            results: results
        };
	$(this.el).html(this.template(variables));
        return this;
    }
});


// WINDOW OLD LIST VIEW
window.oldListView = Backbone.View.extend({
    template:_.template($('#oldList').html()), 
    initialize: function() {
        //dont need to mess with searchTemp, it should be all set up by savedEventsView    
    },
    render: function (data) {
        Event = this.model.toJSON();
        $(this.el).html(this.template());
        return this;
        //$(this.el).html(this.template(variables));
    },
    events: {
      "click #instructions":  "gotoInstructions"
    },
    gotoInstructions: function() {
        //do this later
    }
});

// WINDOW DELETE OLD VIEW
window.deleteOldView =  Backbone.View.extend({
    template:_.template($('#deleteOld').html()), 
    render: function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

// APP ROUTER    
var AppRouter = Backbone.Router.extend({
    routes:{
        "":"home",
        "newSearch":"newSearch",
        "newList/:id":"newList",
        "savedEvents":"savedEvents", // savedRecipes
        "oldList/:id":"oldList",
		"deleteOld":"deleteOld",
    },
    initialize:function () {
        // Handle back button throughout the application
        $('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
    },
    home:function () {
        this.changePage(new HomeView());
    },
    newSearch:function () {
        this.changePage(new newSearchView());
    },
    newList:function (theID) {
        var tempModel = searchTemp.get(theID);
        this.changePage(new newListView({
            model: tempModel,
            id: theID
        }));
        //console.log(permStorage.taggedForList());
    },
    savedEvents:function () {  // savedRecipes:function () {  
        this.changePage(new savedEventsView()); // savedRecipesView
    },
    oldList:function (theID) {
        //searchTemp.restore();
        var tempModel = searchTemp.get(theID);
        this.changePage(new oldListView({
            model: tempModel,
            id: theID    
        }));
    },
    deleteOld:function () {
        this.changePage(new deleteOldView());
    },

    changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        var transition = $.mobile.defaultPageTransition;
        // We don't want to slide the first page
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }
        $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
    }

});

$(document).ready(function () {
    console.log('document ready');
    app = new AppRouter();
    Backbone.history.start();
    searchTemp = new TodoList(); //this stores searched recipes, rename to myRecipes
});
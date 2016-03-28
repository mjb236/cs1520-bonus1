// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function() {
	// Magic!
	console.log('Keepin\'n it clean with an external script!');
	
	$.getJSON("http://www.mattbowytz.com/simple_api.json?data=all", function(data) {
		console.log(data);
		$(".results").hide();
		$(".results").css("visibility", "hidden");
		var searchItems = new Array();
		var i = 0;
		
		for(i = 0; i < data.data.interests.length; i++) {
			searchItems[i] = data.data.interests[i];
		}
		
		for(i = 0; i < data.data.programming.length; i++) {
			searchItems[data.data.interests.length + i] = data.data.programming[i];
		}
		searchItems.sort();	
		console.log(searchItems);
		
		//listen for enter key and submit search if it is pressed
		$("#mainForm").keypress(function(event) {
			if(event.which == 13) {
				event.preventDefault();
				location.href = "http://www.google.com/search?q=" + $(".flexsearch-input").val();
			}
		});
		
		//listen for submit button press and submit search if it is pressed
		$(".flexsearch-submit").click(function(event) {
			event.preventDefault();
			window.location.href = "http://www.google.com/search?q=" + $(".flexsearch-input").val();
			
		});
		
		//on keyup, display possible search terms fround from the API
		$(".flexsearch-input").keyup(function(event) {
			$(".results").empty();
			var input = $(".flexsearch-input").val();
			var j = 0;
			var resultList = new Array();
			
			if(input.length > 0) {
				for(i = 0; i < searchItems.length; i++) {
					if(searchItems[i].substring(0, input.length).toLowerCase() == input.toLowerCase()) {
						resultList[j] = searchItems[i];
						j++;
					}
				}
			}
		
			if(resultList.length > 0) {
				$(".results").show();
				$(".results").css("visibility", "visible");
				for(j = 0; j < resultList.length; j++) {
					var link = "<li class=\"search-item\"><a href=\"http://www.google.com/search?q=" + 
											resultList[j].toLowerCase() + "\">" + resultList[j].toLowerCase() + "</a></li>";
					$(".results").append(link);
				}
			}
			else {
				$(".results").hide();
			}
						
			console.log(input.length);
		});

	});
})();
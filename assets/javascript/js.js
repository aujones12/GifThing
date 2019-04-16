
var tvShows = ["dogs", "cats", "turtles", "pandas", "tigres", "goats", "otters", "llamas"];

function renderButtons() {
	$("#buttonsArea").empty();
	for (var i = 0; i < tvShows.length; i++) {
		var button = $("<button>");
		button.html(tvShows[i]);
		button.addClass("btn btn-outline-secondary");
		button.attr("id", "tv-btn");
		button.attr("tv-title", tvShows[i]);
		$("#buttonsArea").append(button);
	}
}

function displayGifs() {
	var thisShow = $(this).attr("tv-title");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thisShow + "&api_key=dc6zaTOxFJmzC";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		var response = response.data;
		for (var i = 0; i < response.length; i++) {
			var gifDiv = $("<div>");
			gifDiv.addClass("gifDiv");

			var rating = response[i].rating;
			var ratingText = $("<p>").html("Rating: " + rating);
			ratingText.addClass("text-center");

			var gifImage = $("<img>");
			gifImage.addClass("gif");
			gifImage.attr("src", response[i].images.fixed_height_still.url);
			gifImage.attr("data-still", response[i].images.fixed_height_still.url);
			gifImage.attr("data-animate", response[i].images.fixed_height.url);
			gifImage.attr("data-state", "still");

			gifDiv.append(ratingText);
			gifDiv.prepend(gifImage);

			$("#mainArea").prepend(gifDiv);
		}
	});
}

$("#submit-btn").on("click", function(event) {
	event.preventDefault();

	var newShow = $("#userInput").val().trim();
	tvShows.push(newShow);
	renderButtons();
});

$(document).on("click", "#tv-btn", displayGifs);

$(document).on("click", ".gif", function() {
	var state = $(this).attr("data-state");

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});

renderButtons();


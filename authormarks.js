/*
Author Marks script by Matt Gemmell
Web: http://mattgemmell.com/
Twitter: http://twitter.com/mattgemmell

Use the HTML5 <mark>...</mark> tag (with CSS class "author-mark" applied) to indicate important, quotable or key points. This script allows toggling highlights for those sections, by adding or removing the CSS "marks-highlighted" class from each <mark> tag with the "author-mark" CSS class applied.

This script expects at least one marks-toggling link (<a href="...">...</a>) to be present in the document, using the CSS "toggle-marks-highlight" class. The toggling link(s) themselves will also have the "marks-highlighted" class added or removed when toggling occurs.

This script requires jQuery.
*/

$(document).ready(function() {
	// This runs automatically when the document has loaded.
    setupAuthorMarks();
});


function setupAuthorMarks() {
	// Locate toggling links.
	var toggleLinks = $(".toggle-marks-highlight");
	// Configure links to trigger toggling.
	toggleLinks.bind("click", toggleAuthorMarks);
	// Create state array
	window.author_marks_highlighted = new Array();
	// Set initial states
	toggleLinks.each(function() {
		var selector =  $(this).data('author-mark-selector');
		// backward compatibility
		if (selector == undefined) {
			selector = '.author-mark';
			$(this).data('author-mark-selector', selector);
		}
		window.author_marks_highlighted[selector] = false;
	});
}


function toggleAuthorMarks() {
	// read microdata
	var selector = $(this).data('author-mark-selector');

	// get highlight state
	var doHighlight = !window.author_marks_highlighted[selector];	

	// Locate marks
	var marks = $(selector);
    console.log(selector);

	// Locate toggles with same selector
	var toggles = $('[data-author-mark-selector=\'' + selector + '\']');

	// Add or remove highlighting CSS class depending on current status.
	window.author_marks_highlighted[selector] = doHighlight;

	var highlightedClass = "marks-highlighted";
	if (doHighlight) {
		marks.addClass(highlightedClass);
		toggles.addClass(highlightedClass);
		toggles.html("Hide Author Marks");
	} else {
		marks.removeClass(highlightedClass);
		toggles.removeClass(highlightedClass);
		toggles.html("Show Author Marks");
	}

	// Update current status.
	window.author_marks_highlighted[selector] = doHighlight;

	// Don't actually follow the toggling links.
	return false;
}

$(document).ready(function(){
//add elements to the nav section based on input from other page scriptz
	switch (pagesub) {
	case 'CRITO':
		$("#nav_wrapper").append('<div class="ui-slider ui-slider-horizontal" id="slider"></div>');
		$("#nav_wrapper").append('<div id="amount"></div>');
		$("#nav_wrapper").append('<ul class="nav" id="nav2">');
		$("#nav2").append("<li>f00</li>");
		$("#nav_wrapper").append('</ul>');
		break;

	}


});

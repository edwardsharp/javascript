$(document).ready(function(){
// show/hide leftdump stuff

//define custom jquery animation
//these timers control the hiding of the nav menuz
//init timer based on element
//stop the timer if the element gets mouse attention
//start the timer when the mouse goes away

	//import jquery.timer

//NAV
	$("#nav_wrapper").oneTime(5000, function() {
		$(".nav").hide("slow");
	});


	$("#nav_wrapper").mouseover(function () {
		$("#nav_wrapper").stopTime();
		$(".nav").show("slow");
		$(".nav").css({'background-color' : '#ddd',});
    }); 

	$("#nav_wrapper").mouseleave(function () {
		$(this).oneTime(1000, function() {
			$(".nav").hide("slow");
		
			});
    }); 

//LEFT
	$("#left_wrapper").oneTime(5000, function() {
		$(".left").hide("slow");
	});
	$("#left_wrapper").mouseover(function () {
		$("#left_wrapper").stopTime();
		$(".left").show("slow");	
    }); 

	$("#left_wrapper").mouseleave(function () {
		$(this).oneTime(1000, function() {
			$(".left").hide("slow");
			});
	
    }); 

//LEFT
/*
	$("pre").oneTime(20000, function() {
		$("pre").hide("slow");
	});
*/
//NEED TO HAVE GLOBAL TURN OFF, I GUESS


});

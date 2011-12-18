$(document).ready(function() { 
var url= '/project/cam/camAction.php';
var amt = 1;	
	$(".navbutton").click(function() {
		amt = $(this).text();

	});

	$("#cam-dib").click(function() {
		var theDate=new Date();
		var click_url= '/project/cam/camAction.php?x='+amt+'&shitcash='+ theDate;   
		$("#cam-append").empty();
		$.get(click_url, function(html) { 
			 // append the "ajax'd" data to the table body 
			 $("#cam-append").append(html); 			
		}); 
	});

	$.get(url, function(html) { 
			 // append the "ajax'd" data to the table body 
			 $("#cam-append").append(html); 			
		});  


	$("#navcontainer").oneTime(5000, function() {
		$("#navlist").hide("slow");
	});


	$("#navcontainer").mouseover(function () {
		$("#navlist").show("slow");
		//$("#navcontainer").css({'background-color' : '#ddd',});
    }); 

	$("#navcontainer").mouseleave(function () {
		$(this).oneTime(1000, function() {
			$("#navlist").hide("slow");
		
			});

    }); 
});    

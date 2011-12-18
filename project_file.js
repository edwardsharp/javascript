$(document).ready(function() { 
//generate a time difference and hand that to addToDO()
//store it as a $_SESSION var
//
//get the row ID

	//button code
	//
	//good
	$("#txt-dib").click(function() {   
		jQuery.ajax({
			type: "GET",
			url: "/project/file/fileAction.php",
			data: $("#txt").serialize(),
			timeout: 30000,
			error: function() {
				$("#txtData").empty();
				$("#txtData").append("ALL UR BASE ARE BELONG TO US!");
			},
			success: function(html){
				$("#txtData").hide("slow");
				$("#txtData").empty();
				$("#txtData").append(html);
				$("#txtData").show("slow");
				$("#txtData").scrambledWriter();
				return false;
		  }
		  });
		
	});
	$("#txtData").everyTime(6000, function() { 
		//$("#txtData").animate({"left": "+=600px"}, "slow");
		jQuery.ajax({
			type: "GET",
			url: "/project/file/fileAction.php",
			data: $("#txt").serialize(),
			timeout: 30000,
			error: function() {
				$("#txtData").empty();
				$("#txtData").append("ALL UR BASE ARE BELONG TO US!");
			},
			success: function(html){
				$("#txtData").empty();
				$("#txtData").append(html);
				
				$("#txtData").scrambledWriter();
				//$("#txtData").empty();
				return false;
		  }
		  });
		  

	});
	//end buttonz
	//
	//calc the difference in date timeSpent
	 //$("#timeSpent").ajaxStart(function(){
	//	var startDate = new Date();
	//	var timeSpent = clickDate - startDate;
	//	$(this).value();
	// });
		

	// CONSTRUCTOR
	// this loades content when the page loadz. 
	jQuery.ajax({
			type: "GET",
			url: "/project/file/fileAction.php?txtID=none",
			data: '',
			timeout: 30000,
			error: function() {
				$("#txtData").empty();
				$("#txtData").append("ALL UR BASE ARE BELONG TO US!");
			},
			success: function(html){
				$("#txtData").show("slow");
				$("#txtData").append(html);
				$("#txtData").scrambledWriter();
				return false;
		  }
		  });

		



});     

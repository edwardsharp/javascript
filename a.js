	//included on walke.web.animate- an esnet_ project
	//created by edward sharp
	//web: edwardsharp.net
	//buttons
	function goLite(FRM,BTN)
	{
   		window.document.forms[FRM].elements[BTN].style.backgroundColor = "#555555";
   		window.document.forms[FRM].elements[BTN].style.borderColor = "#999999";
	}

	function goDim(FRM,BTN)
	{
   	window.document.forms[FRM].elements[BTN].style.backgroundColor = "#333333";
   	window.document.forms[FRM].elements[BTN].style.borderColor = "#EEEEEE";
	}
	//close prompt
	function closePrompt()
	{
	 var where= confirm("confirm.close");
	 if (where== true)
	 {
	   window.close();
	 }
	 else
	 {}
	}

	//image reel
	var timer;
	//page load set index 
	var index = 1;
	var reelindex = 1;
	function starttimer() {
	        timer = setInterval(nextImage, 500);
	}
	function nextImage() {
			//buffer zone? before any images shown
       		if(index>-10 && index<1) {
			document.getElementById("imggpre").src = "seqImg/seq" + index.toString().padLeft("0", 4) + 11 + ".jpg";
			window.alert(index);
			index++;
			}
			//stop after 9626 frames
			else if (index<9627) {
				//show frame number
				document.getElementById("out").value = index;
				index++;
				//dom replace of src
				document.getElementById("imgg").src = "seqImg/seq" + index.toString().padLeft("0", 4) + ".jpg";
				document.getElementById("imgg").title = index;
				//if index is divisible by 10 the load 10 more images.
				if (index % 10 == 0) {
					document.getElementById("imggpre").src = "seqImg/seq" + index.toString().padLeft("0", 4) + 1 + ".jpg";
					document.getElementById("imggpre").src = "seqImg/seq" + index.toString().padLeft("0", 4) + 2 + ".jpg";
					document.getElementById("imggpre").src = "seqImg/seq" + index.toString().padLeft("0", 4) + 3 + ".jpg";
					document.getElementById("imggpre").src = "seqImg/seq" + index.toString().padLeft("0", 4) + 4 + ".jpg";
					document.getElementById("imggpre").src = "seqImg/seq" + index.toString().padLeft("0", 4) + 5 + ".jpg";
					document.getElementById("imggpre").src = "seqImg/seq" + index.toString().padLeft("0", 4) + 6 + ".jpg";
					document.getElementById("imggpre").src = "seqImg/seq" + index.toString().padLeft("0", 4) + 7 + ".jpg";
					document.getElementById("imggpre").src = "seqImg/seq" + index.toString().padLeft("0", 4) + 8 + ".jpg";
					document.getElementById("imggpre").src = "seqImg/seq" + index.toString().padLeft("0", 4) + 9 + ".jpg";
					document.getElementById("imggpre").src = "seqImg/seq" + index.toString().padLeft("0", 4) + 10 + ".jpg";
				}
				//reel if, else if, else code
				else if (index>174 && index<1086){
					document.getElementById("imggreel").src = "reelImg/seq" + reelindex.toString().padLeft("0", 4) + ".gif";
					document.getElementById("imggreel").title = reelindex;
					reelindex++;
				}
				else if (index>1987 && index<3168) {
					document.getElementById("imggreel").src = "reelImg/seq" + reelindex.toString().padLeft("0", 4) + ".gif";
					document.getElementById("imggreel").title = reelindex;
					reelindex++;
				}
				else if (index>4030 && index<5774) {
					document.getElementById("imggreel").src = "reelImg/seq" + reelindex.toString().padLeft("0", 4) + ".gif";
					document.getElementById("imggreel").title = reelindex;
					reelindex++;
				}
				else if (index>7711 && index<9008) {
					document.getElementById("imggreel").src = "reelImg/seq" + reelindex.toString().padLeft("0", 4) + ".gif";
					document.getElementById("imggreel").title = reelindex;
					reelindex++;
				}
				else{
					document.getElementById("imggreel").src = "transparent.gif";
					document.getElementById("imggreel").title = "transparent";
				}

				/*
				switch(index) {
				case 174:
				document.getElementById("imggreel").src = "reelImg/seq" + reelindex.toString().padLeft("0", 4) + ".gif";
				document.getElementById("imggreel").title = reelindex;
				reelindex++;
				window.alert("case 174 move left");
				break;
				case 1086:
				window.alert("case 1086 move right");
				break;
				case 1987:
				window.alert("case 1987 move left");
				break;
				case 3168:
				window.alert("case 3168 move right");
				break;
				case 4030:
				window.alert("case 4030 move left");
				break;
				case 5774:
				window.alert("case 5774 move right");
				break;
				case 7711:
				window.alert("case 7711 move left");
				break;
				case 9008:
				window.alert("case 9008 move right final");
				}*/
			}
			else {clearInterval(timer);}			
	}
	//end image reel
	//tv magic
	var tvindex=0;
	function nextTv() {
			switch(index) {
			case 0:
			document.getElementById("imggtv").src = "tvImg/" + index + ".jpg";
			var tvindex=1;
			break;
			case 1:
			document.getElementById("imggtv").src = "tvImg/" + index + ".jpg";
			var tvindex=2;
			break;
			case 2:
			document.getElementById("imggtv").src = "tvImg/" + index + ".jpg";
			var tvindex=3;
			break;
			case 3:
			document.getElementById("imggtv").src = "tvImg/" + index + ".jpg";
			var tvindex=0;
			break;
	}}
	//code to make image names work
	String.prototype.padLeft = function(char, count) {
        	var val = new String(this);
       		char = char.toString().substr(0, 1);
        	while (val.length < count) {
               		val = char + val;
        	}
        	return val;
	}

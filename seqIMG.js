/*
 * seqIMG.js an alternative video player.
 * sequence several images to get a video-like effect
 * use it in places where you can show images but little video support exists
 * ex. iPhone OS, 
 *
 * included on walke.web.animate- an esnet_ project
 * created by: edward sharp
 * web: edwardsharp.net
*/


$(document).ready(function(){
$("#slider").slider({
			value:100,
			min: 0,
			max: 500,
			step: 50,
			slide: function(event, ui) {
				$("#amount").val('$' + ui.value);
			}
		});
		$("#amount").val('$' + $("#slider").slider("value"));

});


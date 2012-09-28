$(document).ready(function() { 
  var z=0;
  len=txtArr0.length;
  $("#botMode").click(function() {
    //botMode = !botMode;
    alert('bot! '+len);
    send("BOT!!"+txtArr1.length);
    var i=0;
    $(this).everyTime("1s", function() {
      
      if (i>3 && i<len){
        //send("BTT"+i)
        showTxtArr0(i);
      }
      //sendMessage
      //
      /*switch(i)
      {
      case 1:
        send("BOT"+i);
        break;
      case 2:
        send("BOT"+i);
        
        break;
      case 3:
        
        break;
      case 330:
        send("START TXT 1"+i);
        //for(var z=0, len=txtArr0.length; z < len; z+2){
          
        //  $(this).oneTime(txtArr0[z]+"s", function() {
        //    send(txtArr0[z+1]);
        //  });
        //}
        break;
      case 484:
        send("STOP TXT 1"+i);
      case 1140:
        send("START TXT 2"+i);
        break;
      case 1200:
        send("STOP TXT 2"+i);
      case 1470:
        send("START TXT 3"+i);
        break;
      case 1825:
        send("STOP EVERYTHING!"+i);
        break;
      default:
        send("BOT"+i);
      }*/
      //for(var i=0, len=txtArr0.length; i < len; i++){}
      i++;
    });
  });
  $("#stopBot").click(function() {
    $("#botMode").remove();
  });
  
  function showTxtArr0(i) {
    //send(txtArr0[z]);
    $("#botMode").oneTime(txtArr0[z]+"s", function() {
      send(txtArr0[z+1]);
    });
    z=z+2;

  }
});     
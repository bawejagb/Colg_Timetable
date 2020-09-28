Notification.requestPermission().then(function(result) {
  });
  
  var data =[[[8,50,"OS LAB","https://tiet.zoom.us/my/CSED6/"], [11,20,"DS Lecture","https://tiet.zoom.us/my/CSED15/"]],
            [[9,40,"OS Lecture","https://tiet.zoom.us/my/CSED6/"],[10,30,"DMS Lecture","https://tiet.zoom.us/my/csed4/"],[11,20,"NA Lecture","https://tiet.zoom.us/my/tietsom6/"],[14,40,"DS LAB","https://tiet.zoom.us/my/csed5/"]],
            [[9,40,"CAO Lecture","https://tiet.zoom.us/my/csed11/"],[10,30,"NA Lecture","https://tiet.zoom.us/my/tietsom5/"],[11,20,"DS Lecture","https://tiet.zoom.us/my/CSED12/"],[16,20,"OS Lecture","https://tiet.zoom.us/my/CSED3/"]],
            [[8,0,"DMS Lecture","https://tiet.zoom.us/my/csed2/"],[8,50,"PC Lecture","https://tiet.zoom.us/my/CSED16/"],[9,40,"CAO Lecture","https://tiet.zoom.us/my/csed10/"],[10,30,"NA Lecture","https://tiet.zoom.us/my/tietsom6/"],[14,40,"NA LAB","https://tiet.zoom.us/my/tietsom6/"],[16,20,"DMS LAB","https://tiet.zoom.us/my/csed4/"]],
            [[8,0,"DS Lecture","https://tiet.zoom.us/my/CSED2/"],[8,50,"DMS Lecture","https://tiet.zoom.us/my/csed1/"],[9,40,"OS Lecture","https://tiet.zoom.us/my/CSED2/"],[12,10,"PC LAB","https://tiet.zoom.us/my/csed18/"],[13,50,"CAO Lecture","https://tiet.zoom.us/my/csed4/"]]]; 
  var flag = 0, d, m, day, h = 7;
  var check = function(){
    if(h < 18){
      d = new Date();
      h = d.getHours();
      m = d.getMinutes();
      day = d.getDay();
      checkAlert(h, m, day);
      setTimeout(check, 5000);
    }
    else {
        setTimeout(check, 5000); // check again in a 2 second
    }
}
function NotfFunction(msg)
{
  var nof = new Notification(msg[2], {
    body : "AT: "+msg[0]+':'+msg[1]+"\nClick here: "+msg[3],
    icon : "assets/images/icon.ico"
  });
  nof.onclick = function(event) {
    event.preventDefault(); // prevent the browser from focusing the Notification's tab
    window.open(msg[3], '_blank');
  }
}
check();
 function checkAlert(h, m, day) {
  
   if ( day > 0 && day <= 5)
   {
      var data1 = data[day-1];
      for(var i = 0; i < data1.length; i++)
      {
        if(h == data1[i][0] && m >= data1[i][1] - 5 && m <= data1[i][1] + 5 && flag == 0)
        {
          console.log(data1[i][2] + " Start!");
          console.log(Notification.permission);
          if (Notification.permission === 'granted')
          {
            NotfFunction(data1[i]);
          }
          flag = 1;
        }
        else if (h == data1[i][0] && m > data1[i][1] + 6 && flag == 1)
        {
          flag = 0;
          console.log(data1[i][2] + " Over!");
        }
      }
    }
  
  }
Notification.requestPermission().then(function(result) {
  });
  
  var data =[[ [11,20,"DS Lecture","https://tiet.zoom.us/my/CSED15/"]],
            [[9,40,"OS Lecture","https://tiet.zoom.us/my/CSED6/"],[10,30,"DMS Lecture","https://tiet.zoom.us/my/csed4/"],[11,20,"NA Lecture","https://tiet.zoom.us/my/tietsom6/"]],
            [[9,40,"CAO Lecture","https://tiet.zoom.us/my/csed11/"],[10,30,"NA Lecture","https://tiet.zoom.us/my/tietsom5/"],[11,20,"DS Lecture","https://tiet.zoom.us/my/CSED12/"],[16,20,"OS Lecture","https://tiet.zoom.us/my/CSED3/"]],
            [[8,0,"DMS Lecture","https://tiet.zoom.us/my/csed2/"],[8,50,"PC Lecture","https://tiet.zoom.us/my/CSED16/"],[9,40,"CAO Lecture","https://tiet.zoom.us/my/csed10/"],[10,30,"NA Lecture","https://tiet.zoom.us/my/tietsom6/"]],
            [[8,0,"DS Lecture","https://tiet.zoom.us/my/CSED2/"],[8,50,"DMS Lecture","https://tiet.zoom.us/my/csed1/"],[9,40,"OS Lecture","https://tiet.zoom.us/my/CSED2/"],[13,50,"CAO Lecture","https://tiet.zoom.us/my/csed4/"]]]; 
  var flag = 0, d, m, day, h = 7;
  var check = function(){
    if(h < 20){
      d = new Date();
      h = d.getHours();
      m = d.getMinutes();
      day = d.getDay();
      checkAlert(h, m, day);
      setTimeout(check, 5000);
    }
    else {
        setTimeout(check, 5000);
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
      var hh1, mm1, hh2, mm2, cd;
      for(var i = 0; i < data1.length; i++)
      {
        if ( data1[i][1] == 0)
          {
            mm1 = 55;
            mm2 = 5;
            hh1 = data1[i][0] -1;
            hh2 = data1[i][0];
            cd = (h == hh1 && m >= mm1 ) || (h == hh2 &&  m <= mm2);
          }
        else
          {
            mm1 = data1[i][1]-5;
            mm2 = data1[i][1]+5;
            hh1 = data1[i][0];
            hh2 = data1[i][0];
            cd = (h == hh1 && m >= mm1 ) && (h == hh2 &&  m <= mm2);
          }
        if(flag == 0 && cd)
        {
          console.log(Notification.permission);
          if (Notification.permission === 'granted')
          {
            console.log(data1[i][2] + " Start!");
            NotfFunction(data1[i]);
            flag = 1;
          }
        }
        else if (h == data1[i][0] && m > data1[i][1] + 6 && flag == 1)
        {
          flag = 0;
          console.log(data1[i][2] + " Over!");
        }
      }
    }
  
  }
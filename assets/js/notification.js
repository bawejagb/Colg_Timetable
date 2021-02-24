Notification.requestPermission().then(function(result) {
  });
  var base = "https://tiet.zoom.us/my/"
  var data =[[[11,20,"Software Engineering LAB","CSED13/"], [13,50,"Database Management System LEC","CSED13/"], [14,40,"Artificial Intelligence LEC","CSED3/"], [15,30,"Artificial Intelligence LAB","CSED13/"]],
            [[11,20,"Computer Networks LAB","CSED15/"], [13,50,"Optimization Techniques LEC","tietsom1/"], [14,40,"Computer Networks LEC","CSED14/"], [15,30,"Software Engineering LEC","CSED5/"], [16,20,"Design & Algorithms LEC","CSED9/"]],
            [[13,00,"Artificial Intelligence LEC","CSED3/"], [13,50,"Optimization Techniques LEC","tietsom1/"], [14,40,"Design & Algorithms LEC","CSED16/"], [15,30,"Software Engineering LEC","CSED5/"]],
            [[08,50,"Computer Networks LEC","CSED13/"], [09,40,"Design & Algorithms LEC","CSED14/"], [10,30,"Optimization Techniques LEC","tietsom2/"], [11,20,"Optimization Techniques LAB","tietsom2/"], [13,50,"Database Management System LEC","CSED13/"], [14,40,"Artificial Intelligence LEC","CSED16/"], [15,30,"Software Engineering LEC","CSED12/"]],
            [[08,00,"Design & Algorithms LAB","CSED16/"],[09,40,"Database Management System LEC","CSED5/"],[12,10,"Database Management System LAB","CSED6/"]]]; 
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
        setTimeout(check, 5000); // check again in a 5 second
    }
}
function NotfFunction(msg)
{
  var nof = new Notification(msg[2], {
    body : "AT: "+msg[0]+':'+msg[1]+"\nClick here: "+base+msg[3],
    icon : "assets/images/icon.ico"
  });
  nof.onclick = function(event) {
    event.preventDefault(); // prevent the browser from focusing the Notification's tab
    window.open(base+msg[3], '_blank');
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
            flag = 1;
          }
          
        }
        else if (h == data1[i][0] && m >= data1[i][1] + 6 && m <= data1[i][1] + 8 && flag == 1)
        {
          flag = 0;
          console.log(data1[i][2] + " Over!");
        }
      }
    }
  
  }

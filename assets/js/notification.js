var data_bs = [],filter_data= [];
data_bs = [{"Time":"8:00 - 8:50","1":"-","2":"-","3":"ELECTIVE/UCS746-PG LAB","4":"-","5":"-"},
{"Time":"8:50 - 9:40","1":"HUMANITIES FOR ENGINEERS - UHU005 L - LT401","2":"HUMANITIES FOR ENGINEERS - UHU005 - T203 LAB","3":"","4":"-","5":"-"},
{"Time":"9:40 - 10:30","1":"COGNITIVE COMPUTING - UCS712 L - LT401","2":"","3":"-","4":"-","5":"-"},
{"Time":"10:30 - 11:20","1":"COMPILER CONSTRUCTION - UCS802 - LT401","2":"-","3":"-","4":"-","5":"-"},
{"Time":"11:20 - 12:10","1":"COMPILER CONSTRUCTION - UCS802 P - CG-2	LAB","2":"COMPILER CONSTRUCTION - UCS802 - LT401","3":"-","4":"-","5":"-"},
{"Time":"12:10 - 1:00","1":"","2":"COGNITIVE COMPUTING - UCS712 L - LT401","3":"Elective/UCS746-LT101","4":"-","5":"-"},
{"Time":"1:00 - 1:50","1":"-","2":"-","3":"UCS-EL7-9 L - LP108","4":"-","5":"ELECTIVE LAB"},
{"Time":"1:50 - 2:40","1":"-","2":"-","3":"-","4":"COMPILER CONSTRUCTION - UCS802 - LT401","5":""},
{"Time":"2:40 - 3:30","1":"-","2":"-","3":"-","4":"HUMANITIES FOR ENGINEERS - UHU005 L - LT401","5":"-"},
{"Time":"3:30 - 4:20","1":"UCS757P - IS2 LAB","2":"-","3":"-","4":"-","5":"-"},
{"Time":"4:20 - 5:10","1":"","2":"-","3":"-","4":"-","5":"ELECTIVE LAB"},
{"Time":"5:10 - 6:00","1":"-","2":"-","3":"-","4":"-"," 5":""}]


var base = "https://tiet.zoom.us/"
drawRow(data_bs);
check();
function drawRow(data) {
  for(var i = 0; i < data.length; i++){
    var lst = data[i];
    var row = $("<tr />")
    $("#my-table").append(row); 
    row.append($("<th id='colr' scope='row'>" + lst["Time"] + "</th>"));
    for(var j = 1; j <= 5; j++){
      var dat = lst[j];
      if(dat == "-")
        row.append($("<td id='colr' scope='row'>" + "-" + "</td>")); 
      else if(dat.length > 2){
        var dk = dat.split(",");
        if(dk[0].search("LAB") == -1 && dk[0].search("TUT") == -1){
        row.append($("<td id='colr1' class='table-warning'>" + "<a href="+base+dk[1]+ 
        " target='_blank'><b>"+dk[0]+"</b></a></td>")); }
        else if(dk[0].search("LAB") == -1 ){
          row.append($("<td id='colr1' class='table-success' rowspan='1'style='vertical-align:middle'>" +
           "<a href="+base+dk[1]+" target='_blank'><b>"+dk[0]+"</b></a></td>"));}
        else{
        row.append($("<td id='colr1' class='table-success' rowspan='2'style='vertical-align:middle'>" +
         "<a href="+base+dk[1]+" target='_blank'><b>"+dk[0]+"</b></a></td>"));}
      }
    }
  }
}
Notification.requestPermission().then(function(result) {});  
function fitdata(day){
  for(var i = 0; i < data_bs.length; i++){
    filter_data[i] = data_bs[i][day];
  }
}
var flag = 0, d, m, day, h = 7;
function check(){
  if(h < 18){
    d = new Date();
    h = d.getHours();
    m = d.getMinutes();
    day = d.getDay();
    fitdata(day);
    //console.log(filter_data);
    checkAlert(h, m, day);
    setTimeout(check, 5000);
  }
  else {
      setTimeout(check, 5000); // check again in a 5 second
  }
}
function NotfFunction(ref,msg)
{
  var nof = new Notification(msg[0], {
    body : "AT: "+data_bs[ref]["Time"].split("-")[0]+"\nClick here: "+base+msg[1],
    icon : "assets/images/icon.ico"
  });
  nof.onclick = function(event) {
    event.preventDefault(); // prevent the browser from focusing the Notification's tab
    window.open(base+msg[1], '_blank');
  }
}
function checkAlert(h, m, day) {
  if ( day > 0 && day <= 5)
  {
    var real_time = h*60 + m;
    for(var i = 0; i < filter_data.length; i++)
    {
      if(filter_data[i].length > 3){
        var time_val = (8*60)+i*50;
        if(real_time >= time_val - 5 && real_time <= time_val + 5 && flag == 0)
        {
          console.log(filter_data[i].split(",")[0] + " Start!");
          console.log(Notification.permission);
          if (Notification.permission === 'granted')
          {
            NotfFunction(i,filter_data[i].split(","));
            flag = 1;
          }
        }
        else if (real_time >= time_val + 6 && real_time <= time_val + 8 && flag == 1)
        {
          flag = 0;
          console.log(filter_data[i].split(",")[0] + " Over!");
        }
      }
    }
  }
}

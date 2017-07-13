window.onload = function () {
	init();
};

function init(){
	var hour = 15;
	var minute = 39;
	var alarmtime = new Date();
	alarmtime.setHours(hour, minute, 0);
	var alarm1 = new tizen.AlarmAbsolute(alarmtime);
	//alert("Часы в alarmtime: " + alarmtime.getHours);
	
	var app = tizen.application.getCurrentApplication();
	alert("Current application's app id is " + app.appInfo.id);
	var appID = tizen.application.getCurrentApplication().appInfo().id;
	var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view", "index.html");			//поставить нормальный файл
	alert("AppID: " + appID);
	tizen.alarm.add(alarm1, appID, appControl);
	
	
	
	
	
}

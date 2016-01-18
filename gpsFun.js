var gps = require("gpslibgt06n");

var options = {
    'debug'                 : true,
    'port'                  : 8080,
    'device_adapter'        : "GT06"
}

var server = gps.server(options,function(device,connection){
	connection.on("data",function(res){
        console.log(res+ "from server");
    });
    connection.on("end",function (data) {
        console.log("device left" + connection.device.uid+ "from server");
    })
    device.on("login_request",function (uid,data) {
    	console.log(uid,data + "from server");
        device.login_authorized(true,data);
    });
    device.on("ping",function (data) {
        console.log("data from:"+ connection.device.uid+ "from server");
        console.log(data + "from server");
    });
    device.on("alarm",function (data,alarmData,fullData) {
        console.log(data + "from server");
        console.log(alarmData + "from server");
        console.log(fullData + "from server");
    });
    device.on("status",function (data,fullData) {
        console.log("data from:"+ connection.device.uid+ "from server");
        console.log(data + "from server");
        console.log(fullData+ "from server");
    });


});
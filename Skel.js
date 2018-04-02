var SensorTag = require('sensortag');
                    // sensortag library
var Async = require('async');
var exec = require('child_process').exec;
//var R = require('r-script');
var Protocol = require('azure-iot-device-amqp').Amqp;
                     //Azure
var Client = require('azure-iot-device').Client;
                                 //Azure
var ConnectionString = require('azure-iot-device').ConnectionString;
            //Azure
var Message = require('azure-iot-device').Message;
                       //Azure

var connectionString
="HostName=WSN-Group4-Project.azure-devices.net;DeviceId=RaspberryPi;SharedAccessKey=nSwlECrsmQKDCb/wsHZtFVSC8bCA0QF+VZMdHoYqpVI=";
                 //Azure
var deviceId = ConnectionString.parse(connectionString).DeviceId;
            //Azure

var client = Client.fromConnectionString(connectionString, Protocol);
            //Azure

var fs = require("fs");
fs.writeFile("SensorData.csv",'"CurrentTime","lux"\n');

client.open(function (error, result) {
                                          //Azure
    if (error)
                                                            //Azure
    {

//Azure
        console.log("Connectivity error: %s...", error);                                                       //Azure
        return;                                                                                                                //Azure
   }
                                                               //Azure

    SensorTag.discoverAll(function (sensorTag) {
                             //SensorTag sensor Discovery
        console.log("Connecting to %s...", sensorTag.id);

        sensorTag.on('disconnect', function() {
            console.log("Disconnected from %s!", sensorTag.id);
            process.exit(0);
        });

        sensorTag.connectAndSetUp(function (error) {
            console.log("Connected to %s...", sensorTag.id);

            Async.series([
                function (callback)
                {
                    console.log("Starting light intensity sensor for %s...", sensorTag.id);
                    sensorTag.enableLuxometer(callback);
                }
            ], function () {
                setInterval(function () {
                    var readings = { sensorId: sensorTag.id };
                    Async.series([
                        function (callback)                   //Sensor Reading light intensity. You must extend to include humidity, temperature from humidity, object temperature,
                        {                                      // temperature from IR and pressure
                            sensorTag.readLuxometer(function (error, lux){
                                readings.lux = lux;

                                callback();
                            });
                        }
                    ], function()
                    {
                        readings.currentTime = new Date();

fs.appendFile("SensorData.csv",readings.currentTime+","+readings.lux+"\n");
                        console.log("Data recorded on %s...", readings.currentTime);
                                                      //Azure
                    });
                }, 397);                        //Sensing Time Interval in milliseconds
   setInterval(function(){
var child = exec('sudo Rscript TestScript.R');   //Calling the R Script

fs.readFile('/home/pi/Desktop/SensorTag_Data/excFile.txt','utf8',function(err,data){
if(err) throw err;
var sln = data.length;
var slice = data.slice(47,sln-1);

var nread = { sensorId: sensorTag.id };
nread.currentTime = new Date();
nread.lux = slice;

var nmessage = new Message(JSON.stringify(nread));

client.sendEvent(nmessage, function (error) {
   //Azure
                            if (error)
                                                       //Azure
                            {
                                                           //Azure
                                console.log(error.toString());
                                         //Azure
                            }
                                                            //Azure
                            else
                                                         //Azure
                            {
                                                            //Azure
                                console.log("Data sent on %s...", nread.currentTime);   //Azure
                            }
                                                            //Azure
                        });

fs.writeFile("SensorData.csv",'"CurrentTime","lux"\n');

});
},2973);                              //Processing Time Interval in milliseconds
            });
        });
    });
});
                                                           //Azure
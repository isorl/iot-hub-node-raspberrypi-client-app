var clientFromConnectionString = require('azure-iot-device-amqp').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

var connectionString = 'HostName=RaspberryIoTHubTest.azure-devices.net;DeviceId=RaspIoTTest;SharedAccessKey=T8bb3CaP/t9hZfNCi60jM7keULp7yByCofo3MX0RfLE=';

var client = clientFromConnectionString(connectionString);
var connectCallback = function (err) {
  if (err) {
    console.error('Could not connect: ' + err);
 } else {
    console.log('Client connected');
    var message = new Message('some data from my device');
    client.sendEvent(message, function (err) {
      if (err) console.log(err.toString());
    });

    client.on('message', function (msg) { 
      console.log(msg); 
      client.complete(msg, function () {
        console.log('completed');
      });
    }); 
  }
};

client.open(connectCallback);


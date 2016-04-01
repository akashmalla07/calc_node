// simplesockclient to go with simplesockserver.js

var sock = require('net').Socket();

sock.on('data', function(data) {
    console.log('Response: ' + data);
    sock.destroy(); 
});
sock.on('close', function() {
    console.log('Connection closed');});

sock.connect(3000);

var var1 = process.argv[3];
if (var1 == "q") {
    sock.write(process.argv[2] + " " + process.argv[3]);
} else {
    sock.write(process.argv[2] + " " + process.argv[3] + " " + process.argv[4]);
}

sock.end();
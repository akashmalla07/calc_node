// simple socket server

var net = require('net');
net.createServer(function (sock) {
    console.log("Incoming connection accepted");

    sock.on('data', function (d) {
        console.log("Received from client : " + d);
        var query = new String(d);
        var pair = query.split(" ");
        var cltid = pair[0];
        var opr = pair[1];
        var num = parseInt(pair[2]);

       // console.log("Received from client id : " + pair[0]);
       // console.log("Received from client opr : " + pair[1]);
       // console.log("Received from client num : " + pair[2]);
       // console.log("value is" + map.get(cltid));

        if(map.get(cltid) == undefined)
        {
            console.log("First time");
            map.set(cltid,0);
        }

        if(opr == "q"){
            map.forEach(function(value, key) {
               // console.log(key + " : " + value);
                sock.write(key + " : " + value + " ");
            });

            process.exit();
        }else {
            result = map.get(cltid);
            console.log("resul1:" + result);
            var value =  getResult(opr,num,result);
            map.set(cltid,value);
            console.log("value2 is " + map.get(cltid));
        }

        sock.write(value.toString(), function() {
            console.log("Finished response to client");
        })
        console.log("Result is " + value);



    }).on('error', function (e) {
        console.log("Some kind of server error");
    });

}).listen(3000);
var result = 0;
var HashMap = require('hashmap');
var map = new HashMap;

function getResult(operation, number1, result)
{
    if(operation == "a")
        result = result + number1;
    else if(operation == "m")
        result = result - number1;
    else if(operation == "s")
        result = number1;

    return result;
}
var exec = require('child_process').exec;
function execute(command, callback) {
    exec(command, function (error, stdout, stderr) { callback(stdout); });
};

var port = 3000;

execute('netstat -a -o -n', function (res) {
    var t = res.split('\r\n');
    for (var i = 0; i < t.length; i++) {
        var t2 = t[i].replace(/ +(?= )/g, '');
        t2 = t2.split(" ")
        var t3 = t2[2];
        if (t3 != undefined) {
            var t4 = t3.split(":");
            t4 = t4[t4.length - 1];
            if (t4 == port) {
                var idProcess = t2[t2.length-1];
                i = t.length;
                execute('taskkill /F /PID '+idProcess,function(res){
                    
                });
            }

        }

    }
})
var http = require('http');
var crypto = require('crypto');//引入加密模块


var text = "phoneNumber=15210943874&key=99999999";
var hasher=crypto.createHash("md5");//md5加密
hasher.update(text);
var md5key=hasher.digest('hex');//hashmsg为加密之后的数据
console.log("the md5 is:",md5key);

var user = {
    PhoneNumber: '15210943874',
    authKey: md5key
};


//var userJson=JSON.stringify(user);
//var userString='data='+userjson;//这种格式在服务器端解析的时候可解析为req.body.data
var userString = JSON.stringify(user);//转换为json字符格式,在服务器端直接解析req.body
var headers = {
    'Content-Type': 'application/json',
    //如果使用的是varuserString='data='+userjson格式应将'Content-Type':设为'application/x-www-form-urlencoded'//form表单格式
    'Content-Length': userString.length
};

var options = {
    host: 'localhost',//主机：切记不可在前面加上HTTP://
    port: 3000,//端口号
    path: '/image',//路径
    method: 'POST',//提交方式
    headers: headers
};


var req = http.request(options, function (res) {
//    console.log('STATUS: ' + res.statusCode);
//    console.log('HEADERS: ' + JSON.stringify(res.headers));
    //  res.setEncoding('utf8');
    res.on('data', function (message) {
        var ret= eval('(' + message + ')');
        console.log('response : ' ,ret);
    });

});
req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(userString);//向req.body里写入数据
req.end();

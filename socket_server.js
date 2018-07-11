var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3002, () => {
  console.log("Socket Server is listening at 3002! ✅")
});

function handler(req, res) {
  fs.readFile(__dirname + '/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      res.writeHead(200);
      res.end(data);
    });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}




io.on('connection', function (socket) {
  // test
  socket.emit('news', { hello: 'world' }); // 发送消息
  socket.on('login', function (data) { // 接收消息
    console.log('Login', data);
  });

  // header
  socket.emit('Nowdate', '2018-08-08');
  socket.emit('UvData',
    `[1, 1]`
    // `[` + getRandomInt(10000) + `, 1]`
  );
  socket.emit('BvData',
    `[2, 2, 3]`
    // `[` + getRandomInt(10000) + `, 2, 3]`
  );
  socket.emit('CompRateData',
    `[3, 3]`
    // `[` + getRandomInt(10000) + `, 3]`
  );
  socket.emit('ResolutionRateData',
    `[4, 4]`
    // `[` + getRandomInt(10000) + `, 4]`
  );
  socket.emit('SatisfactionRateData',
    // `[5, 5]`
    `[` + getRandomInt(10000) + `, 5]`
  );

  // center
  socket.emit('DBvData',
    [
      { name: "微信", data: ["76", "33", "16", "5", "6", "13", "24", "65", "246", "431", "483", "533", "415", "393", "449", "367", 0, 0, 0, 0, 0, 0, 0, 0] },
      { name: "微信", data: ["76", "33", "16", "5", "6", "13", "24", "65", "246", "431", "483", "533", "415", "393", "449", "367", 0, 0, 0, 0, 0, 0, 0, 0] },
      { name: "web", data: ["76", "33", "16", "5", "6", "13", "24", "65", "246", "431", "483", "533", "415", "393", "449", "367", 0, 0, 0, 0, 0, 0, 0, 0] },
      { name: "管家", data: ["76", "33", "16", "5", "6", "13", "24", "65", "246", "431", "483", "533", "415", "393", "449", "367", 0, 0, 0, 0, 0, 0, 0, 0] }
    ]
  );

  socket.emit('Keywords',
    [{ name: "系统", value: 130 },
    { name: "显示", value: 121 },
    { name: "安装", value: 109 },
    { name: "开机", value: 109 },
    { name: "启动", value: 106 },
    { name: "驱动", value: 100 }]);

  socket.emit('TopQuestion', {
    FAQ_NAME: ["开机无显示", "如何启动一键恢复", "电脑运行慢", "联想服务热线电话", "如何报修电脑", "Windows无法启动", "查询电脑保修", "如何下载驱动", "查询电脑配置", "服务站地址、电话和工作时间"],
    cont: [98, 121, 124, 127, 128, 151, 201, 215, 233, 307]
  });

  socket.emit('UserVoc',
    ["真好，把我的难题给解决了非常感谢！",
      "很好，很方便",
      "挺好的，我的问题得到解答",
      "挺方便的",
      "提供的解决方案都帮我解决了",
      "乐乐，好样的",
      "好像管用，若再发生，还来咨询",
      "维修的很快速，好评",
      "还可以，",
      "完美解决，十分感谢！",
      "挺好的，大部分问题都能解决",
      "有礼貌，比联想攻城狮强"
    ]);

  socket.emit('RealtimeCase', [{
    SESSION_ID: "3f9c71c319a74abaa42b8a55822fdead",
    IP_ADDRESS: "116.114.230.182",
    ADDRESS: {
      city: "巴彦淖尔",
      country: "中国",
      region: "内蒙古",
    },
    QA: [{
      QUESTION: "如何切换输入法",
      ANSWER: `您可以[term value=shurufaqiehuan]点击这里[/term]查看“Window…="如何添加、删除Windows自带输入法"]如何添加、删除Windows自带输入法[/link]`
    }, {
      QUESTION: "diannaodabuchuzhongwen",
      ANSWER: `对不起，我没有理解您的意思，麻烦您换个问法试试。<span style="color: blue"><…TextEx('查看提问技巧');return false;"> 查看提问技巧</a></span> `
    }, {
      QUESTION: "电脑运行慢",
      ANSWER: `1.系统启动项过多会导致系统变慢，您可以[term value=ulbutleroppc]使用管家的…机慢[/link]<br/>3.[link submit="电脑上网慢"]电脑上网慢[/link]`
    }]
  }, {
    SESSION_ID: "3f9c71c319a74abaa42b8a55822fdead",
    IP_ADDRESS: "116.114.230.182",
    ADDRESS: {
      city: "巴彦淖尔",
      country: "中国",
      region: "内蒙古",
    },
    QA: [{
      QUESTION: "如何切换输入法",
      ANSWER: `您可以[term value=shurufaqiehuan]点击这里[/term]查看“Window…="如何添加、删除Windows自带输入法"]如何添加、删除Windows自带输入法[/link]`
    }, {
      QUESTION: "diannaodabuchuzhongwen",
      ANSWER: `对不起，我没有理解您的意思，麻烦您换个问法试试。<span style="color: blue"><…TextEx('查看提问技巧');return false;"> 查看提问技巧</a></span> `
    }, {
      QUESTION: "电脑运行慢",
      ANSWER: `1.系统启动项过多会导致系统变慢，您可以[term value=ulbutleroppc]使用管家的…机慢[/link]<br/>3.[link submit="电脑上网慢"]电脑上网慢[/link]`
    }]
  }]);


});
var http = require('http')
var io = require('socket.io');
var fs = require('fs');
var ecstatic = require('ecstatic');

var app = http.createServer(
  ecstatic({ root: __dirname + '/public'})
);

var io = io.listen(app);

app.listen(3000);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

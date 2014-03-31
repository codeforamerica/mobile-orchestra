var http = require('http')
var io = require('socket.io');
var fs = require('fs');
var ecstatic = require('ecstatic');

var public_path = __dirname + '/../public';

var app = http.createServer(
  ecstatic({ root: public_path })
);

var io = io.listen(app)

io.set('log level', 1)

app.listen(3000);

var phones = []

io.of('/speaker')
  .on('connection', function (socket) {

    console.log('speaker connected')

    socket.on('disconnect', function () {
      console.log('speaker disconnected')
    })

  })

io.of('/phone')
  .on('connection', function (socket) {
    console.log('phone connect.');

    socket.on('disconnect', function() {
      console.log('phone disconnect.');
    });

  });


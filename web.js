var http = require('http')
var io = require('socket.io');
var fs = require('fs');
var ecstatic = require('ecstatic');

var public_path = __dirname + '/public';

var app = http.createServer(
  ecstatic({ root: public_path })
);

var io = io.listen(app)

io.set('log level', 1)

var port = process.env.PORT || 3000;

app.listen(port);

var phones = []

var speaker = io.of('/speaker-socket')
  .on('connection', function (socket) {

    console.log('speaker connected')

    socket.on('disconnect', function () {

      console.log('speaker disconnected')
    })

  })

var phone = io.of('/phone')
  .on('connection', function (socket) {
    console.log('phone connected', socket.id)
    phones.push(socket)

    speaker.emit('phoneAdd', socket.id)


    socket.on('disconnect', function () {
      console.log('phone disconnected')

      speaker.emit('phoneDel', socket.id)

      // remove the socket fromm the phones arr
      phones.splice(phones.indexOf(socket), 1)
    })
  })

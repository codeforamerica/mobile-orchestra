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

var phones = 0;

var speaker = io.of('/speaker-socket')
  .on('connection', function (socket) {

    console.log('speaker connected')

    socket.on('disconnect', function () {

      console.log('speaker disconnected')
    })

  })

var phone = io.of('/phone')
  .on('connection', function (socket) {
    phones++;

    console.log('Phone Connected; Active Phones: ' + phones);

    speaker.emit('phoneAdd', socket.id)


    socket.on('disconnect', function () {
      phones--;

      console.log('Phone Disconnected; Active Phones: ' + phones);

      speaker.emit('phoneDel', socket.id)
    })
  })

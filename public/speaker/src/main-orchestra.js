
var number_of_attendees = 0;

var sequences = [
  { name: 'bass', sequence: 'p - - - - - - - p - - - - - - p' },
  { name: 'snare', sequence: '- - x - - - x - - - x - - - x -'},
  { name: 'hihat', sequence: 'm m m - m m m - m m m - m m m -'},
  { name: 'fun', sequence: '- - - - - - - - - - - - - - k -'},
  { name: 'drop', sequence: 'n - - - - - - - - - - - - - - -'},
  { name: 'bass2', sequence: '- - - - - - - - - - - - - - e -'},
  { name: 'bell', sequence: 'g - - g - - g - - - g - - g - -'},
  { name: 'fun2', sequence: '- - z - - z - - - - z - - z - -'},
  { name: 'snare2', sequence: '- - o - - - o - - - o - - o o -'},
  { name: 'drank', sequence: '- - - - d - - - - - - - d - - -'},
];

function personjoins(data) {

  console.log('Hi Drew.');
  // we can only have so many noises!
  if (number_of_attendees >= sequences.length) {
    console.log("Time to make more tracks! We have more people than tracks!");
    return;
  }

  number_of_attendees++;
  var incoming_sequence = sequences[number_of_attendees-1];
  superloops.add(incoming_sequence.name, incoming_sequence.sequence);
}


function personquits(data) {
  console.log('Bye Drew.');
  var exiting_sequence = sequences[number_of_attendees-1];
  if (exiting_sequence) {
    superloops.remove(exiting_sequence.name);
    number_of_attendees--;
  }
}


$(document).ready(function() {

  // superloops.add('base', 'e - - - e - - - e - - - e - - -');

  var channel = "/speaker-socket"
  var socket = io.connect(channel);

  socket.on('phoneAdd', personjoins);
  socket.on('phoneDel', personquits);


});

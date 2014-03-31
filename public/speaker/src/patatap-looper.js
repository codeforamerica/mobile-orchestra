// modified from https://github.com/reimertz/patatap-looper

(function() {

  var SL = {
      beatsPerLoop: 16,
      beatsPerMinute: 200,
      _loops: {},
      _stop: false,
      add: function(name, beats) {
        this._loops[name] = beats.split(' ');
      },
      remove: function(name, beats) {
        var beats = this._loops[name];
        delete this._loops[name];
        return beats;
      },
      list: function() {
        var count = 0;
        for (key in this._loops) {
          console.log(key + ': ' + this._loops[key].join(' '));
          count++;
        }
        console.log(count + ' loop(s)');
      },
      clear: function() {
        this._loops = {};
      },
      stop: function() {
        this._stop = true;
      },
      start: function() {
        this._stop = false
        superloop(0, this.beatsPerLoop, this.beatsPerMinute);
      }
  }

  function playBeat(loop, beat) {
    if(loop[beat] !== '-'){
      var e = jQuery.Event("keydown");
      try {
        e.which = loop[beat].toUpperCase().charCodeAt(0);
      } catch(error) {
        console.warn('Typo at beat ' + beat + '');
      }
      $("input").val(String.fromCharCode(e.which));
      $("html").trigger(e);
    }
  }

  function superloop(beat, bpl, bpm) {
    _.each(SL._loops, function(loop) {
      playBeat(loop, beat);
    });
    if (SL._stop)
      return
    setTimeout(function(){
      var nextBeat = (beat+1)%bpl;
      superloop(nextBeat, bpl, bpm);
    }, (1000 * 60) / bpm);
  }

  superloop(0, SL.beatsPerLoop, SL.beatsPerMinute);
  window.superloops = SL;
  // console.clear()
})();

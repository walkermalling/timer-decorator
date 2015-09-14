var assert  = require('assert');
var timer   = require('../index');
var emitter = require('../index').reporter;
var util    = require('util');
var events  = require('events');

describe('Timer Decorator\n', function () {

  it('should return the decorated function\'s return value', function () {
    function x (param) { return param; }
    var y = timer(x);
    assert.equal(5, y(5));
  });

  it('should not screw up context', function () {
    function scopeTestHelper () {
      var inScope = 'im closed scope!';
      return function x () {
        return inScope + ' cool.';
      };
    }
    var x = scopeTestHelper();
    var inScope = 'bwahahah!';
    var y = timer(x);

    assert.equal(x(), y());
  });

  it('should accept option name param', function () {
    function x (param) { return param; }
    var y = timer(x, 'myFunc'); // check console
  });

  it('should handle concurrent timers', function () {
    var x = function (param) { return param; };
    var y = function (param) { return param; };
    var a = timer(x, 'one');
    var b = timer(y, 'two');
    for (var k = 0; k < 3; k++) {
      a();
      b();
    } // check console
  });

  it('exports the event emitter', function () {
    function x (param) { return param; }
    var y = timer(x, 'myFunc');
    var increment = 0;
    emitter.on('report', function(){
      increment++;
    });
    y('hi');
    assert.equal(increment,1);
  });

});

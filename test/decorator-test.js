var assert = require('assert');
var timer = require('../index');



describe('timer decorator', function () {

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
      }
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

  it('should avg multiple calls', function () {
    function x (param) { return param; }
    var y = timer(x);
    for (var k = 0; k < 100; k++) {
      y();
    }
  });





});


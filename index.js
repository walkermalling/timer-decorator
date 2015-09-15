var events = require('events');
var util   = require('util');
var spark  = require('sparkline');
var _      = require('lodash');

function Reporter () {
  var self = this;
  self.log = console.log;
  self.setLogger = function (customLogger) {
    self.log = customLogger;
  };
  events.EventEmitter.call(this);
}

util.inherits(Reporter, events.EventEmitter);

var reporter = new Reporter();

function sparkify (store) {
  var factor = 1 / _.min(store) * 10;
  var data = store.map(function (n) {
    return _.floor(n * factor);
  });
  return spark(data);
}

reporter.on('report', function (report) {

  report.store.push(report.duration);

  this.log(util.format(
    '[TIMER] "%s"\t%dms\n%s',
    report.functionName,
    report.duration,
    sparkify(report.store)
  ));

});

function timerDecorator (fn, name) {

  var store = [];

  var fnName;
  if (name) {
    fnName = name;
  } else {
    var match = fn.toString().match(/\w+(?=(\s){0,1}\()/);
    fnName = name || (match) ? match[0] : 'anonymous';
  }

  return function decorated () {
    var start = process.hrtime();
    var result = fn.apply(this, arguments);
    var diff = process.hrtime(start);
    var ms = (diff[0] * 1e9 + diff[1])/1000000;

    reporter.emit('report', {
      functionName: fnName,
      duration: ms,
      store: store
    });

    return result;
  };
}

module.exports          = timerDecorator;
module.exports.reporter = reporter;

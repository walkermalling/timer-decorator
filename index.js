var util = require('util');
var events = require('events');

function Reporter () {
  events.EventEmitter.call(this);
}

util.inherits(Reporter, events.EventEmitter);

var reporter = new Reporter();

var ledger = [];

reporter.on('report', function (report) {
  
  console.log(util.format(
      '[TIME] %s took %d ms to complete',
      report.functionName,
      report.duration
    ));

  if (ledger[report.functionName]) {
    ledger[report.functionName].push(report.duration);
  } else {
    ledger[report.functionName] = [report.duration];
  }

  console.log(util.format(
      '[INFO] %s averages %d ms', 
      report.functionName,
      (ledger[report.functionName].reduce(function (a, b) {
        return a + b
      }) / ledger[report.functionName].length)
    ));
  
});

function timerDecorator (fn, name) {

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
      duration: ms
    });

    return result;
  }
}

module.exports = timerDecorator;
// export hook to create listener
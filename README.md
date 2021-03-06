# Timer Decorator

Decorate any function to produce simple, high resolution logs of execution duration.

#### bullet points

  * uses node's `process.hrtime`
  * emits duration reports so you can time multiple processes at once
  * automatically averages durations
  * inject a custom logger

This is for testing only, not for production!

### Example

```

var timer = require('timer-decorator');

myFunction = timer(myFunction, 'customName');

for (var k = 10; k > 0; k--) {
  myFunction();
}


// [TIMER] "customName"	0.096919ms	(0.096919 avg)
// [TIMER] "customName"	0.009224ms	(0.0530715 avg)
// [TIMER] "customName"	0.010581ms	(0.038908 avg)
// [TIMER] "customName"	0.011152ms	(0.031969 avg)
// [TIMER] "customName"	0.012558ms	(0.028086800000000002 avg)
// [TIMER] "customName"	0.011086ms	(0.025253333333333336 avg)
// [TIMER] "customName"	0.006635ms	(0.02259357142857143 avg)
// [TIMER] "customName"	0.012483ms	(0.02132975 avg)
// [TIMER] "customName"	0.011924ms	(0.020284666666666666 avg)

```

### Use custom logger

```
function myCustomLogger (msg) {
  console.log(msg.toUpperCase());
}

timer.reporter.setLogger(myCustomLogger);

```

#### TODO:

 * better tests
 * investigate safeguard against memory leak in the decorator's `store` array

let start = input.runningTime()
let totalSec = escape.TOTAL_SECONDS
let remaining = totalSec
let won = false;

basic.showString("CLOCK")

escape.onEvent(escape.ADD_MINUTE, function() {
    totalSec = Math.max(0, totalSec + 60)
});
escape.onEvent(escape.REMOVE_MINUTE, function() {
    totalSec = Math.max(0, totalSec - 60)    
});

// time counting
basic.forever(function () {
    const b = control.createBuffer(5);
    b[0] = escape.REMAINING_SECONDS;
    b.setNumber(NumberFormat.Int32LE, 1, remaining | 0);
    radio.sendBuffer(b);
    basic.pause(10)

    if (remaining <= 0) {
        const bo = pins.createBuffer(1)
        bo[0] = escape.TIME_OVER
        radio.sendBuffer(bo)
    }
    basic.pause(1000);
})

// minute display
escape.onUpdate(function () {
    const elapsed = (input.runningTime() - start) / 1000;
    remaining = Math.max(0, totalSec - elapsed); // seconds
    const min = Math.ceil(remaining / 60)
    if (remaining > 5)
        basic.showString("TIME ")
    basic.showNumber(min);
})

// second ticker
basic.forever(function () {
    if (remaining > 0) {
        led.toggle(0, 0)
        basic.pause(1000)
    }
})

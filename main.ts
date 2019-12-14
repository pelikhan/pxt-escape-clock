let start = input.runningTime()
let totalSec = 0
let remaining = 0

basic.showString("CLOCK")

function addMinute() {
    totalSec = Math.max(0, totalSec + 60)
}
function removeMinute() {
    totalSec = Math.max(0, totalSec - 60)
}
function reset() {
    start = input.runningTime()
    totalSec = escape.TOTAL_SECONDS
    remaining = totalSec
}
reset()

// buttons
input.onButtonPressed(Button.AB, reset)
input.onButtonPressed(Button.A, removeMinute)
input.onButtonPressed(Button.B, addMinute)

// radio
radio.onReceivedBuffer(buffer => {
    escape.logMessage(buffer)
    switch (buffer[0]) {
        case escape.ADD_MINUTE:
            addMinute(); 
            break;
        case escape.REMOVE_MINUTE:
            removeMinute(); 
            break;
        case escape.RESET_CLOCK:
        case escape.RESET:
            reset(); 
            break;
    }
});
basic.forever(function () {
    const b = control.createBuffer(5);
    b[0] = escape.REMAINING_SECONDS;
    b.setNumber(NumberFormat.Int32LE, 1, remaining | 0);
    radio.sendBuffer(b);
    basic.pause(10)
    if (remaining < 0) {
        const bo = pins.createBuffer(1)
        bo[0] = escape.TIME_OVER
        radio.sendBuffer(bo)
    }
    basic.pause(1000);
})

// second ticker
basic.forever(function () {
    if (remaining > 0) {
        led.toggle(0, 0)
        basic.pause(1000)
    }
})

// minute display
basic.forever(function () {
    const elapsed = (input.runningTime() - start) / 1000;
    remaining = totalSec - elapsed; // seconds
    // display
    if (remaining > 0) {
        basic.showNumber(Math.ceil(remaining / 60));
        basic.pause(2000)
    } else {
        game.addScore(1)
        basic.showIcon(IconNames.Ghost)
    }
})

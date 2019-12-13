let start = input.runningTime()
let totalSec = 0
let remaining = 0

function addMinute() {
    totalSec = Math.max(0, totalSec + 60)
}
function removeMinute() {
    totalSec = Math.max(0, totalSec - 60)
}
function resetClock() {
    start = input.runningTime()
    totalSec = 360
    remaining = totalSec
}

// buttons
input.onButtonPressed(Button.AB, resetClock)
input.onButtonPressed(Button.A, addMinute)
input.onButtonPressed(Button.B, removeMinute)

// radio
radio.onReceivedBuffer(buffer => {
    switch (buffer[0]) {
        case escape.ADD_MINUTE:
            addMinute(); break;
        case escape.REMOVE_MINUTE:
            removeMinute(); break;
        case escape.RESET_CLOCK:
            resetClock(); break;
    }
});
basic.forever(function () {
    const b = control.createBuffer(5);
    b[0] = escape.REMAINING_SECONDS;
    b.setNumber(NumberFormat.Int32LE, 1, remaining | 0);
    radio.sendBuffer(b);
    basic.pause(1000);
})

// reset
resetClock();

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
    } else {
        while (true) {
            game.addScore(1)
            basic.showIcon(IconNames.Ghost)
        }
    }
    basic.pause(5000)
})

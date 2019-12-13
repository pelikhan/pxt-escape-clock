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

input.onButtonPressed(Button.AB, resetClock)
input.onButtonPressed(Button.A, addMinute)
input.onButtonPressed(Button.B, removeMinute)

radio.onReceivedBuffer(buffer => {
    switch(buffer[0]) {
        case escape.ADD_MINUTE:
            addMinute();
        case escape.REMOVE_MINUTE:
            removeMinute();
        case escape.RESET_CLOCK:
            resetClock();
    }
});

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
    remaining = totalSec - elapsed; // minutes
    if (remaining > 0) {
        basic.showNumber(Math.ceil(remaining / 60));
        basic.pause(5000)
    } else {
        while (true) {
            game.addScore(1)
            basic.showIcon(IconNames.Ghost)
        }
    }
})

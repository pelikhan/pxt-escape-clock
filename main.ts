radio.setGroup(42)

let start = input.runningTime()
let totalSec = 360
let remaining = totalSec

input.onButtonPressed(Button.AB, function () {
    start = input.runningTime()
})
input.onButtonPressed(Button.A, function () {
    totalSec = Math.max(0, totalSec - 60)
})
input.onButtonPressed(Button.B, function () {
    totalSec = Math.max(0, totalSec + 60)
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

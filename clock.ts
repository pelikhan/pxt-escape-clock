let remaining = escape.TOTAL_SECONDS

basic.showString("CLOCK")

escape.onMessageReceived((msg, data) => {
    if (msg == escape.REMAINING_SECONDS)
        remaining = data.getNumber(NumberFormat.UInt32LE, 0);
})
// minute display
escape.onUpdate(function () {
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

let remaining = escape.TOTAL_SECONDS

basic.showString("CLOCK")

escape.onMessageReceived((msg, data) => {
    if (msg == escape.REMAINING_SECONDS)
        remaining = data.getNumber(NumberFormat.UInt32LE, 0);
})
// minute display
escape.onUpdate(function () {
    const min = Math.ceil(remaining / 60)
    if (remaining >= 10)
        basic.showString("TIME" + min + "MIN")
    else
        basic.showNumber(min);
})

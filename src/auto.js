const {expose} = require("threads/worker");
const r = require("robotjs");

expose(function test(cps) {
    return setInterval(() => {
        r.mouseClick('left')
    }, cps)
})
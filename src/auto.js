const { expose } = require("threads/worker");
const r = require("robotjs");

expose({
    runClicks(cps) {
        return setInterval(() => {
            r.mouseClick('left')
        }, cps)
    }
})
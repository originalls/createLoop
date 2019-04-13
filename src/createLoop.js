const animationLoop = require('./animationLoop');
const noiseLoop = require('./noiseLoop');
const createGIF = require('./createGIF');
const event = require('./event');


module.exports = createLoop

function createLoop({
    duration = 3,
    frameRate = 10,
} = {}) {

    // const onPreDraw = event()
    const onPostDraw = event()
    const loop = {
        // onPreDraw,
        onPostDraw,
        update: _ => onPostDraw.invoke()
    }

    animationLoop({ frameRate, duration, loop });
    noiseLoop({ loop })
    createGIF({ loop })

    return loop
}
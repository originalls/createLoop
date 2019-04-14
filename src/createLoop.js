const animationLoop = require('./animationLoop');
const noiseLoop = require('./noiseLoop');
const createGIF = require('./createGIF');
const event = require('./event');


module.exports = createLoop

function createLoop({
    duration = 3,
    framesPerSecond = 30,
    noise = undefined,
    gif = undefined,
} = {}) {

    const loop = {}

    animationLoop({ framesPerSecond, duration, loop });
    Object.assign({ loop }, noise)
    noiseLoop(noise)
    if (gif !== undefined && gif !== false) {
        if (gif === true) {
            createGIF({ loop })
        } else {
            const gifOptions = Object.assign({ loop }, gif)
            createGIF(gifOptions)
        }
    }
    return loop
}
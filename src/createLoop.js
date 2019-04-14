const animationLoop = require('./animationLoop');
const noiseLoop = require('./noiseLoop');
const createGIF = require('./createGIF');

module.exports = createLoop

function createLoop({
    duration = 3,
    framesPerSecond = 30,
    noise = {},
    gif = false,
} = {}) {

    const loop = {}

    animationLoop({ framesPerSecond, duration, loop });

    noiseLoop(Object.assign({ loop }, noise))
    if (gif !== false) {
        if (gif === true)
            createGIF({ loop })
        else
            createGIF(Object.assign({ loop }, gif))
    }
    return loop
}
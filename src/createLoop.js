const animationLoop = require('./animationLoop');
const noiseLoop = require('./noiseLoop');
const createGIF = require('./createGIF');
const event = require('./event');


module.exports = createLoop

function createLoop({
    duration = 3,
    framesPerSecond = 10,
} = {}) {

    const loop = {}

    animationLoop({ framesPerSecond, duration, loop });
    noiseLoop({ loop })
    createGIF({ loop })

    return loop
}
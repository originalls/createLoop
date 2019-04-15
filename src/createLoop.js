const animationLoop = require('./animationLoop');
const noiseLoop = require('./noiseLoop');
const gifLoop = require('./gifLoop');

module.exports = createLoop

function createLoop({
    duration = 3,
    framesPerSecond = 30,
    noise = {},//deprecated
    gif = false,
    noiseRadius = 1,
    noiseSeed = Math.random()
} = {}) {

    const loop = {}

    animationLoop({ framesPerSecond, duration, loop });

    noiseLoop(Object.assign({ loop, noiseRadius, noiseSeed }, noise))

    if (gif !== false) {
        if (gif === true)
            gifLoop({ loop })
        else
            gifLoop(Object.assign({ loop }, gif))
    }
    return loop
}
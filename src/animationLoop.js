const event = require('./event');

module.exports = animationLoop

//internal script
function animationLoop({
    frameRate,
    duration,
    loop
} = {}) {

    const onLoop = event()

    loop.onPostDraw.addListener(onPostDraw)


    Object.assign(loop, {
        onLoop,
        frameRate,
        duration,
        frameTotal: Math.floor(duration * frameRate),
        frameDelay: 1 / frameRate * 1000,
        frameIndex: 0,
        loopCount: 0,
        elapsedFrames: 0,
        progress: 0,
        theta: 0
    })

    function onPostDraw() {
        loop.elapsedFrames++
        if (loop.elapsedFrames % loop.frameTotal === 0) {
            loop.loopCount++
            onLoop.invoke()
        }
        loop.frameIndex = loop.elapsedFrames % loop.frameTotal
        loop.progress = loop.frameIndex / loop.frameTotal
        loop.theta = (loop.progress * Math.PI * 2)
    }
}
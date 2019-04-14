const createLoop = require('./createLoop');
const event = require('./event');


module.exports = attachCreateLoop
function attachCreateLoop() {
    console.log('p5 detected, attaching createLoop');
    const onInit = event()
    const onPreRender = event()
    const onPostRender = event()

    p5.prototype.registerMethod('init', onInit.invoke)
    p5.prototype.registerMethod('pre', onPreRender.invoke)
    p5.prototype.registerMethod('post', onPostRender.invoke)

    p5.prototype.createLoop = p5CreateLoop

    function p5CreateLoop(duration) {
        const sketch = this
        // console.log(`creating loop with frame rate ${sketch._targetFrameRate}`);
        sketch.animLoop = createLoop({
            duration,
            framesPerSecond: sketch._targetFrameRate,
            canvas: sketch.canvas
        })
        if (sketch._isGlobal)
            window.animLoop = sketch.animLoop
        onPreRender.addListener(sketch.animLoop.preRender)
        onPostRender.addListener(sketch.animLoop.postRender)
    }


}



// console.log(p5 === undefined);
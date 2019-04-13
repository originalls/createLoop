const createLoop = require('./createLoop');
const event = require('./event');
if (typeof p5 !== typeof undefined) attachCreateLoop()

function attachCreateLoop() {
    console.log('p5 detected, attaching createLoop');
    const onInit = event()
    const onPost = event()

    p5.prototype.registerMethod('init', onInit.invoke)
    p5.prototype.registerMethod('post', onPost.invoke)

    p5.prototype.createLoop = p5CreateLoop


    function p5CreateLoop(duration) {
        const sketch = this
        // console.log(`creating loop with frame rate ${sketch._targetFrameRate}`);
        sketch.animLoop = createLoop({
            duration,
            frameRate: sketch._targetFrameRate,
            canvas: sketch.canvas
        })
        if (sketch._isGlobal)
            window.animLoop = sketch.animLoop
        onPost.addListener(sketch.animLoop.update)
    }

}



// console.log(p5 === undefined);
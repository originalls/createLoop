# Custom Animation Loop


If you need to be calling `requestAnimationFrame()` yourself or for some reason cannot render using the `start()` method, the below technique can be used.

```js


let loop = createLoop({framesPerSecond:10})

let lastLoopFrame = 0
onAnimationFrame()

function onAnimationFrame() {
    let dt = Date.now() - lastLoopFrame
    if (dt >= loop.frameDeltaTime)
        onLoopFrame()
    requestAnimationFrame(onAnimationFrame)
}

//onLoopFrame will be called at 10fps according to framesPerSecond
function onLoopFrame() {
    lastLoopFrame = Date.now()
    loop.onPreRender.invoke()

    //do your rendering in here i.e
    // ctx.fillRect(0,0,30,30)

    loop.onPostRender.invoke()
}
```
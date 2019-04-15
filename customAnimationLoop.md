# Custom Animation Loop


If you need to be calling `requestAnimationFrame()` yourself or for some reason cannot render using the `start()` method, the below technique can be used.

```js


let loop = createLoop()

let lastTime = 0
onAnimationFrame()

function onAnimationFrame() {
    let dt = Date.now() - lastTime
    if (dt >= loop.frameDeltaTime)
        onLoopFrame()
    requestAnimationFrame(onAnimationFrame)
}

function onLoopFrame() {
    lastTime = Date.now()
    loop.onPreRender.invoke()

    //do your rendering in here i.e
    // ctx.fillRect(0,0,30,30)

    loop.onPostRender.invoke()
}
```
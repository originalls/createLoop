# p5.createLoop
p5.createLoop provides a simple and structured library for creating animation loops in the browser. It is a light wrapper of [createLoop](https://www.npmjs.com/package/createloop).

## Example

![p5 simple example](examples/images/simpleLoop.gif)

html:
```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.8.0/p5.min.js"></script>
    <script src="https://unpkg.com/createloop@latest/createloop.min.js"></script>
```

javascript:
```js
function setup() {
    createCanvas(400, 400)
    fill(0)
    //lower framerate = smaller files
    frameRate(30)
    //setting duration to 3 seconds (30fps * 3 seconds will be 90 frames) and set renderGIF to true
    createLoop(3, true)
}

function draw() {
    background(255)
    translate(width / 2, height / 2)
    const radius = height / 3
    const x = cos(animLoop.theta) * radius
    const y = sin(animLoop.theta) * radius
    ellipse(x, y, 50, 50)
}
```



## Documentation


p5.createLoop works to make creating loops

### createLoop(options)

This method is attached to the sketch and receives several arguments.

| Name              | Default     | Description                                                                                                         |
| ----------------- | ----------- | ------------------------------------------------------------------------------------------------------------------- |
| `duration`        | `2`         | sets the duration in seconds of the loop                                                                            |
| `framesPerSecond` | `30`        | create an image element and render the gif alongside the sketch                                                     |
| `noise`           | `undefined` | options to be passed to noise module. see [noise options](README.md#noise-options)                                  |
| `gif`             | `undefined` | options to be passed to GIF module. Will not create GIF if left undefined. see [gif options](README.md#gif-options) |

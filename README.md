# create-loop
Simple and structured approach to creating animation loops. Features include using looping noise and rendering GIF images.


**Ye be warned** This is a baby library and has a lot of growing up to do. Breaking changes ahoy.

## P5 Usage

### Rendering a GIF


The library is designed to generate a faithful representation of the sketch as seen in the browser. For this reason users are encouraged to make use of p5's built-in `frameRate()` function to set the delay between GIF frames. A snapshot of the p5 sketch is automatically added at the end of evey `draw()`.

The GIF encoder [gif.js](https://github.com/jnordberg/gif.js) uses web workers to render the GIF asynchronously. By default, the GIF will be rendered alongside the sketch and can be downloaded by clicking on it.

## Example

![Example 1](examples/images/simpleLoop.gif)


html:
```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.8.0/p5.min.js"></script>
    <script src="https://unpkg.com/p5.creategif@latest/dist/p5.createGIF.js"></script>
```

javascript:
```js
        function setup() {
            createCanvas(400, 400)
            fill(0)
            frameRate(30)
            createGIF({ duration: 3, download: true })
        }

        function draw() {
            background(255)
            translate(width / 2, height / 2)
            const radius = height/3
            const x = cos(gifLoop.theta) * radius
            const y = sin(gifLoop.theta) * radius
            ellipse(x, y, 50, 50)
        }
```
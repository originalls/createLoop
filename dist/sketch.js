
function setup() {
    createCanvas(400, 400)
    frameRate(5)
    createLoop(1)
}
function draw() {
    background(0)
    translate(width / 2, height / 2)
    const x = Math.cos(animLoop.theta) * 100
    const y = Math.sin(animLoop.theta) * 100
    ellipse(x, y, 30, 30)
}


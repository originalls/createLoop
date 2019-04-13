
const GIF = require('gif.js');
const workerScript = require('./gifWorkerScript');

module.exports = createGIF

function createGIF({
    render = true,
    open = false,
    download = false,
    options = {},
    canvas = document.getElementsByTagName('canvas')[0],
    loop
}) {

    console.log(`creating GIF with ${loop.frameTotal} frames`);

    const gifjs = new GIF(Object.assign({
        workerScript
    }, options));

    loop.onPostDraw.addListener(addFrame)
    loop.onLoop.addListener(startRendering)
    loop.onPostDraw.addListener(addFrame)

    let isFinished = false
    let renderStartTime = undefined
    // Object.assign(loop, {
    //     renderStartTime: undefined,
    //     // canvas
    // })

    //this is getting called twice
    gifjs.on('finished', onFinishedRendering)

    //FUNCTIONS ---------------------------------------------------------------------

    function addFrame() {
        // console.log(`adding frame ${loop.loopCount}`);
        gifjs.addFrame(canvas, { copy: true, delay: loop.frameDelay })
    }

    function startRendering() {
        // console.log(loop.loopCount);
        if (loop.loopCount !== 1)
            return
        loop.onPostDraw.removeListener(addFrame)
        console.log('rendering GIF');
        renderStartTime = Date.now()
        gifjs.render()
    }

    function onFinishedRendering(blob) {
        if (isFinished)
            return
        isFinished = true
        const renderTime = Date.now() - renderStartTime
        console.log(
            `finished rendering GIF
                    render time: ${(renderTime / 1000).toFixed(1)} seconds
                    approx size: ${(blob.size / 1000).toFixed(0)} kb
                    frame count: ${loop.frameTotal}
                    frame delay: ${loop.frameDelay.toFixed(1)} ms
                    `);
        const imgUrl = URL.createObjectURL(blob)
        if (render)
            renderImage(imgUrl)
        if (open)
            window.open(imgUrl)
        if (download)
            downloadImage(imgUrl)
        // URL.revokeObjectURL(imgUrl)
    }

}


function renderImage(blobUrl) {
    // return new Promise((resolve, reject) => {
    const a = document.createElement('a')
    a.download = "image.gif"
    document.body.appendChild(a)
    const img = document.createElement('img')
    // img.addEventListener('load', resolve)
    img.src = blobUrl
    a.href = img.src
    img.setAttribute('href', blobUrl)
    img.setAttribute('download', "image.gif")
    a.appendChild(img)
};

function downloadImage(blobUrl) {
    const elt = document.createElement('a')
    elt.style.display = 'none'
    elt.href = blobUrl
    elt.download = "image.gif"
    document.body.appendChild(elt)
    elt.click()
    document.body.removeChild(elt)
}
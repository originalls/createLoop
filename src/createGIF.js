
//This module does not add anything to the loop instance
// it does attach itsself to loop events onLoop and onPostRender


const GIF = require('gif.js');
const workerScript = require('./gifWorkerScript');

module.exports = createGIF

function createGIF({
    render = true,
    open = false,
    download = false,
    startLoop = 0,
    endLoop = 1,
    options = {},
    canvas = document.getElementsByTagName('canvas')[0],
    loop
}) {
    if (canvas === undefined) {
        console.error('GIF module: no canvas found');
        return
    }

    const gifjs = new GIF(Object.assign({
        workerScript
    }, options));

    let isFinished = false
    let renderStartTime = undefined

    loop.onLoop.addListener(handleNewLoop)

    function handleNewLoop() {
        if (loop.elapsedLoops === startLoop)
            startRecording()
        else if (loop.elapsedLoops === endLoop)
            startRendering()
    }

    //some reason this is getting called twice
    gifjs.on('finished', onFinishedRendering)

    //FUNCTIONS ---------------------------------------------------------------------
    function startRecording() {
        console.log(`creating GIF with ${loop.framesPerLoop * (endLoop - startLoop)} frames`);
        loop.onPostRender.addListener(addFrame)
    }


    function addFrame() {
        // console.log(`adding frame ${loop.elapsedFrames}`);
        gifjs.addFrame(canvas, { copy: true, delay: loop.frameDeltaTime })
    }

    function startRendering() {
        // console.log(loop.onPostRender._listeners[0].toString())
        loop.onPostRender.removeListener(addFrame)
        loop.onLoop.removeListener(handleNewLoop)
        console.log(`rendering GIF`);
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
                    frame count: ${loop.framesPerLoop}
                    frame delay: ${loop.frameDeltaTime.toFixed(1)} ms
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
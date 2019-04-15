const SimplexNoise = require('simplex-noise');
module.exports = noiseLoop


function noiseLoop({
    frequency = undefined,//depreceated
    seed = undefined,//deprecated
    noiseRadius = 1,
    noiseSeed = Math.random(),
    loop
}) {

    const instances = []
    let currentInstance
    if (seed === undefined)//to deprecate
        setNoiseSeed(noiseSeed)
    else//to deprecate
        setNoiseSeed(seed)//to deprecate
    if (frequency !== undefined)
        noiseRadius = frequency

    Object.assign(loop, {
        noiseFrequency: (val) => noiseRadius = val,//deprecate
        noise,
        noise1D,
        noise2D,
        noiseSeed: setNoiseSeed,
        noiseRadius: (val) => noiseRadius = val
    })

    function noise({ theta = loop.theta, radius = noiseRadius } = {}) {
        const cart = polarToCartesian(theta, radius)
        return currentInstance.simplex.noise2D(cart.x, cart.y)
    }

    function noise1D(x, { theta = loop.theta, radius = noiseRadius } = {}) {
        const cart = polarToCartesian(theta, radius)
        return currentInstance.simplex.noise3D(cart.x, cart.y, x)
    }

    function noise2D(x, y, { theta = loop.theta, radius = noiseRadius } = {}) {
        const cart = polarToCartesian(theta, radius)
        return currentInstance.simplex.noise4D(cart.x, cart.y, x, y)
    }

    function setNoiseSeed(newSeed) {
        currentInstance = instances.find(i => i.seed === newSeed)
        if (currentInstance === undefined) {
            currentInstance = {
                seed: newSeed,
                simplex: new SimplexNoise(newSeed)
            }
            instances.push(currentInstance)
        }
    }
}

function polarToCartesian(theta, radius) {
    return {
        x: Math.cos(theta) * radius,
        y: Math.sin(theta) * radius
    }
}
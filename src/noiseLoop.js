const SimplexNoise = require('simplex-noise');
module.exports = noiseLoop


function noiseLoop({
    frequency = 1,
    seed = Math.random(),
    loop
}) {

    const instances = []
    let currentInstance
    setNoiseSeed(seed)

    Object.assign(loop, {
        get frequency() { return frequency },
        set frequency(val) { frequency = val },
        noise,
        noise2D,
        noise3D,
        setNoiseSeed
    })

    function noise() {
        const cart = polarToCartesian(loop.theta, frequency)
        return currentInstance.simplex.noise2D(cart.x, cart.y)
    }

    function noise2D(x) {
        const cart = polarToCartesian(loop.theta, frequency)
        return currentInstance.simplex.noise3D(cart.x, cart.y, x)
    }

    function noise3D(x, y) {
        const cart = polarToCartesian(loop.theta, frequency)
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
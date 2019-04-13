module.exports = event

function event() {
    const listeners = []
    return {
        addListener: (l => {
            const found = listeners.find(l)
            if (found === undefined)
                listeners.push(l)
        }),
        removeListener: (l => {
            const found = listeners.find(l)
            if (found !== undefined)
                listeners.splice(listeners.indexOf(l), 1)
        }),
        invoke: (args => listeners.forEach(l => l(args)))
    }
}
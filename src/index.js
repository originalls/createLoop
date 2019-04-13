
require('./p5.createLoop');
if (typeof p5 === typeof undefined)
    window.createLoop = require('./createLoop');
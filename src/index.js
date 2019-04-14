if (typeof p5 !== typeof undefined) {
    require('./p5.createLoop')();
}
else {
    console.log('attaching createLoop to window');
    window.createLoop = require('./createLoop');
}


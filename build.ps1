npx.cmd webpack
Copy-Item ./dist/main.js ./examples/createloop.js
Copy-Item ./dist/main.js ./createloop.min.js
# minify.cmd ./dist/createLoop.js
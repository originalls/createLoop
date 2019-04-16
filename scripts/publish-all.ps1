echo "publishing createLoop"
npm run publish
echo "updating and publishing p5.createLoop"
cd ../p5.createLoop
npm run update-dependencies
npm run publish
cd ../createLoop
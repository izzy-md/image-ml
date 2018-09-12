// This javascript file will generate a json manifest file for all the images
// created via both the flatten scripts in the `set` directory

const path = require('path');
const fs = require('fs');

// Quick alias for this
const dir = filepath => path.resolve(__dirname, filepath);

const manifestDir = './manifest';
const date = new Date().getTime();
const manifest = `${manifestDir}/manifest.${date}.json`;

let json = {table: []};

fs.readdir(dir('./set'), (err, files) => {
    files.forEach(file => {
        json.table.push(`/dataset/set/${file}`);
    });

    fs.writeFile(dir(manifest), JSON.stringify(json), 'utf8', (err, data) => {
        console.log(`Created manifest file: ${manifest}`);
    });
});
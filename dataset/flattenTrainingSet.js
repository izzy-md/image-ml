// This javascript flattens all the images in the `TrainingSet` folder
// Adding the `_blur` suffix to all the images that aren't in the
// `TrainingSet/Undistorted` set

const path = require('path');
const fs = require('fs');

// Quick alias for this
const dir = filepath => path.resolve(__dirname, filepath);

const directories = [
    {
        base: './TrainingSet',
        dir: 'Artificially-Blurred',
        get full(){
            return this.base + '/' + this.dir;
        }
    },
    {
        base: './TrainingSet',
        dir: 'Naturally-Blurred',
        get full(){
            return this.base + '/' + this.dir;
        }
    },
    {
        base: './TrainingSet',
        dir: 'Undistorted',
        get full(){
            return this.base + '/' + this.dir;
        }
    },
];

for(let d in directories){
    const directory = directories[d];

    fs.readdir(dir(directory.full), (err, files) => {
        for(let i = 0, len = files.length; i < len; i++){
            let file = files[i];

            // Only use jpg files
            if(!file.includes('.jpg') && !file.includes('.JPG')){
                continue;
            }

            let filename = file.substring(0, file.length - 4);
            let blurred = (directory.dir === 'Undistorted' ? '_blur' : '');

            let oldPath = directory.full + '/' + file;
            let newPath = './set/' + directory.dir + '_' + filename + blurred + '.jpg';

            fs.copyFileSync(dir(oldPath), dir(newPath));

            console.log(oldPath + ' moved to ' + newPath);
        }

        console.log('Jobs done!');
    });
}
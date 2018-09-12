// This javascript is used to flatten all the evaluation set images into the `./set/` folder
// making sure to add the `'_blur'` suffix to all the files that are blurred according to the
// xlsx (converted to csv) sheets that exist in the `CERTH_ImageBlurDataset/EvaluationSet/` folder
// It should not be run unless wanting to use the certh image blur dataset again

const path = require('path');
const fs = require('fs');
const csv = require('csvtojson');

// Quick alias for this
const dir = filepath => path.resolve(__dirname, filepath);

const paths = [
    {
        base: './EvaluationSet',
        dir: 'DigitalBlurSet',
        file: 'DigitalBlurSet.csv',
        get csv(){
            return this.base + '/' + this.file;
        },
        get folder(){
            return this.base + '/' + this.dir;
        }
    },
    {
        base: './EvaluationSet',
        dir: 'NaturalBlurSet',
        file: 'NaturalBlurSet.csv',
        get csv(){
            return this.base + '/' + this.file;
        },
        get folder(){
            return this.base + '/' + this.dir;
        }
    },
];

// Do this for each of the paths
for(let i in paths){
    // Make path into absolute path
    const file = dir(paths[i].csv);
    const folder = paths[i].folder;
    const set = paths[i].dir;

    // Convert CSV to json
    csv({
        noHeader: true,
        checkType: true,
    })
    .fromFile(file)
    .then(json => {
        // Convert json to have this structure
        // { blurred: boolean, path: string }
        return json.map(image => {
            let formatted = {};

            for(let key in image){
                if(typeof image[key] === 'number'){
                    formatted.blurred = !!~image[key];
                }

                if(typeof image[key] === 'string'){
                    formatted.path = image[key];
                }
            }

            return formatted;
        });
    })
    .then(json => {
        for(let i = 0, len = json.length; i < len; i++){
            let image = json[i];
            let oldPath = folder + '/' + image.path + '.jpg';
            let newPath = './set/' + set + '_' + image.path + (image.blurred ? '_blur' : '') + '.jpg';

            // Copy the file
            fs.copyFileSync(dir(oldPath), dir(newPath));

            console.log(oldPath + ' moved to ' + newPath);
        }

        console.log('Jobs done!');
    });
}
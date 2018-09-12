export default class GeneralDataset {
    constructor(dataset){
        this.dataset = dataset;
    }

    async getImageList(){
        // If it's already json!
        if(this.dataset instanceof Array){
            return this.dataset;
        }

        // Json file with an array of urls
        // url should contain the word blur if it is
        // blurry for this usecase
        return await fetch(this.url).then(res => res.json());
    }

    static drawImage(image){
        let canvas = document.createElement('canvas');

        canvas.width = image.width;
        canvas.height = image.height;

        let ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, image.width, image.height);

        return ctx;
    }

    static loadImage(url){
        return new Promise((resolve, reject) => {
            let image = new Image();

            image.crossOrigin = '';
            image.src = url;

            const listener = async e => {
                try {
                    let context = await this.constructor.drawImage(image);

                    resolve({
                        imageData: context.getImageData(0, 0, image.width, image.height),
                        blurred: url.includes('blur'),
                    });
                } catch(e) {
                    reject(e);
                }
            };

            listener.bind(this);

            image.addEventListener('load', listener);
        });
    }

    get data(){
        return (async () => {
            let images = await this.getImageList();

            return Promise.all(images.map(await this.constructor.loadImage.bind(this)));
        })();
    }
}
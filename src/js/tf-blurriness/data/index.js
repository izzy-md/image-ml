export default class GeneralDataset {
    constructor(url){
        this.url = url;
    }

    async getImageList(){
        // Json file with an array of urls
        // url should contain the word blur if it is
        // blurry for this usecase
        return await fetch(this.url).then(res => res.json());
    }

    static async drawImage(image){
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

            image.addEventListener('load', e => {
                try {
                    let context = this.drawImage(image);

                    resolve({
                        imageData: context.getImageData(0, 0, image.width, image.height),
                        blurred: url.includes('blur'),
                    });
                } catch(e) {
                    reject(e);
                }
            });
        });
    }

    get data(){
        return (async () => {
            let images = await this.getImageList();

            return images.map(await this.constructor.loadImage);
        })();
    }
}
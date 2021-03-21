import { Layer } from './layer.js';

class App {
    constructor(container) {
        this.layer = new Layer(container);
    }
}

onload = () => {
    new App(document.querySelector('body'))
}

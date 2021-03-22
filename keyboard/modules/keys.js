export class KeyControls {
    constructor( keyList = ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']) {
        this.keyList = keyList;
        this.keys = {};

        addEventListener('keydown', e => {
            this.changeState(e)
        })
        addEventListener('keyup', e => {
            this.changeState(e)
        })
    }

    changeState(e) {
        if(!this.keyList.includes(e.code)) return;
        console.log(e.code)

        this.keys[e.code] = e.type === 'keydown' ? true : false;
    }


}


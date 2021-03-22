import { Layer } from './layer.js'
import { Loop } from './loop.js'
import { KeyControls} from "./keys.js";

class App {
  constructor(container) {
    this.layer = new Layer(container);
    this.keyboard = new KeyControls(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'])
    this.keys = this.keyboard.keys;

    this.rect = {
      x: 0,
      y: 0,
      w: 32,
      h: 64,
      vx: 700,
      vy: 0,
      isAir: true,
      isCrouch: false,
      minH: 32,
      maxH: 64,
      color: `orange`,
      gravity: 90,
    }

    new Loop(this.update.bind(this), this.display.bind(this));
  }
  update(correction) {
    if((this.keys.KeyS || this.keys.ArrowDown)
        && this.rect.h >= this.rect.minH) {
      this.rect.h -= 16;
      this.rect.y += 16;
      this.rect.isCrouch = true;
    }
    if((this.keys.KeyW || this.keys.ArrowUp)
        && this.rect.h < this.rect.maxH) {
      this.rect.h += 16;
      this.rect.isCrouch = false;
    }

    if (this.keys.KeyD || this.keys.ArrowRight) {
      this.rect.x += this.rect.vx * correction;
    }
    if (this.keys.KeyA || this.keys.ArrowLeft) {
      this.rect.x -= this.rect.vx * correction;
    }

    if (this.keys.Space && !this.rect.isAir && !this.rect.isCrouch) {
      this.rect.vy = -30;
      this.rect.isAir = true;
    }

    if(this.rect.isAir) {
      this.rect.vy += this.rect.gravity * correction;
    } else {
      this.rect.vy = 0;
    }
    this.rect.y += this.rect.vy;


    if (this.rect.y + this.rect.h >= this.layer.h) {
      this.rect.y = this.layer.h - this.rect.h;
      this.rect.isAir = false
    }
  }
  display() {
    this.layer.context.clearRect(0, 0, this.layer.w, this.layer.h);
    this.layer.context.fillStyle = this.rect.color;
    this.layer.context.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
  }
}

onload = () => { new App(document.body) }

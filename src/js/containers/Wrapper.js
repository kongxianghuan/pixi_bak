import { Container, Sprite, Texture } from 'pixi.js'
import { PAGE_WIDTH, PAGE_HEIGHT } from '../const'

const dev = location.search.substr(1) === 'dev=1'

class Wrapper extends Container {
  constructor() {
    super()

    this.bg = new Sprite(Texture.WHITE)
    this.bg.width = window.innerHeight < PAGE_WIDTH 
      ? window.innerHeight : PAGE_WIDTH
    this.bg.height = window.innerWidth
    this.bg.tint = '0xffffff'
    this.bg.alpha = 0

    if (dev) {
      this.bg.width = 1334
      // this.bg.width = 1125
      this.bg.height = 750
    }

    this.addChild(this.bg)
    this.pivot.set(this.bg.width / 2, this.bg.height / 2)
    this.position.set(PAGE_WIDTH / 2, PAGE_HEIGHT / 2)
  }
}

export default Wrapper
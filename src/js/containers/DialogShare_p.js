import { Container, Sprite, loader, Texture } from 'pixi.js'
import { PAGE_WIDTH, PAGE_HEIGHT } from '../const'
import { tween } from 'popmotion'
import Wrapper from './Wrapper'
import imgs from '../imgs'
import ua from '../ua'

const { resources } = loader

export default class DialogShare extends Container {
  constructor() {
    super()  
    this.initSprite()
    this.bindEvents()
    // this.animate()
  }
  initSprite() {
    this.alpha = 0
    
    this.bg = new Sprite(Texture.WHITE)
    this.bg.width = PAGE_WIDTH
    this.bg.height = PAGE_HEIGHT
    this.bg.tint = '0x000000'
    this.bg.alpha = .9
    this.addChild(this.bg)

    this.wrapper = new Wrapper()
    this.addChild(this.wrapper)

    this.tipText = new Sprite(resources[imgs.tip_wx].texture)
    this.tipText.anchor.set(.5)
    this.tipText.position.set(this.width/2, this.height/2)
    this.addChild(this.tipText)

    this.arrowLeft = new Sprite(resources[imgs.tip_arrow_left].texture)
    this.arrowLeft.position.set(20)
    this.wrapper.addChild(this.arrowLeft)

    this.arrowRight = new Sprite(resources[imgs.tip_arrow_right].texture)
    this.arrowRight.position.set(this.width - this.arrowRight.width - 20, 20)
    this.wrapper.addChild(this.arrowRight)

    if (ua.isWx()) {
      this.arrowRight.alpha = 0
    } else {
      this.arrowLeft.alpha = 0
    }
  }
  bindEvents() {
    this.on('pointerdown', () => this.hide())
  }
  fade(alpha) {
    tween({ from: this.alpha, to: alpha })
      .start(v => this.alpha = v)
  }
  show() {
    this.fade(1)
    this.interactive = true
  }
  hide() {
    this.fade(0)
    this.interactive = false
  }
}


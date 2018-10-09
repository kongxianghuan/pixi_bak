import { Container, Sprite, loader } from 'pixi.js'
import { tween, Infinity, delay } from 'popmotion'
import imgs from '../imgs'

const { resources } = loader

class ClickTip extends Container {
  constructor() {
    super()
    this.initSprite()
    // this.animate()
    this.alpha = 0
  }
  initSprite() {

    this.tipCircle = new Sprite(resources[imgs.tip_circle].texture) 
    this.tipCircle.anchor.set(.5)
    this.tipCircle.position.set(this.tipCircle.width/2 + 2, this.tipCircle.height/2)
    this.tipCircle.alpha = 0
    this.addChild(this.tipCircle)

    this.tipHand = new Sprite(resources[imgs.tip_hand].texture) 
    this.tipHand.y = 26
    this.tipHand.alpha = 0
    this.addChild(this.tipHand)
  }
  animate() {
    this.alpha = 1
    tween({
      from: { y: this.tipHand.y + 50, alpha: 0 },
      to: { y: this.tipHand.y, alpha: 1 },
      duration: 1400,
      loop: 1000
    }).start({
      update: v => {
        this.tipHand.y = v.y
        this.tipHand.alpha = v.alpha
      }
    }) 
    tween({
      from: { scale: .5, alpha: 0 },
      to: { scale: 1, alpha: 1 },
      duration: 1400,
      loop: 1000
    }).start(v => {
      this.tipCircle.scale.set(v.scale)
      this.tipCircle.alpha = v.alpha
    })
  }
}

export default ClickTip
import { Container, Sprite, Texture, Text, TextStyle } from 'pixi.js'
import { PAGE_WIDTH, PAGE_HEIGHT } from '../const'
import { tween, easing, Infinity } from 'popmotion'
import imgs from '../imgs'

export default class Loading extends Container {
  constructor() {
    super()

    const textStyle = new TextStyle({
      fontSize: '36px',
      fill: ['0x1b7d67']
    })

    this.bg = new Sprite(Texture.WHITE)
    this.bg.width = PAGE_WIDTH
    this.bg.height = PAGE_HEIGHT
    this.bg.tint = '0xc2f5ec'
    this.addChild(this.bg)

    this.progressNumber = new Text('0%', textStyle)
    this.progressNumber.anchor.set(.5)
    this.progressNumber.x = PAGE_WIDTH / 2
    this.progressNumber.y = 430
    this.addChild(this.progressNumber)

    this.tip = new Text('请锁定“横屏”模式观看', textStyle)
    this.tip.anchor.set(.5)
    this.tip.x = PAGE_WIDTH / 2
    this.tip.y = 480
    this.addChild(this.tip)
    
    this.ball = new Sprite(Texture.fromImage(imgs.p2_ball))
    this.ball.anchor.set(.5)
    this.ball.x = PAGE_WIDTH / 2
    this.ball.y = 350
    this.addChild(this.ball)

    this.pivot.set(this.width/2, this.height/2)
    this.position.set(PAGE_WIDTH/2, PAGE_HEIGHT/2)

    this.animate()
  }
  update(text) {
    this.progressNumber.text = text
  }
  animate() {
    this.ballAni = tween({
      from: {  y: this.ball.y },
      to: {  y: this.ball.y - 100 },
      duration: 300,
      easing: easing.easeInOut,
      yoyo: 100
    }).start(v => this.ball.y = v.y)
  }
  out(callback) {
    this.ballAni.stop()
    tween({
      from: { scale: 1, alpha: 1 },
      to: { scale: 2, alpha: 0 },
      duration: 1000,
      complete: () => callback && callback()
    }).start(v => this.alpha = v.alpha )
  }
}

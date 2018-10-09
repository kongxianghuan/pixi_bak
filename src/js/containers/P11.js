import { Container, Sprite, loader } from 'pixi.js'
import { tween, delay } from 'popmotion'
import { textAni } from '../animationUtils'
import Wrapper from './Wrapper'
import imgs from '../imgs'
import events from '../events'

const { resources } = loader

export default class P11 extends Container {
  constructor() {
    super()  
    this.initSprite()
    // this.animate()
  }
  initSprite() {
    this.bg = new Sprite(resources[imgs.p11_bg].texture)
    this.addChild(this.bg)

    this.wrapper = new Wrapper()
    this.addChild(this.wrapper)

    this.dad = new Sprite(resources[imgs.p11_dad].texture)
    this.dad.x = 585
    this.dad.y = 282
    this.addChild(this.dad)

    this.grandpa = new Sprite(resources[imgs.p11_grandpa].texture)
    this.grandpa.x = 305
    this.grandpa.y = 120
    this.grandpa.alpha = 0
    this.addChild(this.grandpa)

    this.child = new Sprite(resources[imgs.p11_child].texture)
    this.child.x = 224
    this.child.y = 338
    this.child.alpha = 0
    this.addChild(this.child)
    
    this.ball = new Sprite(resources[imgs.p11_ball].texture)
    // this.ball.x = 486
    // this.ball.y = 616
    this.ball.x = -100
    this.ball.y = 516
    this.ball.anchor.set(.5)
    this.addChild(this.ball)

    this.year = new Sprite(resources[imgs.p11_year].texture)
    this.year.x = 44
    this.year.y = 44
    this.year.alpha = 0
    this.wrapper.addChild(this.year)

    this.title = new Sprite(resources[imgs.p11_title].texture)
    this.title.x = 654
    this.title.y = 80
    this.title.alpha = 0
    this.addChild(this.title)

    this.text = new Sprite(resources[imgs.p11_text].texture)
    this.text.x = 660
    this.text.y = 162
    this.text.alpha = 0
    this.addChild(this.text)

    this.table = new Sprite(resources[imgs.p11_table].texture)
    this.table.x = 510
    this.table.y = 620
    this.addChild(this.table)

    this.potted = new Sprite(resources[imgs.p11_potted].texture)
    this.potted.x = 0
    this.potted.y = 444
    this.addChild(this.potted)

  }
  animate() {
    tween({
      from: { x: this.ball.x, y: this.ball.y, rotation: 0 },
      to: { x: 486, y: 616, rotation: Math.PI*50 },
      duration: 500
    }).start(v => {
      this.ball.x = v.x
      this.ball.y = v.y
      this.ball.rotation = v.rotation
    })

    delay(400).start({
      complete: () => {
        tween({
          from: { x: this.child.x - 50, y: this.child.y - 50, alpha: 0 },
          to: { x: this.child.x, y: this.child.y, alpha: 1 },
          duration: 400
        }).start(v => {
          this.child.x = v.x
          this.child.y = v.y
          this.child.alpha = v.alpha
        })
      }
    })
    
    delay(600).start({
      complete: () => {
        tween({
          from: { x: this.grandpa.x - 50, y: this.grandpa.y - 50, alpha: 0 },
          to: { x: this.grandpa.x, y: this.grandpa.y, alpha: 1 },
          duration: 400
        }).start(v => {
          this.grandpa.x = v.x
          this.grandpa.y = v.y
          this.grandpa.alpha = v.alpha
        })
      }
    }) 

    delay(3800).start({
      complete: () => events.emit('p11_out', 1200, 0, 2500)
    })

    textAni(this.year, 1000)
    textAni(this.title, 1300)
    textAni(this.text, 1500)
  }
}
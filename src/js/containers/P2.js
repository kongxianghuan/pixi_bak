import { Container, Sprite, loader } from 'pixi.js'
import { delay, tween } from 'popmotion'
import Wrapper from './Wrapper'
import imgs from '../imgs'
import events from '../events'
import { textAni } from '../animationUtils'
import Clicktip from './Clicktip'

const { resources } = loader

export default class P2 extends Container {
  constructor() {
    super()  
    this.initSprite()
    // this.animate()
    this.aniEnd = false
  }
  initSprite() {
    this.bg = new Sprite(resources[imgs.p2_bg].texture)
    this.addChild(this.bg)

    this.wrapper = new Wrapper()
    this.addChild(this.wrapper)

    this.goalkeeper = new Sprite(resources[imgs.goalkeeper].texture)
    this.goalkeeper.x = 780
    this.goalkeeper.y = 756
    this.addChild(this.goalkeeper)

    this.ma = new Container()
    this.ma.x = 450
    this.ma.y = 750
    this.ma1 = new Sprite(resources[imgs.ma1].texture)
    this.ma2 = new Sprite(resources[imgs.ma2].texture)
    this.ma2.alpha = 0
    this.ma.addChild(this.ma1)
    this.ma.addChild(this.ma2)
    this.addChild(this.ma)

    this.year = new Sprite(resources[imgs.p2_year].texture)
    this.year.x = 42
    this.year.y = 46
    this.year.alpha = 0
    this.wrapper.addChild(this.year)

    this.title = new Sprite(resources[imgs.p2_title].texture)
    this.title.x = this.wrapper.width - this.title.width - 91
    this.title.y = 156
    this.title.alpha = 0
    this.wrapper.addChild(this.title)

    this.text = new Sprite(resources[imgs.p2_text].texture)
    this.text.x = this.wrapper.width - this.text.width - 75
    this.text.y = 74
    this.text.alpha = 0
    this.wrapper.addChild(this.text)

    this.ball = new Sprite(resources[imgs.p2_ball].texture)
    this.ball.x = 330
    this.ball.y = -100
    this.ball.pivot.set(this.ball.width/2, this.ball.height/2)
    this.addChild(this.ball)

    this.clicktip = new Clicktip()
    this.clicktip.x = 460
    this.clicktip.y = 104
    this.clicktip.scale.set(.5)
    this.addChild(this.clicktip)

    this.bindEvents()
  }
  bindEvents() {
    // this.ball.interactive = true
    // this.ball.on('pointerdown', () => this.out())
    this.interactive = true
    this.on('pointerdown', () => this.aniEnd && this.out())
  }
  animate() {
    textAni(this.year, 700)
    textAni(this.text, 1000)
    textAni(this.title, 1200)

    tween({
      from: { x: 60, y: -152, alpha: 0, rotation: 0 },
      to: { x: 480, y: 116, alpha: 1, rotation: 50 * Math.PI },
      duration: 300
    }).start({
      update: v => {
        this.ball.position.set(v.x, v.y)
        this.ball.rotation = v.rotation
      },
      complete: () => this.aniEnd = true
    }) 

    tween({
      from: { x: 450, y: 750, alpha: 0 },
      to: { x: 350, y: 140, alpha: 1 },
      duration: 300
    }).start(v => this.ma.position.set(v.x, v.y))

    delay(200).start({
      complete: () => {
        tween({
          from: { x: 780, y: 756, alpha: 0 },
          to: { x: 686, y: 165, alpha: 1 },
          duration: 300
        }).start({
          update: v => this.goalkeeper.position.set(v.x, v.y),
          complete: () => this.clicktip.animate()
        })
      }
    })
  }
  out() {
    this.clicktip.alpha = 0
    this.ma1.alpha = 0
    this.ma2.alpha = 1
    tween({
      from: { x: this.ma.x, y: this.ma.y, duration: 100 },
      to: { x: 290, y: 100  }
    }).start(v => this.ma.position.set(v.x, v.y))
    tween({
      from: { x: this.ma.x, y: this.ma.y, duration: 100 },
      to: { x: 290, y: 100  }
    }).start(v => this.ma.position.set(v.x, v.y))

    delay(200).start({
      complete: () => {
        tween({
          from: { x: this.ball.x, y: this.ball.y, rotation: 0 },
          to: { x: 600, y: 1000, rotation: 100 * Math.PI  },
          duration: 1000,
        }).start({
          update: v => {
            this.ball.position.set(v.x, v.y)
            this.ball.rotation = v.rotation
          },
          complete: () => events.emit('p2_out')
        })
      }
    })
  }
}


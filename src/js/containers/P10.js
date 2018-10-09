import { Container, Sprite, loader, filters } from 'pixi.js'
import { tween, delay } from 'popmotion'
import { textAni } from '../animationUtils'
import Wrapper from './Wrapper'
// import Clicktip from './Clicktip'
import imgs from '../imgs'
import events from '../events'

const { resources } = loader
const { BlurFilter } = filters

export default class P10 extends Container {
  constructor() {
    super()  
    this.initSprite()
    this.bindEvents()
    // this.animate()
  }
  initSprite() {
    this.bg = new Sprite(resources[imgs.p10_bg].texture)
    this.bg.alpha = 0
    this.addChild(this.bg)

    this.ball = new Sprite(resources[imgs.p10_ball].texture)
    this.ball.x = 902
    // this.ball.y = 140
    this.ball.y = - this.ball.height - 10
    this.ball.anchor.set(.5)
    this.addChild(this.ball)

    
    this.klose = new Sprite(resources[imgs.klose].texture)
    // this.klose.x = 300
    // this.klose.y = this.height + 10
    this.klose.x = 600
    this.klose.y = 416
    this.klose.anchor.set(.5)
    this.addChild(this.klose)

    this.kloseBlur = new BlurFilter()
    this.kloseBlur.blur = 1.2
    this.klose.filters = [this.kloseBlur]

    this.wrapper = new Wrapper()
    this.addChild(this.wrapper)

    this.year = new Sprite(resources[imgs.p10_year].texture)
    this.year.x = 44
    this.year.y = 44
    this.year.alpha = 0
    this.wrapper.addChild(this.year)

    this.title = new Sprite(resources[imgs.p10_title].texture)
    this.title.x = this.wrapper.width - this.title.width -144
    // this.title.y = 590
    this.title.y = 455
    this.title.alpha = 0
    this.wrapper.addChild(this.title)

    this.text = new Sprite(resources[imgs.p10_text].texture)
    this.text.x = this.wrapper.width - this.text.width - 138
    // this.text.y = 475
    this.text.y = 340
    this.text.alpha = 0
    this.wrapper.addChild(this.text)

    // this.clicktip = new Clicktip()
    // this.clicktip.x = 882
    // this.clicktip.y = 222
    // this.clicktip.scale.set(.5)
    // this.addChild(this.clicktip)

    // this.animate()
  }
  bindEvents() {
    this.outed = false 
    const clickHandler = () => {
      !this.outed && this.out()
      this.outed = true
    }

    // this.clicktip.interactive = true
    // this.clicktip.on('pointerdown', clickHandler)

    this.ball.interactive = true
    this.ball.on('pointerdown', clickHandler)
  }
  animate() {
    delay(2600).start({
      complete: () => {
        tween({
          from: { y: this.ball.y, rotation: 0 },
          to: { y: 240, rotation: 50 * Math.PI },
          duration: 300
        }).start({
          update: v => {
            this.ball.y = v.y
            this.ball.rotation = v.rotation
          },
          // complete: () => this.clicktip.animate()
        })
      }
    })

    delay(2800).start({
      complete: () => this.out()
    })

    tween({ from: 0, to: 1, duration: 1000 })
      .start(v => this.bg.alpha = v)

    // tween({
    //   from: { x: this.klose.x, y: this.klose.y, rotation: -Math.PI/2 },
    //   to: { x: 600, y: 416, rotation: 0 },
    //   duration: 300
    // }).start(v => {
    //   this.klose.x = v.x
    //   this.klose.y = v.y
    //   this.klose.rotation = v.rotation
    // })

    tween({ from: this.kloseBlur.blur, to: 0 , duration: 500 })
      .start(v => this.kloseBlur.blur = v)

    textAni(this.year, 500)
    textAni(this.text, 700)
    textAni(this.title, 1000)
  }
  out() {
    // this.clicktip.alpha = 0
    tween({
      from: {
        x: this.klose.x,
        y: this.klose.y,
        rotation: this.klose.rotation
      },
      to: {
        x: 764,
        y: 438,
        rotation: this.klose.rotation + Math.PI/10
      },
      duration: 80
    }).start(v => {
      this.klose.x = v.x
      this.klose.y = v.y
      this.klose.rotation = v.rotation
    })

    delay(60).start({
      complete: () => {
        tween({
          from: {
            x: this.ball.x,
            y: this.ball.y,
            rotation: this.ball.rotation,
            duration: 100
          },
          to: {
            x: this.width + 100,
            y: this.height/2 + 150,
            rotation: this.ball.rotation + Math.PI*50
          },
          duration: 400
        }).start({
          update: v => {
            this.ball.x = v.x
            this.ball.y = v.y
            this.ball.rotation = v.rotation
          },
          complete: () => events.emit('p10_out')
        })
      }
    })
  }
}


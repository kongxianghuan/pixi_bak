import { Container, Sprite, loader, extras } from 'pixi.js'
import Wrapper from './Wrapper'
import { tween, delay } from 'popmotion'
import { textAni } from '../animationUtils'
import imgs from '../imgs'
import events from '../events'

const { AnimatedSprite } = extras
const { resources } = loader

export default class P4 extends Container {
  constructor() {
    super()  
    this.initSprite()
    // this.animate()
  }
  initSprite() {
    this.bg = new Sprite(resources[imgs.p4_bg].texture)
    this.bg.alpha = 0
    this.addChild(this.bg)

    this.people = new Sprite(resources[imgs.p4_people].texture)
    this.people.x = 500
    this.people.y = 392
    this.addChild(this.people)

    this.mouthAni = new AnimatedSprite([
      resources[imgs.mouthclose].texture,
      resources[imgs.mouthopen].texture
    ])

    this.mouthAni.x = 276
    this.mouthAni.y = 112
    this.mouthAni.anchor.set(0.5)
    this.mouthAni.animationSpeed = .03

    this.beckhamContainer = new Container()
    this.beckhamContainer.x = 500
    this.beckhamContainer.y = 176

    this.beckham = new Sprite(resources[imgs.beckham].texture)
    this.beckhamContainer.addChild(this.beckham)
    this.beckhamContainer.addChild(this.mouthAni)
    this.addChild(this.beckhamContainer)

    this.wrapper = new Wrapper()
    this.addChild(this.wrapper)

    this.hand = new Sprite(resources[imgs.p4_hand].texture)
    this.hand.x = -270
    this.hand.y = 300
    this.hand.pivot.set(0, this.hand.height - 22)
    this.wrapper.addChild(this.hand)

    this.year = new Sprite(resources[imgs.p4_year].texture)
    this.year.x = this.wrapper.width - this.year.width - 58 + this.hand.x
    this.year.y = 58
    this.year.alpha = 0
    this.wrapper.addChild(this.year)

    this.title = new Sprite(resources[imgs.p4_title].texture)
    // this.title.x = 110
    // this.title.y = 602
    this.title.x = 298
    this.title.y = 440
    this.title.alpha = 0
    this.wrapper.addChild(this.title)

    this.text = new Sprite(resources[imgs.p4_text].texture)
    // this.text.x = 122
    // this.text.y = 482
    this.text.x = 310
    this.text.y = 320
    this.text.alpha = 0
    this.wrapper.addChild(this.text)
  }
  animate() {
    tween({ from: 0, to: 1, duration: 500 })
      .start(v => this.bg.alpha = v)    

    delay(800).start({
      complete: () => {
        tween({
          from: { x: this.hand.x, y: this.hand.y, rotation: -Math.PI/4 },
          to: { x: 0, y: 380, rotation: 0 },
          duration: 300
        }).start({
          update: v => {
            this.hand.position.set(v.x, v.y)
            this.hand.rotation = v.rotation
          },
          complete: () => this.mouthAni.play()
        })
      }
    })

    textAni(this.year, 1200)
    textAni(this.text, 1500)
    textAni(this.title, 1800)

    delay(4500).start({
      complete: () => this.out()
    })
  }
  out() {
    tween({
      from: { x: 0, scale: 1 },
      to: { x: -474, scale: 1.7 },
      duration: 1000 
    }).start({
      update: v => {
        this.scale.set(v.scale)
        this.position.x = v.x
      },
      // complete: () => events.emit('p4_out')
    })
    delay(1200).start({
      complete: () => events.emit('p4_out', 500, 0, 2000)
    })
  }
}


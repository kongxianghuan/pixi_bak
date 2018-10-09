import { Container, Sprite, loader, extras } from 'pixi.js'
import { textAni } from '../animationUtils'
import { tween, delay, easing } from 'popmotion'
import Wrapper from './Wrapper'
import imgs from '../imgs'
import events from '../events'

const { resources } = loader
const { AnimatedSprite } = extras

export default class P5 extends Container {
  constructor() {
    super()  
    this.initSprite()
    // this.animate()
  }
  initSprite() {
    this.bg = new Sprite(resources[imgs.p5_bg].texture)
    this.addChild(this.bg)

    this.mouthAni = new AnimatedSprite([
      resources[imgs.p5_mouth_open].texture,
      resources[imgs.p5_mouth_close].texture
    ])

    this.mouthAni.x = 396
    this.mouthAni.y = 336
    this.mouthAni.anchor.set(0.5)
    this.mouthAni.animationSpeed = .03

    this.peopleContainer = new Container()
    this.peopleContainer.x = 450
    this.peopleContainer.y = 163
    this.people = new Sprite(resources[imgs.p5_people].texture)
    this.peopleContainer.addChild(this.people)
    this.peopleContainer.addChild(this.mouthAni)
    this.addChild(this.peopleContainer)

    this.wrapper = new Wrapper()
    this.addChild(this.wrapper)
    
    this.year = new Sprite(resources[imgs.p5_year].texture)
    this.year.x = this.wrapper.width - this.year.width
    this.year.y = 0
    this.year.alpha = 0
    this.wrapper.addChild(this.year)

    this.title = new Sprite(resources[imgs.p5_title].texture)
    // this.title.x = 10
    // this.title.y = 450
    this.title.x = 0
    this.title.y = 250
    this.title.alpha = 0
    this.wrapper.addChild(this.title)

    this.text = new Sprite(resources[imgs.p5_text].texture)
    // this.text.x = 73
    // this.text.y = 594
    this.text.x = 28
    this.text.y = 364
    this.text.alpha = 0
    this.wrapper.addChild(this.text)
  }
  animate() {
    textAni(this.year, 700)
    textAni(this.title, 1000)
    textAni(this.text, 1200)

    this.mouthAni.play()

    delay(5000).start({
      complete: () => this.out()
    })
  }
  out() {
    tween({
      from: { x: this.people.x, alpha: 1 },
      to: { x: this.people.x + 400, alpha: 0 },
      duration: 1500
    }).start(v => {
      this.people.x = v.x
      this.people.alpha = v.alpha
    })

    const scale = 750 / 147
    tween({
      from: { x: 0, y: 0, scale: 1 },
      to: { x: -2446, y: -1777, scale: scale },
      duration: 2000,
      ease: easing.linear
    }).start({
      update: v => {
        this.position.set(v.x, v.y)
        this.scale.set(v.scale)
      },
      complete: () => events.emit('p5_out')
    })
  }
}


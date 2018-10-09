import { Container, Sprite, loader, extras } from 'pixi.js'
import { textAni } from '../animationUtils'
import { delay } from 'popmotion'
import Wrapper from './Wrapper'
import imgs from '../imgs'
import events from '../events'

const { resources } = loader
const { AnimatedSprite } = extras

export default class P12 extends Container {
  constructor() {
    super()  
    this.initSprite()
    // this.animate()
  }
  initSprite() {
    this.people = new AnimatedSprite([
      resources[imgs.p12_people1].texture,
      resources[imgs.p12_people2].texture
    ])
    this.people.anchor.set(0.5)
    this.people.animationSpeed = .03

    this.bg = new Sprite(resources[imgs.p12_bg].texture)
    this.addChild(this.bg)

    // this.people = new Sprite(resources[imgs.p12_people].texture)
    this.people = new AnimatedSprite([
      resources[imgs.p12_people1].texture,
      resources[imgs.p12_people2].texture
    ])
    this.people.animationSpeed = .03
    this.people.x = 140
    this.people.y = 74
    this.addChild(this.people)

    this.wrapper = new Wrapper()
    this.addChild(this.wrapper)

    this.year = new Sprite(resources[imgs.p12_year].texture)
    this.year.x = 44
    this.year.y = 44
    this.year.alpha  = 0
    this.wrapper.addChild(this.year)

    this.text = new Sprite(resources[imgs.p12_text].texture)
    this.text.x = this.wrapper.width - this.text.width - 30
    this.text.y = 117
    this.wrapper.addChild(this.text)
    this.text.alpha  = 0

    this.table = new Sprite(resources[imgs.p12_table].texture)
    this.table.x = 292
    this.table.y = 623
    this.wrapper.addChild(this.table)

  }
  animate() {
    this.people.play()
    textAni(this.year, 500)
    textAni(this.text, 1000)

    delay(5000).start({
      complete: () => {
        events.emit('p12_out', 1100, 0, 1800)
      }
    })
  }
}


import { Container, Sprite, loader } from 'pixi.js'
import { tween, delay } from 'popmotion'
import { textAni } from '../animationUtils'
import Wrapper from './Wrapper'
import imgs from '../imgs'
import events from '../events'
import { PAGE_WIDTH } from '../const';

const { resources } = loader

export default class P8 extends Container {
  constructor() {
    super()  
    this.initSprite()
  }
  initSprite() {
    this.bg = new Sprite(resources[imgs.p8_bg].texture)
    this.addChild(this.bg)

    this.wrapper = new Wrapper()
    this.addChild(this.wrapper)

    this.people = new Sprite(resources[imgs.p8_people].texture)
    this.people.x = 714
    this.people.y = 74
    this.addChild(this.people)

    this.zidane = new Sprite(resources[imgs.zidane].texture)
    this.zidane.x = 358
    this.zidane.y = 255
    this.addChild(this.zidane)

    this.year = new Sprite(resources[imgs.p8_year].texture)
    this.year.x = 44
    this.year.y = 44
    this.year.alpha = 0
    this.wrapper.addChild(this.year)

    this.title = new Sprite(resources[imgs.p8_title].texture)
    this.title.x = 186
    this.title.y = 386
    this.title.alpha = 0
    this.wrapper.addChild(this.title)

    this.text = new Sprite(resources[imgs.p8_text].texture)
    this.text.x = 184
    this.text.y = 240
    this.text.alpha = 0
    this.wrapper.addChild(this.text)
    
    // this.animate()
  }

  animate() {
    textAni(this.year, 300)
    textAni(this.text, 600)
    textAni(this.title, 800)

    delay(1800).start({
      complete: () => this.out()
    })
  }
  out() {
    const pageOffsetX = (PAGE_WIDTH - window.innerHeight) / 2
    const targetX = PAGE_WIDTH - this.people.width - pageOffsetX
    const toRight = () => {
      tween({ from: this.people.x, to: targetX, duration: 500 })
        .start({
          update: v => this.people.x = v,
          complete: () => events.emit('p9_switch')
        })
    }
    tween({ from: this.zidane.x, to: 458, duration: 200 })    
      .start({
        update: v => this.zidane.x = v,
        complete: () => toRight()
      })
  }
}

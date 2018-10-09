import { Container, Sprite, loader, extras } from 'pixi.js'
import { delay, tween } from 'popmotion'
import { textAni } from '../animationUtils'
import Wrapper from './Wrapper'
import imgs from '../imgs'
import events from '../events'

const { resources } = loader
const { AnimatedSprite } = extras

export default class P6 extends Container {
  constructor() {
    super()  
    this.initSprite()
  }
  initSprite() {
    this.bg = new Sprite(resources[imgs.p6_bg].texture)
    this.addChild(this.bg)

    this.wrapper = new Wrapper()
    this.addChild(this.wrapper)

    this.mouthAni = new AnimatedSprite([
      resources[imgs.p6_mouth_close].texture,
      resources[imgs.p6_mouth_open].texture
    ])

    this.mouthAni.x = 552
    this.mouthAni.y = 175
    this.mouthAni.anchor.set(0.5)
    this.mouthAni.animationSpeed = .03

    this.team = new Container()
    this.team.x = 194
    this.team.y = 143
    this.teamPeople = new Sprite(resources[imgs.team].texture)
    this.team.addChild(this.teamPeople)
    this.team.addChild(this.mouthAni)
    this.addChild(this.team)

    this.sloganAni = new AnimatedSprite([
      resources[imgs.p6_text_bg].texture,
      resources[imgs.p6_text].texture
    ])
    this.sloganAni.x = 702
    this.sloganAni.y = 124
    this.sloganAni.anchor.set(0.5)
    this.sloganAni.animationSpeed = .03
    this.addChild(this.sloganAni)

    this.year = new Sprite(resources[imgs.p6_year].texture)
    this.year.x = 44
    this.year.y = 44
    this.year.alpha = 0
    this.wrapper.addChild(this.year)

    this.title = new Sprite(resources[imgs.p6_title].texture)
    this.title.x = this.wrapper.width - this.title.width - 60
    this.title.y = 72
    this.title.alpha = 0
    this.wrapper.addChild(this.title)
  }
  animate() {
    textAni(this.year, 300)
    textAni(this.title, 300)

    delay(800).start({
      complete: () => {
        this.mouthAni.play()
        this.sloganAni.play()
      }
    })

    delay(4000).start({
      complete: () => this.switchIn()
    })
  }
  switchIn() {
    this.mouthAni.stop()
    this.sloganAni.gotoAndStop(1)
    tween({
      from: { y: this.team.y, alpha: 1 },
      to: { y: this.height + 10, alpha: 0 },
      duration: 800
    }).start({
      update: v => {
        this.team.y = v.y
        this.team.alpha = v.alpha
      },
      complete: () => events.emit('p6_switch')
    })
  }
}


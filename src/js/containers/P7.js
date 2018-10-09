import { Container, Sprite, loader } from 'pixi.js'
import { tween, delay, everyFrame } from 'popmotion'
import { textAni } from '../animationUtils'
import { OldFilmFilter } from 'pixi-filters'
import Wrapper from './Wrapper'
import imgs from '../imgs'
import events from '../events'

const { resources } = loader

export default class P7 extends Container {
  constructor() {
    super()  
    this.initSprite()
    // this.switchIn()
  }
  initSprite() {
    this.bg = new Sprite(resources[imgs.p7_bg].texture)
    this.bg.alpha = 0
    this.addChild(this.bg)

    this.oldFilmFilter = new OldFilmFilter({
      sepia: .1,
      vignetting: .2
    }, 0)

    this.tvCover = new Sprite(resources[imgs.p7_tv_cover].texture)
    this.tvCover.x = 491
    this.tvCover.y = 348
    this.bg.addChild(this.tvCover)

    this.dad = new Sprite(resources[imgs.p7_dad].texture)
    this.dad.x = 94
    this.dad.y = 86
    this.dad.alpha = 0
    this.addChild(this.dad)

    this.wrapper = new Wrapper()
    this.addChild(this.wrapper)

    this.child = new Sprite(resources[imgs.p7_child].texture)
    this.child.x = 692
    this.child.y = 134
    this.child.alpha = 0
    this.addChild(this.child)

    this.year = new Sprite(resources[imgs.p7_year].texture)
    this.year.x = 44
    this.year.y = 44
    this.year.alpha = 0
    this.wrapper.addChild(this.year)

    this.title = new Sprite(resources[imgs.p7_title].texture)
    this.title.x = 552
    this.title.y = 510
    this.title.alpha = 0
    this.addChild(this.title)

    this.text = new Sprite(resources[imgs.p7_text].texture)
    this.text.x = 550
    this.text.y = 585
    this.text.alpha = 0
    this.addChild(this.text)

  }
  tvToggle(cb) {
    this.tvCover.filters = [this.oldFilmFilter]
    this.aniFilter = everyFrame().start(() => {
      this.oldFilmFilter.seed = Math.random()
    })

    const tvFade = () => {
      tween({ from: 1, to: 0, duration: 500 })
        .start(v => this.tvCover.alpha = v)
    }

    delay(800).start({
      complete: () => {
        tvFade()
        this.aniFilter.stop()
      }
    })
    delay(1100).start({
      complete: () => {
        cb && cb()
      }
    }) 
  }
  switchIn() {
    tween({
      from: { x: this.dad.x - 40, alpha: 0 },
      to: { x: this.dad.x, alpha: 1 }
    }).start(v => {
      this.dad.x = v.x
      this.dad.alpha = v.alpha
    })
    tween({
      from: { x: this.child.x + 40, alpha: 0 },
      to: { x: this.child.x, alpha: 1 }
    }).start({
      update: v => {
        this.child.x = v.x
        this.child.alpha = v.alpha
      }
    })

    delay(800).start({
      complete: () => {
        tween({ from: 0, to: 1, duration: 1000 })
          .start({
            update: v => this.bg.alpha = v,
            complete: () => events.emit('p6_out')
          })
      }
    })

    textAni(this.year, 800)
    setTimeout(() => {
      tween({ 
        from: { y: 505, alpha: 0 },
        to: { y: 585, alpha: 1 },
        duration: 800
      }).start(v => {
        this.text.y = v.y
        this.text.alpha = v.alpha
      })
    }, 1100)
    setTimeout(() => {
      tween({ 
        from: { y: 430, alpha: 0 },
        to: { y: 510, alpha: 1 },
        duration: 800
      }).start(v => {
        this.title.y = v.y
        this.title.alpha = v.alpha
      })
    }, 1300)
    // textAni(this.title, 1100)
    // textAni(this.text, 1300)
  }
  animate() {
    delay(1800).start({
      complete: () => this.tvToggle()
    })
    delay(3500).start({
      complete: () => this.out()
    })
  }
  out() {
    tween({
      from: { x: 0, y: 0, scale: 1 },
      to: { x: -2285, y: -1630, scale: 4.7 },
      duration: 2000
    }).start({
      update: v => {
        this.x = v.x
        this.y = v.y
        this.scale.set(v.scale) 
      },
      complete: () => events.emit('p7_out', 800)
    })
  }
}


import { Container, Sprite, loader } from 'pixi.js'
import { delay, tween, easing, everyFrame } from 'popmotion'
import { filters } from 'pixi.js'
import { textAni } from '../animationUtils'
import { PAGE_WIDTH, PAGE_HEIGHT } from '../const'
import Wrapper from './Wrapper'
import imgs from '../imgs'
import events from '../events'
import ua from '../ua'
import { OldFilmFilter } from 'pixi-filters'

const { resources } = loader
const { BlurFilter } = filters

export default class P3 extends Container {
  constructor() {
    super()  
    this.initSprite()
    // this.animate()
    // this.pivot.set(this.width/2, this.height/2)
    // this.position.set(PAGE_WIDTH/2, this.height/2)
  }
  initSprite() {
    this.bg = new Sprite(resources[imgs.p3_bg].texture)
    this.addChild(this.bg)

    if (ua.isIos()) {
      this.blurFilter = new BlurFilter()
      this.blurFilter.blur = 3
      this.bg.filters = [this.blurFilter]
    }

    this.oldFilmFilter = new OldFilmFilter({
      sepia: .1,
      vignetting: .2
    }, 0)

    this.tvCover = new Sprite(resources[imgs.p3_tv_cover].texture)
    this.tvCover.x = 637
    this.tvCover.y = 235
    this.bg.addChild(this.tvCover)

    this.child = new Sprite(resources[imgs.p3_child].texture)
    this.child.x = 876
    this.child.y = 312
    this.child.alpha = 0
    this.addChild(this.child)

    this.dad = new Sprite(resources[imgs.p3_dad].texture)
    this.dad.x = 145
    this.dad.y = 196
    this.dad.alpha = 0
    this.addChild(this.dad)

    this.ball = new Sprite(resources[imgs.p3_ball].texture)
    this.ball.x = 519 
    this.ball.y = -100
    this.ball.pivot.set(this.ball.width/2, this.ball.height/2)
    this.addChild(this.ball)

    this.wrapper = new Wrapper()
    this.addChild(this.wrapper)

    this.year = new Sprite(resources[imgs.p3_year].texture)
    this.year.x = 42
    this.year.y = 46
    this.year.alpha = 0
    this.wrapper.addChild(this.year)

    this.title = new Sprite(resources[imgs.p3_title].texture)
    this.title.x = 600
    this.title.y = 440
    this.title.alpha = 0
    this.addChild(this.title)

    this.text = new Sprite(resources[imgs.p3_text].texture)
    this.text.x = 600
    this.text.y = 523
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
    delay(1300).start({
      complete: () => {
        cb && cb()
      }
    }) 
  }
  animate() {
    delay(700).start({
      complete: () => {
        tween({
          from: { y: -100, rotation: 0 },
          to: { y: 345, rotation: 50 * Math.PI },
          duration: 400
        }).start(v => {
          this.ball.y = v.y
          this.ball.rotation = v.rotation
        })
      }
    })
    tween({
      from: { x: this.dad.x - 40, alpha: 0 },
      to: { x: this.dad.x, alpha: 1 },
      duration: 1000
    }).start(v => {
      this.dad.x = v.x
      this.dad.alpha = v.alpha
    }) 
    delay(1200).start({
      complete: () => {
        tween({
          from: { x: this.child.x + 40, alpha: 0 },
          to: { x: this.child.x, alpha: 1 },
          duration: 1000
        }).start(v => {
          this.child.x = v.x
          this.child.alpha = v.alpha
        })
      }
    })

    textAni(this.year, 1400)
    textAni(this.title, 1600)
    textAni(this.text, 1800)

    delay(3000).start({
      complete: () => this.tvToggle()
    })
    delay(5500).start({
      complete: () => this.out()
    })
  }
  out() {
    const scale = 5
    tween({
      from: { scale: 1, x: this.x, y: this.y },
      to: { scale: scale, x: -2752, y: -1084 },
      duration: 1300,
      ease: easing.linear
    }).start({
      update: v => {
        this.scale.set(v.scale)
        this.position.set(v.x, v.y)
      },
      complete: () => events.emit('p3_out')
    })
    tween({ from: this.blurFilter.blur, to: 0, duration: 2000 })
      .start(v => this.blurFilter.blur = v)
  }
}


import { Container, Sprite, loader, filters } from 'pixi.js'
import { tween, delay, everyFrame } from 'popmotion'
import { PAGE_WIDTH, PAGE_HEIGHT } from '../const'
import { textAni } from '../animationUtils'
import { OldFilmFilter } from 'pixi-filters'
import Wrapper from './Wrapper'
import imgs from '../imgs'
import events from '../events'

const { resources } = loader
const { BlurFilter } = filters

export default class P9 extends Container {
  constructor() {
    super()  
    this.alpha = 0
    this.x = -PAGE_WIDTH

    this.initSprite()
    // this.switchIn()
    // this.animate()
  }
  initSprite() {
    this.scene1 = new Container()

    this.bg = new Sprite(resources[imgs.p9_bg].texture)
    this.scene1Blur = new BlurFilter()
    this.scene1Blur.blur = 3
    // this.bg.filters = [this.scene1Blur]
    this.scene1.addChild(this.bg)

    this.child = new Sprite(resources[imgs.p9_child].texture)
    this.child.x = 156
    this.child.y = 233
    this.scene1.addChild(this.child)
    this.addChild(this.scene1)

    if (this.scene1.width > window.innerHeight) {
      this.scene1.x -= (this.scene1.width - window.innerHeight) / 2
    }

    this.wrapper = new Wrapper()
    this.addChild(this.wrapper)

    this.year = new Sprite(resources[imgs.p9_year].texture)
    this.year.x = 44
    this.year.y = 44
    this.year.alpha = 0
    this.wrapper.addChild(this.year)

    this.dad = new Sprite(resources[imgs.p9_dad].texture)
    this.dad.x = 213
    this.dad.y = 432

    this.scene2Blur = new BlurFilter()
    this.scene2Blur.blur = 3
    this.scenebg = new Sprite(resources[imgs.p9_scene2].texture)
    // this.scenebg.filters = [this.scene2Blur]

    this.oldFilmFilter = new OldFilmFilter({
      sepia: .1,
      vignetting: .2
    }, 0)

    this.tvCover = new Sprite(resources[imgs.p9_tv_cover].texture)
    this.tvCover.x = 228
    this.tvCover.y = 328

    this.scene2 = new Container()
    this.scene2.addChild(this.scenebg)
    this.scene2.addChild(this.tvCover)
    this.scene2.addChild(this.dad)
    this.scene2.x = this.wrapper.width
    this.scene2.alpha = 0
    this.wrapper.addChild(this.scene2)


    this.title = new Sprite(resources[imgs.p9_title].texture)
    this.title.x = 282
    this.title.y = 72
    this.title.alpha = 0
    this.scene2.addChild(this.title)

    this.text = new Sprite(resources[imgs.p9_text].texture)
    this.text.x = 282
    this.text.y = 158
    this.text.alpha = 0
    this.scene2.addChild(this.text)
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
      from: { x: this.x, alpha: 0 },
      to: { x: 0, alpha: 1 },
      duration: 800
    }).start(v => {
      this.alpha = v.alpha
      this.x = v.x
    })

    delay(500).start({
      complete: () => events.emit('p8_out', 500)
    })
  }
  animate() {
    const page = this
    const positionxMax = window.innerHeight > PAGE_WIDTH ? PAGE_WIDTH : window.innerHeight
   
    delay(400).start({
      complete: () => {
        tween({
          from: { x: page.scene2.x, alpha: 0 },
          to: { x: positionxMax - page.scene2.width + 8, alpha: 1 },
          duration: 500
        }).start(v => {
          page.scene2.x = v.x
          page.scene2.alpha = v.alpha
        })
      }
    })
    textAni(this.year, 200)     
    textAni(this.title, 1000)
    textAni(this.text, 1200)

    delay(3000).start({
      complete: () => this.tvToggle()
    })

    delay(5000).start({
      complete: () => this.out()
    })
  }
  out() {
    const scale = 502 / 136
    const baseX = -3508
    const scaleX = window.innerHeight < PAGE_WIDTH 
      ? baseX + (this.scene1.width - window.innerHeight) / 2 * scale
      : baseX

    tween({
      from: { x: this.x, y: this.y, scale: 1 },
      to: { x: scaleX, y: -1146, scale: scale },
      duration: 2200
    }).start({
      update: v => {
        this.x = v.x
        this.y = v.y
        this.scale.set(v.scale)
      },
      complete: () => events.emit('p9_out')
    })

    tween({ from: this.dad.y, to: this.dad.y + 150, duration: 1200 })
      .start(v => this.dad.y = v)
    // tween({ from: this.scene2Blur.blur, to: 0 , duration: 1500 })
    //   .start(v => this.scene2Blur.blur = v)
    
  }
}


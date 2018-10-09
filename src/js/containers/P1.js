import { Container, Sprite, loader, Texture, Text, TextStyle } from 'pixi.js'
import { delay, tween, everyFrame, chain } from 'popmotion'
import { OldFilmFilter } from 'pixi-filters'
import { PAGE_WIDTH, PAGE_HEIGHT } from '../const';
import Clicktip from './Clicktip'
import imgs from '../imgs'
import events from '../events'

const { resources } = loader

export default class P1 extends Container {
  constructor() {
    super()  
    this.initSprite()
    this.bindEvents()
  }
  initSprite() {
    this.bg = new Sprite(resources[imgs.p1_bg].texture)
    this.addChild(this.bg)

    const textStyle = new TextStyle({
      fontSize: '24px',
      fill: ['0x554455']
    })

    this.tvRect = new Sprite(resources[imgs.p1_tv].texture)
    this.tv = new Container()
    this.tv.x = 383
    this.tv.y = 258
    this.tv.addChild(this.tvRect)
    this.addChild(this.tv)

    this.musicCopyright = new Text('music by audionautix.com', new TextStyle({
      fontSize: 20,
      fill: ['0xffffff']
    }))
    this.musicCopyright.anchor.set(.5)
    this.musicCopyright.x = 610
    this.musicCopyright.y = 718
    this.addChild(this.musicCopyright)

    this.lockPhone = new Sprite(resources[imgs.lock_phone].texture)
    this.lockPhone.anchor.set(.5)
    this.lockPhone.scale.set(.6)
    this.lockPhone.x = this.tvRect.width / 2
    this.lockPhone.y = this.tvRect.height / 2 - 30
    this.tv.addChild(this.lockPhone)

    this.tvText = new Text('请锁定“横屏”模式观看', textStyle)
    this.tvText.anchor.set(.5)
    this.tvText.x = this.tvRect.width / 2
    this.tvText.y = this.tvRect.height / 2 + 60
    this.tv.addChild(this.tvText)

    this.clickArea = new Sprite(Texture.WHITE)
    this.clickArea.interactive = true
    this.clickArea.width = window.innerHeight
    this.clickArea.height = window.innerWidth
    this.clickArea.tint = '0xffffff'
    this.clickArea.alpha = 0
    this.clickArea.width = 656
    this.clickArea.height = 430
    this.clickArea.x = 340
    this.clickArea.y = 214

    this.addChild(this.clickArea)
    this.pivot.set(PAGE_WIDTH/2, PAGE_HEIGHT/2)
    this.position.set(this.width/2, this.height/2)

    this.clicktip = new Clicktip()
    this.clicktip.x = 880
    this.clicktip.y = 540
    this.addChild(this.clicktip)
    
    this.clicktip.animate()
  }
  animate() {
    this.ani = {}
    this.lockPhone.alpha = 0
    this.tvText.alpha = 0
    this.ani.filter = everyFrame().start(() => {
      this.oldFilmFilter.seed = Math.random()
    })
  }
  bindEvents() {
    this.clickArea.once('pointerdown', () => this.out())
  }
  out() {
    this.clicktip.alpha = 0
    this.oldFilmFilter = new OldFilmFilter({
      sepia: .1,
      vignetting: .1
    }, 0)

    this.tvPic = new Sprite(resources[imgs.p1_pic].texture)
    this.tvPic.filters = [this.oldFilmFilter]
    this.tv.addChild(this.tvPic)
    this.animate()

    const scale = this.width / this.tv.width
    const { x, y } = this.position

    delay(1000).start({
      complete: () => {
        tween({
          from: { x: x, y: y, scale: 1 },
          to: { x: x + 173, y: y - 170, scale },
          duration: 1500
        }).start({
          update: v => {
            this.position.set(v.x, v.y)
            this.scale.set(v.scale)
          },
          complete: () => {
            events.emit('p1_out')
          }
        })
      }
    })

  }

}


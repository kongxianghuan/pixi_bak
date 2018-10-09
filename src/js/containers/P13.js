import { Container, Sprite, loader, Texture } from 'pixi.js'
import { PAGE_WIDTH, PAGE_HEIGHT } from '../const'
import { textAni } from '../animationUtils'
import { tween } from 'popmotion'
import DialogShare from '../DialogShare'
import imgs from '../imgs'

const { resources } = loader

export default class P13 extends Container {
  constructor() {
    super()  
    this.initSprite()
    this.bindEvents()
    // this.animate()
    this.dialogShare = new DialogShare()
  }
  initSprite() {

    this.bg = new Sprite(Texture.WHITE)
    this.bg.width = PAGE_WIDTH
    this.bg.height = PAGE_HEIGHT
    this.bg.tint = '0xfff8eb'
    this.addChild(this.bg)

    this.logo = new Sprite(resources[imgs.p13_logo].texture)
    this.logo.x = 120
    this.logo.y = 200
    this.logo.alpha = 0
    this.logo.scale.set(.95)
    this.addChild(this.logo)

    this.text1 = new Sprite(resources[imgs.p13_text1].texture)
    this.text1.x = 627
    this.text1.y = 212
    this.text1.alpha  = 0
    this.addChild(this.text1)

    this.text2 = new Sprite(resources[imgs.p13_text2].texture)
    this.text2.x = 630
    this.text2.y = 324
    this.text2.alpha  = 0
    this.addChild(this.text2)

    this.text3 = new Sprite(resources[imgs.p13_text3].texture)
    this.text3.x = 622
    this.text3.y = 406
    this.text3.alpha  = 0
    this.addChild(this.text3)

    this.btnShare = new Sprite(resources[imgs.p13_btn_share].texture)
    this.btnShare.x = 876
    this.btnShare.y = 586
    this.addChild(this.btnShare)

    this.btnHome = new Sprite(resources[imgs.p13_btn_home].texture)
    this.btnHome.x = 536
    this.btnHome.y = 586
    this.addChild(this.btnHome)

    this.btnReplay = new Sprite(resources[imgs.p13_btn_replay].texture)
    this.btnReplay.x = 188
    this.btnReplay.y = 586
    this.addChild(this.btnReplay)

    // this.dialogShare = new DailogShare()
    // this.addChild(this.dialogShare)
  }
  animate() {
    tween({
      from: { x: this.logo.x - 40, alpha: 0 },
      to: { x: this.logo.x, alpha: 1 },
      duration: 300
    }).start(v => {
      this.logo.x = v.x
      this.logo.alpha = v.alpha
    })
    textAni(this.text1, 500)
    textAni(this.text2, 700)
    textAni(this.text3, 900)
  }
  bindEvents() {
    const homepage = 'https://www.emaotai.cn/'

    this.btnHome.interactive = true
    this.btnHome.on('pointerdown', () => window.location.href = homepage)

    this.btnReplay.interactive = true
    this.btnReplay.on('pointerdown', () => {
      window.location.href = `${location.href}?v=${Date.now()}`
    })

    this.btnShare.interactive = true
    this.btnShare.on('pointerdown', () => this.dialogShare.show())
  }
}


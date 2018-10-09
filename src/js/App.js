import * as PIXI from 'pixi.js'
import Loading from './containers/Loading'
import { PAGE_WIDTH, PAGE_HEIGHT } from './const'
import P1 from './containers/P1'
import P2 from './containers/P2'
import P3 from './containers/P3'
import P4 from './containers/P4'
import P5 from './containers/P5'
import P6 from './containers/P6'
import P7 from './containers/P7'
import P8 from './containers/P8'
import P9 from './containers/P9'
import P10 from './containers/P10'
import P11 from './containers/P11' 
import P12 from './containers/P12'
import P13 from './containers/P13'
import Animator from './Animator'

PIXI.settings.PRECISION_FRAGMENT = 'highp'

const dev = location.search.substr(1) === 'dev=1'

export default class App extends PIXI.Application {
  constructor() {
    const container = document.querySelector('#app')

    super({ width: PAGE_HEIGHT, height: PAGE_WIDTH})

    container.appendChild(this.view)

    this.loading = new Loading()
    this.stage.addChildAt(this.loading, 0)
    this.stage.pivot.set(PAGE_WIDTH / 2, PAGE_HEIGHT / 2)
    this.stage.position.set(PAGE_HEIGHT / 2, PAGE_WIDTH / 2)
    this.stage.rotation = Math.PI / 2

    if (dev) {
      let scale = 700 / PAGE_WIDTH
      this.stage.scale.set(scale)
      this.stage.rotation = 0
    }
  }
  init() {
    const p1 = new P1()
    const p2 = new P2()
    const p3 = new P3()
    const p4 = new P4()
    const p5 = new P5()
    const p6 = new P6()
    const p7 = new P7()
    const p8 = new P8()
    const p9 = new P9()
    const p10 = new P10()
    const p11 = new P11()
    const p12 = new P12()
    const p13 = new P13()

    this.pages = {
      p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13
    }
    
    for (let pageName in this.pages) {
      this.pages[pageName].name = pageName
    }

    this.animator = new Animator({
      stage: this.stage,
      pages: this.pages
    })

    this.stage.addChildAt(this.pages.p1, 0)
    this.loading.out(() => this.stage.removeChild(this.loading))
  }
  load(manifest, callback) {
    PIXI.loader
      .add(manifest)
      .on('progress', (loader, resource) => {
        let number = Math.round(loader.progress) + '%'
        this.loading.update(number)
      })
      .load(() => {
        this.init()
        callback && callback()
      })
  }
}


import events from './events'
import { tween, delay } from 'popmotion'

export default class Animator {
  constructor(opts) {
    this.stage = opts.stage
    this.pages = opts.pages
    this.listen()
  }
  removePage(page, duration = 1000) {
    tween({ from: 1, to: 0, duration: duration }).start({
      update: v => page.alpha = v,
      complete: () => this.stage.removeChild(page)
    })
  }
  listen() {
    for (let pageName in this.pages) {
      const curIndex = parseInt(pageName.substr(1))
      const curPage = this.pages[`p${curIndex}`]
      const nextIndex = curIndex + 1
      const nextPage = this.pages[`p${nextIndex}`]

      events.once(`${pageName}_out`, (delayTime = 30, zindex = 0, duration = 1000) => {
        if (!this.stage.getChildByName(`p${nextIndex}`)) {
          this.stage.addChildAt(nextPage, zindex)
        }
        this.removePage(curPage, duration)
        delay(delayTime).start({
          complete: () => nextPage.animate()
        })
      })

      events.once('p6_switch', () => {
        this.stage.addChildAt(this.pages.p7, 1)
        this.pages.p7.switchIn()
      })

      events.once('p9_switch', () => {
        this.stage.addChildAt(this.pages.p9, 1)
        this.pages.p9.switchIn()
      })
    }
  }
}

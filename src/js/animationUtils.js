import { delay, tween } from 'popmotion'

export const textAni = (text, delayTime = 0, offset = 20) => {
  delay(delayTime).start({
    complete: () => {
      tween({
        from: { x: text.x, y: text.y + offset, alpha: 0 },
        to: { x: text.x, y: text.y, alpha: 1 },
        duration: 800
      }).start(v => {
        text.position.set(v.x, v.y)
        text.alpha = v.alpha
      })
    }
  })
}

export default {
  isWx: () => {
    let ua = window.navigator.userAgent.toLowerCase()
    return /micromessenger/i.test(ua)
  },
  isIos: () => /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
}
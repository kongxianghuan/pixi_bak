import ua from './ua'

export default class DialogShare {
  constructor() {
    this.elem = document.querySelector('.dialog-share')
    this.type = ua.isWx() ? 'wx' : 'app'
    this.elem.classList.add(this.type) 
    this.elem.style.display = 'block'

    this.bindEvents()
  }
  show() {
    this.elem.classList.add('active')
  }
  hide() {
    this.elem.classList.remove('active')
  }
  bindEvents() {
    this.elem.addEventListener('touchend', () => this.hide())
  }
}
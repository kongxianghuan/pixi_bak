import $ from 'sohu_public/vendor/zepto'

class BGM {
    constructor() {
        this.init()
        this.bindEvents()
    }
    init() {
        this.player = new Audio()
        this.player.id = 'bgm'
        this.player.loop = true
        this.player.autoplay = true
        this.player.src = require('../media/bgm.mp3')
        this.player.wrapper = $('.bgm-wrap')[0]
        $(this.player.wrapper).append(this.player)
    }
    play = () => {
        this.player.play()
        this.loop()
        $(this.player.wrapper).removeClass('pause')
    }
    stop = (program) => {
        this.player.pause()
        if (!program) {
          $(this.player.wrapper).addClass('pause')
        }
    }
    loop() {
        $(this.player).on('ended', () => this.player.play())
    }
    bindEvents = () => {
        let bgm = this
        $(this.player.wrapper).on('click', () => {
            if (this.player.paused) {
                this.play()
                this.userPause = false
            } else {
                this.stop()
                this.userPause = true
            }
        })
    }
}

export default new BGM()
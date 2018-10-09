import '../style/index.scss'
import wxshare from 'sohu_public/components/wxshare'
import bgm from './BGM'
import imgs from './imgs'
import App from './App'
import orientTip from './orientTip'

const shareConf = {
  titleShare : document.title,
  urlShare: location.href,
  picShare: 'https://img.gd.sohu.com/norefer/moutai/20180610/0.jpg',
  txtShare: '今年父亲节，共享这一“杯”！'
}
wxshare(shareConf, () => bgm.play())

const imgsArr = []
for (let i in imgs) {
  imgsArr.push(imgs[i])
}

const app = new App()
window.app = app
app.load(imgsArr, () => { })

window.onload = () => {
  orientTip()
}

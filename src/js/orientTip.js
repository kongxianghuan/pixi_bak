import { dilate } from "popmotion/lib/calc";

const tip = () => {
  const dialogTip = document.querySelector('.dialog-tip')
  dialogTip.style.display = 'block'
  window.onresize = () => {
    const orient = window.orientation
    if (orient !== 0) {
      dialogTip.classList.add('active')
    } else {
      dialogTip.classList.remove('active')
    }
  }
}

export default tip
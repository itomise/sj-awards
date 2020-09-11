const req = require.context('../pages/', true, /\.pug/)
req.keys().forEach((fileName) => {
  req(fileName)
})
import '../styles/main.scss'

if (module.hot) {
  module.hot.accept(console.error)
  module.hot.dispose(() => {
    window.location.reload()
  })
}

import * as THREE from 'three'
window.THREE = THREE
import { onxrloaded } from './modules/sample'

const load = () => {
  XRExtras.Loading.showLoading({ onxrloaded })
}
window.onload = () => {
  window.XRExtras ? load() : window.addEventListener('xrextrasloaded', load)
}

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
import { PipelineModule } from './modules/pipelineModule'

class XRMain {
  constructor() {
    this.pipelineModule = new PipelineModule()

    if (window.XRExtras) {
      XRExtras.Loading.showLoading({ onxrloaded: this.onxrloaded.bind(this) })
    } else {
      window.addEventListener('xrextrasloaded', this.onxrloaded.bind(this))
    }
  }

  onxrloaded() {
    // アプリがイメージターゲットでしかワールドを形成しない場合、
    // disableWorldTracking を true にすることでパフォーマンスを向上できる
    XR8.xrController().configure({ disableWorldTracking: true })
    XR8.addCameraPipelineModules([
      // Add camera pipeline modules.
      // Existing pipeline modules.
      XR8.GlTextureRenderer.pipelineModule(), // Draws the camera feed.
      XR8.Threejs.pipelineModule(), // Creates a ThreeJS AR Scene.
      XR8.XrController.pipelineModule(), // Enables SLAM tracking.
      XRExtras.AlmostThere.pipelineModule(), // Detects unsupported browsers and gives hints.
      XRExtras.FullWindowCanvas.pipelineModule(), // Modifies the canvas to fill the window.
      XRExtras.Loading.pipelineModule(), // Manages the loading screen on startup.
      XRExtras.RuntimeError.pipelineModule(), // Shows an error image on runtime error.
      // Custom pipeline modules.
      this.pipelineModule.getModule(), // Draws a frame around detected image targets.
    ])

    XR8.run({ canvas: document.getElementById('canvas') })
  }
}

window.addEventListener('load', () => {
  new XRMain()
})

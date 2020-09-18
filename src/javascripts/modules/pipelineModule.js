import * as THREE from 'three'
import { VideoMesh } from './videoMesh'

class PipelineModule {
  constructor() {
    this.videoFile = `${process.env.PUBLIC_URL}/video/main.mp4`

    this.video
    this.videoObj

    this.module = {
      name: 'threejs-flyer',
      onStart: this.onStart.bind(this),
      listeners: [
        { event: 'reality.imagefound', process: this.showTarget.bind(this) },
        { event: 'reality.imageupdated', process: this.showTarget.bind(this) },
        { event: 'reality.imagelost', process: this.hideTarget.bind(this) },
      ],
    }
  }

  getModule() {
    return this.module
  }

  // Sceneを初期化。 カメラはXR three.js
  initXrScene({ scene, camera }) {
    console.log('initXrScene')

    this.video = document.createElement('video')
    this.video.src = this.videoFile
    this.video.setAttribute('preload', 'auto')
    this.video.setAttribute('loop', '')
    this.video.setAttribute('muted', '')
    this.video.setAttribute('playsinline', '')
    this.video.setAttribute('webkit-playsinline', '')

    const texture = new THREE.VideoTexture(this.video)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.format = THREE.RGBFormat
    texture.crossOrigin = 'anonymous'

    const mesh = new VideoMesh()
    mesh.init(texture)

    this.videoObj = mesh.obj

    // ターゲットが検出されるまで非表示に
    this.videoObj.visible = false
    scene.add(this.videoObj)
    this.video.load()

    // アンビエントライトを追加
    scene.add(new THREE.AmbientLight(0x404040, 5))

    // 最初のカメラ位置を設定。y=0より大きくなければならない
    camera.position.set(0, 3, 0)
  }

  // スタート時にカメラ位置を設定
  onStart({ canvas }) {
    // XRからThree.jsの scene を取得
    const { scene, camera } = XR8.Threejs.xrScene()

    // sceneにコンテンツを追加、カメラの設定
    this.initXrScene({ scene, camera })

    // XRコントローラの位置とカメラのパラメータを同期
    XR8.XrController.updateCameraProjectionMatrix({
      origin: camera.position,
      facing: camera.quaternion,
    })
  }

  // コンテンツを画像ターゲットの上に配置
  showTarget({ detail }) {
    // detail.name で 8th wallで登録した画像の名前をとれる

    this.videoObj.position.copy(detail.position)
    this.videoObj.quaternion.copy(detail.rotation)
    this.videoObj.scale.set(detail.scale, detail.scale, detail.scale)
    this.videoObj.visible = true
    this.video.play()

    // if (detail.name === 'video-target') {
    //   this.videoObj.position.copy(detail.position)
    //   this.videoObj.quaternion.copy(detail.rotation)
    //   this.videoObj.scale.set(detail.scale, detail.scale, detail.scale)
    //   this.videoObj.visible = true
    //   this.video.play()
    // }
  }

  // マーカーが検出されなくなったら画像フレームを非表示に
  hideTarget({ detail }) {
    if (detail.name === 'video-target') {
      this.video.pause()
      this.videoObj.visible = false
    }
  }
}

export { PipelineModule }

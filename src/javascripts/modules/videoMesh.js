import * as THREE from 'three'
import vs from './glsl/video.vs'
import fs from './glsl/video.fs'

class VideoMesh {
  constructor() {
    this.uniforms = {
      tex: {
        type: 't',
        value: null,
      },
    }
    this.obj
  }

  init(texture) {
    this.uniforms.tex.value = texture
    this.obj = this.createObj()
  }

  createObj() {
    this.geometry = new THREE.PlaneBufferGeometry(0.75, 1)

    this.material = new THREE.ShaderMaterial({
      vertexShader: vs,
      fragmentShader: fs,
      uniforms: this.uniforms,
      transparent: true,
    })

    const mat = new THREE.MeshBasicMaterial({ map: this.uniforms.tex.value })
    return new THREE.Mesh(this.geometry, this.material)
  }
}

export { VideoMesh }

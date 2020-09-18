precision highp float;

uniform sampler2D tex;

varying vec2 vUv;

void main() {

  vec4 dest = texture2D(tex, vUv);

  if (dest.b > 0.8) {
    dest.a = 0.0;
  }

  gl_FragColor = dest;

}

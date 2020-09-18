precision highp float;

uniform sampler2D tex;

varying vec2 vUv;

void main() {

  vec4 dest = texture2D(tex, vUv);

  dest.a = step(dest.b, 0.8);

  gl_FragColor = dest;

}

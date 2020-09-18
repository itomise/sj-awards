/*! For license information please see main.js.LICENSE */
!function(e){function t(t){for(var i,a,s=t[0],l=t[1],u=t[2],c=0,v=[];c<s.length;c++)a=s[c],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&v.push(r[a][0]),r[a]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);for(d&&d(t);v.length;)v.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,s=1;s<n.length;s++){var l=n[s];0!==r[l]&&(i=!1)}i&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var i={},r={0:0},o=[];function a(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=i,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var s=window.webpackJsonp=window.webpackJsonp||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var d=l;o.push([4,1]),n()}([,function(e,t,n){var i={"./index.pug":2};function r(e){var t=o(e);return n(t)}function o(e){if(!n.o(i,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return i[e]}r.keys=function(){return Object.keys(i)},r.resolve=o,e.exports=r,r.id=1},function(e,t,n){e.exports=n.p+"index.html"},function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(3);var i=n(0);function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.uniforms={tex:{type:"t",value:null}},this.obj}var t,n,o;return t=e,(n=[{key:"init",value:function(e){this.uniforms.tex.value=e,this.obj=this.createObj()}},{key:"createObj",value:function(){return this.geometry=new i.PlaneBufferGeometry(.75,1),this.material=new i.ShaderMaterial({vertexShader:"varying vec2 vUv;\n\n// uniform mat4 modelViewMatrix;\n// uniform mat4 projectionMatrix;\n\n// attribute vec3 pPosition;\n\n// attribute vec3 position;\n\n// attribute vec2 uv;\n\nvoid main() {\n  vUv = uv;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader:"precision highp float;\n\nuniform sampler2D tex;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n  vec4 dest = texture2D(tex, vUv);\n\n  if (dest.b > 0.8) {\n    dest.a = 0.0;\n  }\n\n  gl_FragColor = dest;\n\n}\n",uniforms:this.uniforms,transparent:!0}),new i.MeshBasicMaterial({map:this.uniforms.tex.value}),new i.Mesh(this.geometry,this.material)}}])&&r(t.prototype,n),o&&r(t,o),e}();function a(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.videoFile="".concat("/sj-awards","/video/main.mp4"),this.video,this.videoObj,this.module={name:"threejs-flyer",onStart:this.onStart.bind(this),listeners:[{event:"reality.imagefound",process:this.showTarget.bind(this)},{event:"reality.imageupdated",process:this.showTarget.bind(this)},{event:"reality.imagelost",process:this.hideTarget.bind(this)}]}}var t,n,r;return t=e,(n=[{key:"getModule",value:function(){return this.module}},{key:"initXrScene",value:function(e){var t=e.scene,n=e.camera;console.log("initXrScene"),this.video=document.createElement("video"),this.video.src=this.videoFile,this.video.setAttribute("preload","auto"),this.video.setAttribute("loop",""),this.video.setAttribute("muted",""),this.video.setAttribute("playsinline",""),this.video.setAttribute("webkit-playsinline","");var r=new i.VideoTexture(this.video);r.minFilter=i.LinearFilter,r.magFilter=i.LinearFilter,r.format=i.RGBFormat,r.crossOrigin="anonymous";var a=new o;a.init(r),this.videoObj=a.obj,this.videoObj.visible=!1,t.add(this.videoObj),this.video.load(),t.add(new i.AmbientLight(4210752,5)),n.position.set(0,3,0)}},{key:"onStart",value:function(e){e.canvas;var t=XR8.Threejs.xrScene(),n=t.scene,i=t.camera;this.initXrScene({scene:n,camera:i}),XR8.XrController.updateCameraProjectionMatrix({origin:i.position,facing:i.quaternion})}},{key:"showTarget",value:function(e){var t=e.detail;this.videoObj.position.copy(t.position),this.videoObj.quaternion.copy(t.rotation),this.videoObj.scale.set(t.scale,t.scale,t.scale),this.videoObj.visible=!0,this.video.play()}},{key:"hideTarget",value:function(e){"video-target"===e.detail.name&&(this.video.pause(),this.videoObj.visible=!1)}}])&&a(t.prototype,n),r&&a(t,r),e}();function l(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var u=n(1);u.keys().forEach((function(e){u(e)})),window.THREE=i;var d=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.pipelineModule=new s,window.XRExtras?XRExtras.Loading.showLoading({onxrloaded:this.onxrloaded.bind(this)}):window.addEventListener("xrextrasloaded",this.onxrloaded.bind(this))}var t,n,i;return t=e,(n=[{key:"onxrloaded",value:function(){XR8.xrController().configure({disableWorldTracking:!0}),XR8.addCameraPipelineModules([XR8.GlTextureRenderer.pipelineModule(),XR8.Threejs.pipelineModule(),XR8.XrController.pipelineModule(),XRExtras.AlmostThere.pipelineModule(),XRExtras.FullWindowCanvas.pipelineModule(),XRExtras.Loading.pipelineModule(),XRExtras.RuntimeError.pipelineModule(),this.pipelineModule.getModule()]),XR8.run({canvas:document.getElementById("canvas")})}}])&&l(t.prototype,n),i&&l(t,i),e}();window.addEventListener("load",(function(){new d}))}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[128],{MnbF:function(e,t,n){"use strict";n.r(t),n.d(t,"startTapClick",function(){return o});var i=n("/Sew");function o(e){var t,n,o=10*-s,u=0,d=!1,f=new WeakMap;function v(e){o=Object(i.a)(e),b(e)}function l(){clearTimeout(n),t&&(L(!1),t=void 0),d=!0}function p(e){t||(d=!1,w(function(e){if(!e.composedPath)return e.target.closest("[ion-activable]");for(var t=e.composedPath(),n=0;n<t.length-2;n++){var i=t[n];if(i.hasAttribute&&i.hasAttribute("ion-activable"))return i}}(e),e))}function b(e){w(void 0,e),d&&e.cancelable&&e.preventDefault()}function w(e,o){if(!e||e!==t){clearTimeout(n),n=void 0;var c=Object(i.i)(o),s=c.x,u=c.y;if(t){if(f.has(t))throw new Error("internal error");t.classList.contains(a)||h(t,s,u),L(!0)}if(e){var d=f.get(e);d&&(clearTimeout(d),f.delete(e)),e.classList.remove(a),n=setTimeout(function(){h(e,s,u),n=void 0},r)}t=e}}function h(e,t,n){u=Date.now(),e.classList.add(a);var i=function(e){if(e.shadowRoot){var t=e.shadowRoot.querySelector("ion-ripple-effect");if(t)return t}return e.querySelector("ion-ripple-effect")}(e);i&&i.addRipple&&i.addRipple(t,n)}function L(e){var n=t;if(n){var i=c-Date.now()+u;if(e&&i>0){var o=setTimeout(function(){n.classList.remove(a),f.delete(n)},c);f.set(n,o)}else n.classList.remove(a)}}e.body.addEventListener("click",function(e){d&&(e.preventDefault(),e.stopPropagation())},!0),e.body.addEventListener("ionScrollStart",l),e.body.addEventListener("ionGestureCaptured",l),e.addEventListener("touchstart",function(e){o=Object(i.a)(e),p(e)},!0),e.addEventListener("touchcancel",v,!0),e.addEventListener("touchend",v,!0),e.addEventListener("mousedown",function(e){var t=Object(i.a)(e)-s;o<t&&p(e)},!0),e.addEventListener("mouseup",function(e){var t=Object(i.a)(e)-s;o<t&&b(e)},!0)}var a="activated",r=200,c=200,s=2500}}]);
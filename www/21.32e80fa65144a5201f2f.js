(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{u6a0:function(t,e,n){"use strict";n.r(e),n.d(e,"IonRoute",function(){return a}),n.d(e,"IonRouteRedirect",function(){return u}),n.d(e,"IonRouter",function(){return C});var r=n("/Sew"),o=function(t,e,n,r){return new(n||(n=Promise))(function(o,i){function a(t){try{s(r.next(t))}catch(t){i(t)}}function u(t){try{s(r.throw(t))}catch(t){i(t)}}function s(t){t.done?o(t.value):new n(function(e){e(t.value)}).then(a,u)}s((r=r.apply(t,e||[])).next())})},i=function(t,e){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}},a=function(){function t(){this.url=""}return t.prototype.onUpdate=function(t){this.ionRouteDataChanged.emit(t)},t.prototype.onComponentProps=function(t,e){if(t!==e){var n=t?Object.keys(t):[],r=e?Object.keys(e):[];if(n.length===r.length)for(var o=0,i=n;o<i.length;o++){var a=i[o];if(t[a]!==e[a])return void this.onUpdate(t)}else this.onUpdate(t)}},t.prototype.componentDidLoad=function(){this.ionRouteDataChanged.emit()},t.prototype.componentDidUnload=function(){this.ionRouteDataChanged.emit()},Object.defineProperty(t,"is",{get:function(){return"ion-route"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{component:{type:String,attr:"component",watchCallbacks:["onUpdate"]},componentProps:{type:"Any",attr:"component-props",watchCallbacks:["onComponentProps"]},url:{type:String,attr:"url",watchCallbacks:["onUpdate"]}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"ionRouteDataChanged",method:"ionRouteDataChanged",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),t}(),u=function(){function t(){this.from=""}return t.prototype.componentDidLoad=function(){this.ionRouteRedirectChanged.emit()},t.prototype.componentDidUnload=function(){this.ionRouteRedirectChanged.emit()},t.prototype.componentDidUpdate=function(){this.ionRouteRedirectChanged.emit()},Object.defineProperty(t,"is",{get:function(){return"ion-route-redirect"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{from:{type:String,attr:"from"},to:{type:String,attr:"to"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"ionRouteRedirectChanged",method:"ionRouteRedirectChanged",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),t}();function s(t){return"/"+t.filter(function(t){return t.length>0}).join("/")}function c(t){if(null==t)return[""];var e=t.split("/").map(function(t){return t.trim()}).filter(function(t){return t.length>0});return 0===e.length?[""]:e}var h=":not([no-router]) ion-nav, :not([no-router]) ion-tabs, :not([no-router]) ion-router-outlet";function l(t){if(t)return t.matches(h)?t:t.querySelector(h)||void 0}function f(t,e){return e.find(function(e){return function(t,e){var n=e.from;if(void 0===e.to)return!1;if(n.length>t.length)return!1;for(var r=0;r<n.length;r++){var o=n[r];if("*"===o)return!0;if(o!==t[r])return!1}return n.length===t.length}(t,e)})}function p(t,e){for(var n=Math.min(t.length,e.length),r=0;r<n&&t[r].toLowerCase()===e[r].id;r++);return r}function d(t,e){for(var n,r=new v(t),o=!1,i=0;i<e.length;i++){var a=e[i].path;if(""===a[0])o=!0;else{for(var u=0,s=a;u<s.length;u++){var c=s[u],h=r.next();if(":"===c[0]){if(""===h)return null;((n=n||[])[i]||(n[i]={}))[c.slice(1)]=h}else if(h!==c)return null}o=!1}}return o&&o!==(""===r.next())?null:n?e.map(function(t,e){return{id:t.id,path:t.path,params:g(t.params,n[e])}}):e}function g(t,e){return!t&&e?e:t&&!e?t:t&&e?Object.assign({},t,e):void 0}function m(t){for(var e=1,n=1,r=0,o=t;r<o.length;r++)for(var i=0,a=o[r].path;i<a.length;i++){var u=a[i];":"===u[0]?e+=Math.pow(1,n):""!==u&&(e+=Math.pow(2,n)),n++}return e}var v=function(){function t(t){this.path=t.slice()}return t.prototype.next=function(){return this.path.length>0?this.path.shift():""},t}();function b(t){return Array.from(t.children).filter(function(t){return"ION-ROUTE-REDIRECT"===t.tagName}).map(function(t){var e=w(t,"to");return{from:c(w(t,"from")),to:null==e?void 0:c(e)}})}function y(t){return function(t){for(var e=[],n=0,r=t;n<r.length;n++)R([],e,r[n]);return e}(function t(e,n){return void 0===n&&(n=e),Array.from(n.children).filter(function(t){return"ION-ROUTE"===t.tagName&&t.component}).map(function(n){var r=w(n,"component");if(!r)throw new Error("component missing in ion-route");return{path:c(w(n,"url")),id:r.toLowerCase(),params:n.componentProps,children:t(e,n)}})}(t))}function w(t,e){return e in t?t[e]:t.hasAttribute(e)?t.getAttribute(e):null}function R(t,e,n){var r=t.slice();if(r.push({id:n.id,path:n.path,params:n.params}),0!==n.children.length)for(var o=0,i=n.children;o<i.length;o++)R(r,e,i[o]);else e.push(r)}var C=function(){function t(){this.previousPath=null,this.busy=!1,this.state=0,this.lastState=0,this.root="/",this.useHash=!0}return t.prototype.componentWillLoad=function(){return o(this,void 0,void 0,function(){return i(this,function(t){switch(t.label){case 0:return[4,function(t){return l(t.document.body)?Promise.resolve():new Promise(function(e){t.addEventListener("ionNavWillLoad",e,{once:!0})})}(this.win)];case 1:return t.sent(),[4,this.onRoutesChanged()];case 2:return t.sent(),this.win.addEventListener("ionRouteRedirectChanged",Object(r.h)(this.onRedirectChanged.bind(this),10)),this.win.addEventListener("ionRouteDataChanged",Object(r.h)(this.onRoutesChanged.bind(this),100)),this.onRedirectChanged(),[2]}})})},t.prototype.onPopState=function(){var t=this.historyDirection(),e=this.getPath();return this.writeNavStateRoot(e,t)},t.prototype.push=function(t,e){void 0===e&&(e="forward");var n=c(t),r=P[e];return this.setPath(n,r),this.writeNavStateRoot(n,r)},t.prototype.printDebug=function(){this.getPath(),function(t){console.group("[ion-core] ROUTES["+t.length+"]");for(var e=function(t){var e=[];t.forEach(function(t){return e.push.apply(e,t.path)});var n=t.map(function(t){return t.id});s(e),n.join(", ")},n=0,r=t;n<r.length;n++)e(r[n]);console.groupEnd()}(y(this.el)),function(t){console.group("[ion-core] REDIRECTS["+t.length+"]");for(var e=0,n=t;e<n.length;e++){var r=n[e];r.to&&(s(r.from),s(r.to))}console.groupEnd()}(b(this.el))},t.prototype.navChanged=function(t){return o(this,void 0,void 0,function(){var e,n,r,o,a,u;return i(this,function(i){switch(i.label){case 0:return this.busy?(console.warn("[ion-router] router is busy, navChanged was cancelled"),[2,!1]):(e=function(t){for(var e,n=[],r=t;e=l(r);){var o=e.getRouteId();if(!o)break;r=o.element,o.element=void 0,n.push(o)}return{ids:n,outlet:e}}(this.win.document.body),n=e.ids,r=e.outlet,o=y(this.el),(a=function(t,e){for(var n=null,r=0,o=t.map(function(t){return t.id}),i=0,a=e;i<a.length;i++){var u=a[i],s=p(o,u);s>r&&(n=u,r=s)}return n?n.map(function(e,n){return{id:e.id,path:e.path,params:g(e.params,t[n]&&t[n].params)}}):null}(n,o))?(u=function(t){for(var e=[],n=0,r=t;n<r.length;n++)for(var o=r[n],i=0,a=o.path;i<a.length;i++){var u=a[i];if(":"===u[0]){var s=o.params&&o.params[u.slice(1)];if(!s)return null;e.push(s)}else""!==u&&e.push(u)}return e}(a))?(this.setPath(u,t),[4,this.safeWriteNavState(r,a,0,u,null,n.length)]):(console.warn("[ion-router] router could not match path because some required param is missing"),[2,!1]):(console.warn("[ion-router] no matching URL for ",n.map(function(t){return t.id})),[2,!1]));case 1:return i.sent(),[2,!0]}})})},t.prototype.onRedirectChanged=function(){var t=this.getPath();t&&f(t,b(this.el))&&this.writeNavStateRoot(t,0)},t.prototype.onRoutesChanged=function(){return this.writeNavStateRoot(this.getPath(),0)},t.prototype.historyDirection=function(){null===this.win.history.state&&(this.state++,this.win.history.replaceState(this.state,this.win.document.title,this.win.document.location.href));var t=this.win.history.state,e=this.lastState;return this.lastState=t,t>e?1:t<e?-1:0},t.prototype.writeNavStateRoot=function(t,e){return o(this,void 0,void 0,function(){var n,r,o,a,u;return i(this,function(i){return t?(n=b(this.el),r=f(t,n),o=null,r&&(this.setPath(r.to,e),o=r.from,t=r.to),a=y(this.el),(u=function(t,e){for(var n=null,r=0,o=0,i=e;o<i.length;o++){var a=d(t,i[o]);if(null!==a){var u=m(a);u>r&&(r=u,n=a)}}return n}(t,a))?[2,this.safeWriteNavState(this.win.document.body,u,e,t,o)]:(console.error("[ion-router] the path does not match any route"),[2,!1])):(console.error("[ion-router] URL is not part of the routing set"),[2,!1])})})},t.prototype.safeWriteNavState=function(t,e,n,r,a,u){return void 0===u&&(u=0),o(this,void 0,void 0,function(){var o,s,c;return i(this,function(i){switch(i.label){case 0:return[4,this.lock()];case 1:o=i.sent(),s=!1,i.label=2;case 2:return i.trys.push([2,4,,5]),[4,this.writeNavState(t,e,n,r,a,u)];case 3:return s=i.sent(),[3,5];case 4:return c=i.sent(),console.error(c),[3,5];case 5:return o(),[2,s]}})})},t.prototype.lock=function(){return o(this,void 0,void 0,function(){var t,e;return i(this,function(n){switch(n.label){case 0:return t=this.waitPromise,this.waitPromise=new Promise(function(t){return e=t}),t?[4,t]:[3,2];case 1:n.sent(),n.label=2;case 2:return[2,e]}})})},t.prototype.writeNavState=function(t,e,n,r,a,u){return void 0===u&&(u=0),o(this,void 0,void 0,function(){var s,c;return i(this,function(h){switch(h.label){case 0:return this.busy?(console.warn("[ion-router] router is busy, transition was cancelled"),[2,!1]):(this.busy=!0,(s=this.routeChangeEvent(r,a))&&this.ionRouteWillChange.emit(s),[4,function t(e,n,r,a,u){return void 0===u&&(u=!1),o(this,void 0,void 0,function(){var o,s,c,h;return i(this,function(i){switch(i.label){case 0:return i.trys.push([0,6,,7]),o=l(e),a>=n.length||!o?[2,u]:[4,o.componentOnReady()];case 1:return i.sent(),[4,o.setRouteId((s=n[a]).id,s.params,r)];case 2:return(c=i.sent()).changed&&(r=0,u=!0),[4,t(c.element,n,r,a+1,u)];case 3:return u=i.sent(),c.markVisible?[4,c.markVisible()]:[3,5];case 4:i.sent(),i.label=5;case 5:return[2,u];case 6:return h=i.sent(),console.error(h),[2,!1];case 7:return[2]}})})}(t,e,n,u)]);case 1:return c=h.sent(),this.busy=!1,s&&this.ionRouteDidChange.emit(s),[2,c]}})})},t.prototype.setPath=function(t,e){this.state++,function(t,e,n,r,o,i){var a=s(c(e).concat(r));n&&(a="#"+a),1===o?t.pushState(i,"",a):t.replaceState(i,"",a)}(this.win.history,this.root,this.useHash,t,e,this.state)},t.prototype.getPath=function(){return function(t,e,n){var r=t.pathname;if(n){var o=t.hash;r="#"===o[0]?o.slice(1):""}return function(t,e){if(t.length>e.length)return null;if(t.length<=1&&""===t[0])return e;for(var n=0;n<t.length;n++)if(t[n].length>0&&t[n]!==e[n])return null;return e.length===t.length?[""]:e.slice(t.length)}(c(e),c(r))}(this.win.location,this.root,this.useHash)},t.prototype.routeChangeEvent=function(t,e){var n=this.previousPath,r=s(t);return this.previousPath=r,r===n?null:{from:n,redirectedFrom:e?s(e):null,to:r}},Object.defineProperty(t,"is",{get:function(){return"ion-router"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{config:{context:"config"},el:{elementRef:!0},navChanged:{method:!0},printDebug:{method:!0},push:{method:!0},queue:{context:"queue"},root:{type:String,attr:"root"},useHash:{type:Boolean,attr:"use-hash"},win:{context:"window"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"ionRouteWillChange",method:"ionRouteWillChange",bubbles:!0,cancelable:!0,composed:!0},{name:"ionRouteDidChange",method:"ionRouteDidChange",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"window:popstate",method:"onPopState"}]},enumerable:!0,configurable:!0}),t}(),P={back:-1,root:0,forward:1}}}]);
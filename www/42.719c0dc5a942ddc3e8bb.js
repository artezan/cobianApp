(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{KwbL:function(e,t,n){"use strict";n.r(t),n.d(t,"IonApp",function(){return s}),n.d(t,"IonFooter",function(){return u}),n.d(t,"IonHeader",function(){return c});var r=n("GCaz"),o=n("XGMM"),i=function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(a,s)}u((r=r.apply(e,t||[])).next())})},a=function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},s=function(){function e(){this.isDevice=!1}return e.prototype.componentWillLoad=function(){this.isDevice=this.config.getBoolean("isDevice",Object(r.a)(this.win))},e.prototype.componentDidLoad=function(){var e=this;setTimeout(function(){(function(e){i(this,void 0,void 0,function(){return a(this,function(t){switch(t.label){case 0:return[4,Promise.all([n.e(0),n.e(131)]).then(n.bind(null,"MnbF"))];case 1:return t.sent().startTapClick(e.document),[2]}})})})(e.win),function(e,t){i(this,void 0,void 0,function(){return a(this,function(o){switch(o.label){case 0:return t.getBoolean("inputShims",Object(r.d)(e))?[4,Promise.all([n.e(0),n.e(130)]).then(n.bind(null,"m22C"))]:[3,2];case 1:o.sent().startInputShims(e.document,t),o.label=2;case 2:return[2]}})})}(e.win,e.config),function(e,t,r){i(this,void 0,void 0,function(){return a(this,function(o){switch(o.label){case 0:return t?[4,n.e(132).then(n.bind(null,"A1Zs"))]:[3,2];case 1:o.sent().startStatusTap(e,r),o.label=2;case 2:return[2]}})})}(e.win,e.isDevice,e.queue)},32)},e.prototype.hostData=function(){var e=Object(r.b)(this.win),t=Object(r.c)(this.win),n=this.config.get("statusbarPadding",e||t);return{class:{"ion-page":!0,"is-device":this.isDevice,"is-hydrid":e,"is-standalone":t,"statusbar-padding":n}}},Object.defineProperty(e,"is",{get:function(){return"ion-app"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{config:{context:"config"},el:{elementRef:!0},queue:{context:"queue"},win:{context:"window"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"ion-app.is-device{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}ion-app.statusbar-padding{--ion-safe-area-top:20px}@supports (padding-top:constant(safe-area-inset-top)){ion-app.statusbar-padding{--ion-safe-area-top:constant(safe-area-inset-top);--ion-safe-area-bottom:constant(safe-area-inset-bottom);--ion-safe-area-left:constant(safe-area-inset-left);--ion-safe-area-rigtht:constant(safe-area-inset-right)}}@supports (padding-top:env(safe-area-inset-top)){ion-app.statusbar-padding{--ion-safe-area-top:env(safe-area-inset-top);--ion-safe-area-bottom:env(safe-area-inset-bottom);--ion-safe-area-left:env(safe-area-inset-left);--ion-safe-area-rigtht:env(safe-area-inset-right)}}"},enumerable:!0,configurable:!0}),e}(),u=function(){function e(){this.translucent=!1}return e.prototype.hostData=function(){var e=Object(o.a)(this.mode,"footer"),t=this.translucent?Object(o.a)(this.mode,"footer-translucent"):null;return{class:Object.assign({},e,t)}},Object.defineProperty(e,"is",{get:function(){return"ion-footer"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{mode:{type:String,attr:"mode"},translucent:{type:Boolean,attr:"translucent"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"ion-footer{display:block;position:relative;-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1;width:100%;z-index:10}ion-footer ion-toolbar:last-child{padding-bottom:var(--ion-safe-area-bottom)}.footer-ios ion-toolbar:first-child{--border-width:0.55px 0 0}.footer-ios[no-border] ion-toolbar:first-child{--border-width:0}.footer-translucent-ios{-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}.footer-translucent-ios ion-toolbar{--opacity:.8;--backdrop-filter:saturate(180%) blur(20px)}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"ios"},enumerable:!0,configurable:!0}),e}(),c=function(){function e(){this.translucent=!1}return e.prototype.hostData=function(){var e=Object(o.a)(this.mode,"header"),t=this.translucent?Object(o.a)(this.mode,"header-translucent"):null;return{class:Object.assign({},e,t)}},Object.defineProperty(e,"is",{get:function(){return"ion-header"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{mode:{type:String,attr:"mode"},translucent:{type:Boolean,attr:"translucent"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"ion-header{display:block;position:relative;-webkit-box-ordinal-group:0;-ms-flex-order:-1;order:-1;width:100%;z-index:10}ion-header ion-toolbar:first-child{padding-top:var(--ion-safe-area-top,0)}.header-ios ion-toolbar:last-child{--border-width:0 0 0.55px}.header-ios[no-border] ion-toolbar:last-child{--border-width:0}.header-translucent-ios{-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}.header-translucent-ios ion-toolbar{--opacity:.8;--backdrop-filter:saturate(180%) blur(20px)}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"ios"},enumerable:!0,configurable:!0}),e}()}}]);
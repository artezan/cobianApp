(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{nyXy:function(n,e,t){"use strict";t.r(e),t.d(e,"IonInfiniteScroll",function(){return r}),t.d(e,"IonInfiniteScrollContent",function(){return l});var i=t("cBjU"),o=t("XGMM"),r=function(){function n(){this.thrPx=0,this.thrPc=0,this.didFire=!1,this.isBusy=!1,this.isLoading=!1,this.threshold="15%",this.disabled=!1,this.position="bottom"}return n.prototype.thresholdChanged=function(n){n.lastIndexOf("%")>-1?(this.thrPx=0,this.thrPc=parseFloat(n)/100):(this.thrPx=parseFloat(n),this.thrPc=0)},n.prototype.disabledChanged=function(n){this.enableScrollEvents(!n)},n.prototype.componentDidLoad=function(){return n=this,void 0,t=function(){var n;return function(n,e){var t,i,o,r,l={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return r={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function s(r){return function(s){return function(r){if(t)throw new TypeError("Generator is already executing.");for(;l;)try{if(t=1,i&&(o=2&r[0]?i.return:r[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,r[1])).done)return o;switch(i=0,o&&(r=[2&r[0],o.value]),r[0]){case 0:case 1:o=r;break;case 4:return l.label++,{value:r[1],done:!1};case 5:l.label++,i=r[1],r=[0];continue;case 7:r=l.ops.pop(),l.trys.pop();continue;default:if(!(o=(o=l.trys).length>0&&o[o.length-1])&&(6===r[0]||2===r[0])){l=0;continue}if(3===r[0]&&(!o||r[1]>o[0]&&r[1]<o[3])){l.label=r[1];break}if(6===r[0]&&l.label<o[1]){l.label=o[1],o=r;break}if(o&&l.label<o[2]){l.label=o[2],l.ops.push(r);break}o[2]&&l.ops.pop(),l.trys.pop();continue}r=e.call(n,l)}catch(n){r=[6,n],i=0}finally{t=o=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,s])}}}(this,function(e){switch(e.label){case 0:return(n=this.el.closest("ion-content"))?[4,n.componentOnReady()]:[3,2];case 1:e.sent(),this.scrollEl=n.getScrollElement(),e.label=2;case 2:return this.thresholdChanged(this.threshold),this.enableScrollEvents(!this.disabled),[2]}})},new((e=void 0)||(e=Promise))(function(i,o){function r(n){try{s(t.next(n))}catch(n){o(n)}}function l(n){try{s(t.throw(n))}catch(n){o(n)}}function s(n){n.done?i(n.value):new e(function(e){e(n.value)}).then(r,l)}s((t=t.apply(n,[])).next())});var n,e,t},n.prototype.componentDidUnload=function(){this.scrollEl=void 0},n.prototype.onScroll=function(){var n=this.scrollEl;if(!n||!this.canStart())return 1;var e=this.el.offsetHeight;if(!e)return 2;var t=n.scrollTop,i=n.offsetHeight,o=this.thrPc?i*this.thrPc:this.thrPx;if(("bottom"===this.position?n.scrollHeight-e-t-o-i:t-e-o)<0){if(!this.didFire)return this.isLoading=!0,this.didFire=!0,this.ionInfinite.emit(),3}else this.didFire=!1;return 4},n.prototype.complete=function(){this.isLoading&&this.scrollEl&&(this.isLoading=!1)},n.prototype.waitFor=function(n){var e=this.complete.bind(this);n.then(e,e)},n.prototype.canStart=function(){return!(this.disabled||this.isBusy||!this.scrollEl||this.isLoading)},n.prototype.enableScrollEvents=function(n){this.scrollEl&&this.enableListener(this,"scroll",n,this.scrollEl)},n.prototype.hostData=function(){return{class:{"infinite-scroll-loading":this.isLoading,"infinite-scroll-enabled":!this.disabled}}},Object.defineProperty(n,"is",{get:function(){return"ion-infinite-scroll"},enumerable:!0,configurable:!0}),Object.defineProperty(n,"properties",{get:function(){return{complete:{method:!0},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["disabledChanged"]},el:{elementRef:!0},enableListener:{context:"enableListener"},isLoading:{state:!0},position:{type:String,attr:"position"},queue:{context:"queue"},threshold:{type:String,attr:"threshold",watchCallbacks:["thresholdChanged"]},waitFor:{method:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(n,"events",{get:function(){return[{name:"ionInfinite",method:"ionInfinite",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(n,"listeners",{get:function(){return[{name:"scroll",method:"onScroll",disabled:!0,passive:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(n,"style",{get:function(){return"ion-infinite-scroll{display:none;width:100%}.infinite-scroll-enabled{display:block}"},enumerable:!0,configurable:!0}),n}(),l=function(){function n(){}return n.prototype.componentDidLoad=function(){this.loadingSpinner||(this.loadingSpinner=this.config.get("infiniteLoadingSpinner",this.config.get("spinner","lines")))},n.prototype.hostData=function(){return{class:Object(o.a)(this.mode,"infinite-scroll-content")}},n.prototype.render=function(){return Object(i.b)("div",{class:"infinite-loading"},this.loadingSpinner&&Object(i.b)("div",{class:"infinite-loading-spinner"},Object(i.b)("ion-spinner",{name:this.loadingSpinner})),this.loadingText&&Object(i.b)("div",{class:"infinite-loading-text",innerHTML:this.loadingText}))},Object.defineProperty(n,"is",{get:function(){return"ion-infinite-scroll-content"},enumerable:!0,configurable:!0}),Object.defineProperty(n,"properties",{get:function(){return{config:{context:"config"},loadingSpinner:{type:String,attr:"loading-spinner",mutable:!0},loadingText:{type:String,attr:"loading-text"}}},enumerable:!0,configurable:!0}),Object.defineProperty(n,"style",{get:function(){return"ion-infinite-scroll-content{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;min-height:84px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.infinite-loading{margin:0 0 32px;display:none;width:100%}.infinite-loading-text{margin:4px 32px 0}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-ios .infinite-loading-text{color:var(--ion-text-color-step-400,#666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-crescent circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-small-ios line{stroke:var(--ion-text-color-step-400,#666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-text-color-step-400,#666)}"},enumerable:!0,configurable:!0}),Object.defineProperty(n,"styleMode",{get:function(){return"ios"},enumerable:!0,configurable:!0}),n}()}}]);
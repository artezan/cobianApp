(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{PjXW:function(e,t,o){"use strict";o.r(t),o.d(t,"IonPopover",function(){return v}),o.d(t,"IonPopoverController",function(){return h});var n=o("cBjU"),r=o("s9Q1"),i=o("ltj9"),a=o("XGMM"),s=o("B4SP"),l=function(e,t,o,n){return new(o||(o=Promise))(function(r,i){function a(e){try{l(n.next(e))}catch(e){i(e)}}function s(e){try{l(n.throw(e))}catch(e){i(e)}}function l(e){e.done?r(e.value):new o(function(t){t(e.value)}).then(a,s)}l((n=n.apply(e,t||[])).next())})},p=function(e,t){var o,n,r,i,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,n&&(r=2&i[0]?n.return:i[0]?n.throw||((r=n.return)&&r.call(n),0):n.next)&&!(r=r.call(n,i[1])).done)return r;switch(n=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(r=(r=a.trys).length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){a.label=i[1];break}if(6===i[0]&&a.label<r[1]){a.label=r[1],r=i;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(i);break}r[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],n=0}finally{o=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};function c(e,t,o){var n="top",r="left",i=t.querySelector(".popover-content"),a=i.getBoundingClientRect(),s=a.width,l=a.height,p=window.innerWidth,c=window.innerHeight,u=o&&o.target&&o.target.getBoundingClientRect(),m=u&&"top"in u?u.top:c/2-l/2,f=u&&"left"in u?u.left:p/2,b=u&&u.width||0,v=u&&u.height||0,y=t.querySelector(".popover-arrow"),h=y.getBoundingClientRect(),w=h.width,g=h.height;u||(y.style.display="none");var x={top:m+v,left:f+b/2-w/2},P={top:m+v+(g-1),left:f+b/2-s/2},D=!1,k=!1;P.left<d+25?(D=!0,P.left=d):s+d+P.left+25>p&&(k=!0,P.left=p-s-d,r="right"),m+v+l>c&&m-l>0?(x.top=m-(g+1),console.log(x),console.log(m),console.log(l),P.top=m-l-(g-1),t.className=t.className+" popover-bottom",n="bottom"):m+v+l>c&&(i.style.bottom=d+"%"),y.style.top=x.top+"px",y.style.left=x.left+"px",i.style.top=P.top+"px",i.style.left=P.left+"px",D&&(i.style.left="calc("+P.left+"px + var(--ion-safe-area-left, 0px)"),k&&(i.style.left="calc("+P.left+"px + var(--ion-safe-area-right, 0px)"),i.style.transformOrigin=n+" "+r;var j=new e,O=new e;O.addElement(t.querySelector("ion-backdrop")),O.fromTo("opacity",.01,.08);var E=new e;return E.addElement(t.querySelector(".popover-wrapper")),E.fromTo("opacity",.01,1),Promise.resolve(j.addElement(t).easing("ease").duration(100).add(O).add(E))}var d=5;function u(e,t){var o=new e,n=new e;n.addElement(t.querySelector("ion-backdrop"));var r=new e;return r.addElement(t.querySelector(".popover-wrapper")),r.fromTo("opacity",.99,0),n.fromTo("opacity",.08,0),Promise.resolve(o.addElement(t).easing("ease").duration(500).add(n).add(r))}function m(e,t,o){var n="top",r="left",i=t.querySelector(".popover-content"),a=i.getBoundingClientRect(),s=a.width,l=a.height,p=window.innerWidth,c=window.innerHeight,d=o&&o.target&&o.target.getBoundingClientRect(),u=d&&"top"in d?d.top:c/2-l/2,m=d&&d.height||0,b={top:u,left:d&&"left"in d?d.left:p/2-s/2};b.left<f?b.left=f:s+f+b.left>p&&(b.left=p-s-f,r="right"),u+m+l>c&&u-l>0?(b.top=u-l,t.className=t.className+" popover-bottom",n="bottom"):u+m+l>c&&(i.style.bottom=f+"px"),i.style.top=b.top+"px",i.style.left=b.left+"px",i.style.transformOrigin=n+" "+r;var v=new e,y=new e;y.addElement(t.querySelector("ion-backdrop")),y.fromTo("opacity",.01,.08);var h=new e;h.addElement(t.querySelector(".popover-wrapper")),h.fromTo("opacity",.01,1);var w=new e;w.addElement(t.querySelector(".popover-content")),w.fromTo("scale",.001,1);var g=new e;return g.addElement(t.querySelector(".popover-viewport")),g.fromTo("opacity",.01,1),Promise.resolve(v.addElement(t).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(300).add(y).add(h).add(w).add(g))}var f=12;function b(e,t){var o=new e,n=new e;n.addElement(t.querySelector("ion-backdrop"));var r=new e;return r.addElement(t.querySelector(".popover-wrapper")),r.fromTo("opacity",.99,0),n.fromTo("opacity",.08,0),Promise.resolve(o.addElement(t).easing("ease").duration(500).add(n).add(r))}var v=function(){function e(){this.presented=!1,this.keyboardClose=!0,this.backdropDismiss=!0,this.showBackdrop=!0,this.translucent=!1,this.animated=!0}return e.prototype.componentDidLoad=function(){this.ionPopoverDidLoad.emit()},e.prototype.componentDidUnload=function(){this.ionPopoverDidUnload.emit()},e.prototype.onDismiss=function(e){e.stopPropagation(),e.preventDefault(),this.dismiss()},e.prototype.onBackdropTap=function(){this.dismiss(null,i.d)},e.prototype.lifecycle=function(e){var t=this.usersElement,o=y[e.type];if(t&&o){var n=new CustomEvent(o,{bubbles:!1,cancelable:!1,detail:e.detail});t.dispatchEvent(n)}},e.prototype.present=function(){return l(this,void 0,void 0,function(){var e,t,o;return p(this,function(n){switch(n.label){case 0:if(this.presented)return[2];if(!(e=this.el.querySelector(".popover-content")))throw new Error("container is undefined");return t=Object.assign({},this.componentProps,{popover:this.el}),o=this,[4,Object(r.a)(this.delegate,e,this.component,["popover-viewport"],t)];case 1:return o.usersElement=n.sent(),[4,Object(s.a)(this.usersElement)];case 2:return n.sent(),[2,Object(i.h)(this,"popoverEnter",c,m,this.event)]}})})},e.prototype.dismiss=function(e,t){return l(this,void 0,void 0,function(){return p(this,function(o){switch(o.label){case 0:return[4,Object(i.e)(this,e,t,"popoverLeave",u,b,this.event)];case 1:return o.sent(),[4,Object(r.b)(this.delegate,this.usersElement)];case 2:return o.sent(),[2]}})})},e.prototype.onDidDismiss=function(e){return Object(i.f)(this.el,"ionPopoverDidDismiss",e)},e.prototype.onWillDismiss=function(e){return Object(i.f)(this.el,"ionPopoverWillDismiss",e)},e.prototype.hostData=function(){var e=this.translucent?Object(a.a)(this.mode,"popover-translucent"):{};return{style:{zIndex:2e4+this.overlayId},"no-router":!0,class:Object.assign({},Object(a.a)(this.mode,"popover"),Object(a.e)(this.cssClass),e)}},e.prototype.render=function(){var e=Object(a.a)(this.mode,"popover-wrapper");return[Object(n.b)("ion-backdrop",{tappable:this.backdropDismiss}),Object(n.b)("div",{class:e},Object(n.b)("div",{class:"popover-arrow"}),Object(n.b)("div",{class:"popover-content"}))]},Object.defineProperty(e,"is",{get:function(){return"ion-popover"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{animated:{type:Boolean,attr:"animated"},animationCtrl:{connect:"ion-animation-controller"},backdropDismiss:{type:Boolean,attr:"backdrop-dismiss"},color:{type:String,attr:"color"},component:{type:String,attr:"component"},componentProps:{type:"Any",attr:"component-props"},config:{context:"config"},cssClass:{type:String,attr:"css-class"},delegate:{type:"Any",attr:"delegate"},dismiss:{method:!0},el:{elementRef:!0},enterAnimation:{type:"Any",attr:"enter-animation"},event:{type:"Any",attr:"event"},keyboardClose:{type:Boolean,attr:"keyboard-close"},leaveAnimation:{type:"Any",attr:"leave-animation"},mode:{type:String,attr:"mode"},onDidDismiss:{method:!0},onWillDismiss:{method:!0},overlayId:{type:Number,attr:"overlay-id"},present:{method:!0},showBackdrop:{type:Boolean,attr:"show-backdrop"},translucent:{type:Boolean,attr:"translucent"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ionPopoverDidLoad",method:"ionPopoverDidLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionPopoverDidUnload",method:"ionPopoverDidUnload",bubbles:!0,cancelable:!0,composed:!0},{name:"ionPopoverDidPresent",method:"didPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionPopoverWillPresent",method:"willPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionPopoverWillDismiss",method:"willDismiss",bubbles:!0,cancelable:!0,composed:!0},{name:"ionPopoverDidDismiss",method:"didDismiss",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"ionDismiss",method:"onDismiss"},{name:"ionBackdropTap",method:"onBackdropTap"},{name:"ionPopoverDidPresent",method:"lifecycle"},{name:"ionPopoverWillPresent",method:"lifecycle"},{name:"ionPopoverWillDismiss",method:"lifecycle"},{name:"ionPopoverDidDismiss",method:"lifecycle"}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"ion-popover{left:0;right:0;top:0;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;z-index:1000}.popover-wrapper{opacity:0;z-index:10}.popover-content{display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;overflow:auto;z-index:10}.popover-content ion-content{position:relative;contain:none}.popover-md .popover-content{border-radius:2px;-webkit-transform-origin:left top;transform-origin:left top;width:250px;min-width:0;min-height:0;max-height:90%;background:var(--ion-background-color,#fff);color:var(--ion-text-color,#000);-webkit-box-shadow:0 3px 12px 2px rgba(0,0,0,.3);box-shadow:0 3px 12px 2px rgba(0,0,0,.3)}.popover-md .popover-viewport{-webkit-transition-delay:.1s;transition-delay:.1s}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"md"},enumerable:!0,configurable:!0}),e}(),y={ionPopoverDidPresent:"ionViewDidEnter",ionPopoverWillPresent:"ionViewWillEnter",ionPopoverWillDismiss:"ionViewWillDismiss",ionPopoverDidDismiss:"ionViewDidDismiss"},h=function(){function e(){}return e.prototype.create=function(e){return Object(i.a)(this.doc.createElement("ion-popover"),e)},e.prototype.dismiss=function(e,t,o){return Object(i.b)(this.doc,e,t,"ion-popover",o)},e.prototype.getTop=function(){return Object(i.c)(this.doc,"ion-popover")},Object.defineProperty(e,"is",{get:function(){return"ion-popover-controller"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{create:{method:!0},dismiss:{method:!0},doc:{context:"document"},getTop:{method:!0}}},enumerable:!0,configurable:!0}),e}()}}]);
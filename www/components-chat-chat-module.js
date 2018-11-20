(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-chat-chat-module"],{

/***/ "./src/app/components/chat/chat-room/chat-room.component.html":
/*!********************************************************************!*\
  !*** ./src/app/components/chat/chat-room/chat-room.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"backOne()\" slot=\"start\">\n        <ion-icon\n          style=\"color: white\"\n          slot=\"icon-only\"\n          name=\"arrow-back\"\n        ></ion-icon>\n      </ion-button>\n    </ion-buttons>\n    <ion-title> Chat {{ title }} </ion-title>\n  </ion-toolbar>\n  <ion-toolbar *ngIf=\"user.type !== 'buyer'\">\n    <div>\n      <ion-chip *ngIf=\"buyer\" color=\"secondary\">\n        <ion-chip-icon class=\"icon-chip-detail\" name=\"person\"></ion-chip-icon>\n        <ion-label>{{ buyer.name }} {{ buyer.fatherLastName }}</ion-label>\n      </ion-chip>\n      <ion-chip color=\"secondary\" *ngIf=\"seller !== undefined\">\n        <ion-chip-icon class=\"icon-chip-detail\" name=\"business\"></ion-chip-icon>\n        <ion-label>{{ seller.name }} </ion-label>\n      </ion-chip>\n    </div>\n  </ion-toolbar>\n</ion-header>\n<ion-content padding>\n  <div class=\"my-contenet-chat\">\n    <div *ngIf=\"isLoad\">\n      <div class=\"flex-contenet\" id=\"flex-contenet\">\n        <!-- contenido de chat -->\n        <span\n          class=\"item-bottom   \"\n          *ngFor=\"\n            let msg of chat.messages;\n            trackBy: trackByCreated;\n            let last = last;\n            let i = index\n          \"\n          [ngClass]=\"{\n            'flex-item-me': user.id === msg.uid,\n            'flex-item-you': user.id !== msg.uid,\n            'animated zoomInUp delay-1s': isSending && last\n          }\"\n        >\n          <ion-icon\n            class=\"icon-flex\"\n            *ngIf=\"user.id !== msg.uid\"\n            name=\"contact\"\n          ></ion-icon>\n          <div\n            class=\"bubble \"\n            [ngClass]=\"{ you: user.id !== msg.uid, me: user.id === msg.uid }\"\n          >\n            <div>{{ msg.content }}</div>\n          </div>\n\n          <small *ngIf=\"user.id !== msg.uid\">{{\n            msg.typeOfUser === 'buyer'\n              ? 'comprador'\n              : msg.typeOfUser === 'seller'\n              ? 'vendedor'\n              : msg.typeOfUser === 'preBuyer'\n              ? 'comprador'\n              : 'administrador'\n          }}</small>\n          {{ last ? lastScroll(i) : '' }}\n        </span>\n      </div>\n\n      <h5 *ngIf=\"chat.messages.length === 0\">Escriba una pregunta</h5>\n    </div>\n  </div>\n</ion-content>\n<ion-footer>\n  <ion-toolbar color=\"primary\">\n    <textarea\n      #myInput\n      id=\"myInput\"\n      rows=\"1\"\n      maxlength=\"500\"\n      (keyup)=\"textAreaKeyup()\"\n      [(ngModel)]=\"contentText\"\n      class=\"textarea-chat\"\n      (keydown.enter)=\"submit()\"\n    ></textarea>\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"submit()\" *ngIf=\"isSending !== false\">\n        <ion-icon slot=\"icon-only\" name=\"send\"></ion-icon>\n      </ion-button>\n      <ion-button *ngIf=\"isSending === false\">\n        <ion-spinner\n          slot=\"icon-only\"\n          name=\"dots\"\n          color=\"secondary\"\n        ></ion-spinner>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n"

/***/ }),

/***/ "./src/app/components/chat/chat-room/chat-room.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/components/chat/chat-room/chat-room.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ta-frame {\n  margin: 0;\n  padding: 10px 10px;\n  width: 230px;\n  height: 20px;\n  border-top: 1px solid gray;\n  background-color: #eee; }\n\n.textarea-chat {\n  overflow: hidden;\n  background-color: white;\n  color: black;\n  width: calc(100% - 10px);\n  border: 0;\n  border-radius: 12px; }\n\n.speech-bubble-you {\n  position: relative;\n  background: #c0c0c0;\n  border-radius: .4em; }\n\n.bubble {\n  border-radius: 5px;\n  box-shadow: 0 0 6px #B2B2B2;\n  padding: 9px 18px;\n  position: relative;\n  vertical-align: top; }\n\n.bubble::before {\n  content: \"\\00a0\";\n  display: block;\n  height: 16px;\n  position: absolute;\n  top: 11px;\n  transform: rotate(29deg) skew(-35deg);\n  -moz-transform: rotate(29deg) skew(-35deg);\n  -ms-transform: rotate(29deg) skew(-35deg);\n  -o-transform: rotate(29deg) skew(-35deg);\n  -webkit-transform: rotate(29deg) skew(-35deg);\n  width: 20px; }\n\n.you {\n  margin: 1px 45px 1px 20px;\n  /* background-color: #014598;\n    color: white; */\n  background-color: #3c4252;\n  color: #fff; }\n\n/* .you::before {\n    box-shadow: -2px 2px 2px 0 rgba(178, 178, 178, .4);\n    left: -9px;\n    background-color: #3c4252;\n} */\n\n.me {\n  margin: 1px 20px 1px 20px;\n  /* background-color: #1E88E5;\n    color: white; */\n  color: rgba(0, 0, 0, 0.87);\n  background-color: #e0e0e0; }\n\n/* .me::before {\n    box-shadow: 2px -2px 2px 0 rgba(178, 178, 178, .4);\n    right: -9px;\n    background-color: #e0e0e0;\n\n} */\n\n.flex-contenet {\n  display: flex;\n  flex-direction: column; }\n\n.flex-item-you {\n  max-width: 250px;\n  align-self: flex-start; }\n\n.flex-item-me {\n  max-width: 250px;\n  align-self: flex-end; }\n\nsmall {\n  margin: 18%; }\n\n.item-bottom {\n  margin-bottom: 8px; }\n\n.icon-flex {\n  position: relative;\n  top: 36px;\n  font-size: 1.6em;\n  right: 8px; }\n\ntextarea:focus,\ninput:focus {\n  outline: none; }\n"

/***/ }),

/***/ "./src/app/components/chat/chat-room/chat-room.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/components/chat/chat-room/chat-room.component.ts ***!
  \******************************************************************/
/*! exports provided: ChatRoomComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatRoomComponent", function() { return ChatRoomComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _services_user_session_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/user-session.service */ "./src/app/services/user-session.service.ts");
/* harmony import */ var _services_property_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/property.service */ "./src/app/services/property.service.ts");
/* harmony import */ var _services_socket_io_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/socket-io.service */ "./src/app/services/socket-io.service.ts");
/* harmony import */ var _services_onesignal_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/onesignal.service */ "./src/app/services/onesignal.service.ts");
/* harmony import */ var rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/internal/operators/map */ "./node_modules/rxjs/internal/operators/map.js");
/* harmony import */ var rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _services_seller_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/seller.service */ "./src/app/services/seller.service.ts");
/* harmony import */ var _services_buyer_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/buyer.service */ "./src/app/services/buyer.service.ts");
/* harmony import */ var _services_pre_build_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/pre-build.service */ "./src/app/services/pre-build.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};












var ChatRoomComponent = /** @class */ (function () {
    function ChatRoomComponent(route, chatService, userService, propertyService, preBuildService, socketService, oneSignalService, sellerService, router, buyerService) {
        var _this = this;
        this.route = route;
        this.chatService = chatService;
        this.userService = userService;
        this.propertyService = propertyService;
        this.preBuildService = preBuildService;
        this.socketService = socketService;
        this.oneSignalService = oneSignalService;
        this.sellerService = sellerService;
        this.router = router;
        this.buyerService = buyerService;
        this.istoLast = false;
        /**
         * heigh altura eb el numero de str
         */
        this.stringHeigh = [];
        this.isFirstEnter = false;
        this.user = userService.userSession.value;
        this.route.queryParams.subscribe(function (params) { return __awaiter(_this, void 0, void 0, function () {
            var prop, prop, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!params.id) return [3 /*break*/, 5];
                        if (!(this.user.type === 'preBuyer')) return [3 /*break*/, 2];
                        this.getRoomById(params.id);
                        return [4 /*yield*/, this.getprePropertyById(params.id)];
                    case 1:
                        prop = _b.sent();
                        this.property = prop;
                        this.title = prop.name;
                        return [3 /*break*/, 5];
                    case 2:
                        this.getRoomById(params.id);
                        return [4 /*yield*/, this.getPropertyById(params.id)];
                    case 3:
                        prop = _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.getSellerOfProperty(params.id)];
                    case 4:
                        _a.seller = _b.sent();
                        this.property = prop;
                        this.title = prop.name ? prop.name : '';
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        this.socketService.onNewMsg().subscribe(function (chatId) {
            if (chatId === _this.chat._id) {
                _this.getRoomByChatId(_this.chat._id);
            }
        });
    }
    ChatRoomComponent.prototype.ngOnInit = function () { };
    ChatRoomComponent.prototype.textAreaKeyup = function () {
        var _this = this;
        // da el primer valor
        if (!this.isFirstEnter) {
            this.oldHeigh = this.myInput.nativeElement.scrollHeight;
            this.isFirstEnter = true;
        }
        // solo cuando incrementa
        if (this.myInput.nativeElement.scrollHeight > this.oldHeigh) {
            // registra num de str si no esta en el arreglo
            this.stringHeigh.push({
                heigh: this.oldHeigh,
                numOfstring: this.contentText.length - 1
            });
            // de nuevo valor para detectar cambio
            this.oldHeigh = this.myInput.nativeElement.scrollHeight;
        }
        var s = this.stringHeigh.findIndex(function (sh) { return sh.numOfstring === _this.contentText.length; });
        // si regresa da valor de altura antiguo
        if (s !== -1) {
            this.myInput.nativeElement.style.height =
                this.stringHeigh[s].heigh + 'px';
            this.stringHeigh.splice(s, 1);
            this.oldHeigh = this.myInput.nativeElement.scrollHeight;
        }
        else {
            // valor nuevo de altura al incrementar
            this.myInput.nativeElement.style.height =
                this.myInput.nativeElement.scrollHeight + 'px';
        }
    };
    ChatRoomComponent.prototype.getRoomById = function (id) {
        var _this = this;
        this.isLoad = false;
        this.chatService.getByProp(id).subscribe(function (chat) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(chat === null)) return [3 /*break*/, 1];
                        this.newChat(id);
                        return [3 /*break*/, 3];
                    case 1:
                        this.chat = chat;
                        _a = this;
                        return [4 /*yield*/, this.getBuyerOfId(chat.buyer)];
                    case 2:
                        _a.buyer = _b.sent();
                        this.scrollBottom();
                        this.isLoad = true;
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    ChatRoomComponent.prototype.getRoomByChatId = function (id) {
        var _this = this;
        this.chatService.getByChatId(id).subscribe(function (chat) {
            _this.chat = chat;
            _this.scrollBottom();
            _this.isLoad = true;
            _this.isSending = true;
            console.log(chat);
        });
    };
    ChatRoomComponent.prototype.getPropertyById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var prop;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.propertyService.getPropertyById(id).toPromise()];
                    case 1:
                        prop = _a.sent();
                        if (!(prop !== null)) return [3 /*break*/, 2];
                        return [2 /*return*/, prop];
                    case 2: return [4 /*yield*/, this.preBuildService.getBuildById(id).toPromise()];
                    case 3:
                        prop = _a.sent();
                        return [2 /*return*/, prop];
                }
            });
        });
    };
    ChatRoomComponent.prototype.getprePropertyById = function (propId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.preBuildService.getBuildById(propId).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ChatRoomComponent.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newMessage, res, seller, arrToSendId, findIndex;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isSending = false;
                        newMessage = {
                            content: this.contentText,
                            createAt: new Date(),
                            readBy: [this.user.id],
                            uid: this.user.id,
                            typeOfUser: this.user.type
                        };
                        return [4 /*yield*/, this.chatService
                                .addMsg(this.chat._id, newMessage)
                                .toPromise()];
                    case 1:
                        res = _a.sent();
                        if (!res) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getSellerOfProperty(this.property._id)];
                    case 2:
                        seller = _a.sent();
                        arrToSendId = [];
                        if (seller === undefined) {
                            arrToSendId = [this.chat.buyer];
                        }
                        else {
                            arrToSendId = [seller._id, this.chat.buyer];
                        }
                        findIndex = arrToSendId.findIndex(function (id) { return id === _this.user.id; });
                        if (findIndex !== -1) {
                            arrToSendId.splice(findIndex, 0);
                        }
                        this.notification('Nuevo Mensaje', this.user.name + ": " + this.contentText, 'verde', 'msg', ['office', 'management'], arrToSendId);
                        _a.label = 3;
                    case 3:
                        if (this.stringHeigh.length > 0) {
                            this.myInput.nativeElement.style.height =
                                this.stringHeigh[0].heigh + 'px';
                            this.stringHeigh.length = 0;
                        }
                        this.contentText = ''.trim();
                        this.scrollBottom();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatRoomComponent.prototype.newChat = function (propId) {
        var _this = this;
        this.chatService.newChat(this.user.id, propId).subscribe(function (chat) {
            _this.chat = chat;
            _this.isLoad = true;
        });
    };
    ChatRoomComponent.prototype.trackByCreated = function (msg) {
        return msg.createAt;
    };
    ChatRoomComponent.prototype.scrollBottom = function () {
        var _this = this;
        // this.content.scrollToBottom();
        setTimeout(function () {
            _this.content.scrollToBottom();
        }, 10);
    };
    ChatRoomComponent.prototype.lastScroll = function (i) {
        var _this = this;
        // console.log(i);
        if (!this.istoLast && i === this.chat.messages.length - 1) {
            setTimeout(function () {
                _this.content.scrollToBottom();
            }, 10);
            this.istoLast = true;
        }
    };
    // _helpers
    ChatRoomComponent.prototype.notification = function (title, message, status, type, tags, reciversId) {
        var _this = this;
        // notificacion
        var notification = {
            title: title,
            message: message,
            tags: tags,
            receiversId: reciversId,
            senderId: this.userService.userSession.value.id,
            status: status,
            type: type
        };
        // onesignal
        this.oneSignalService
            .postOneSignalByTag(notification.title, message, tags, reciversId)
            .subscribe(function () {
            // guardar noti
            _this.oneSignalService.newNotification(notification).subscribe();
        });
    };
    ChatRoomComponent.prototype.getSellerOfProperty = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sellerService
                            .getSellerAll()
                            .pipe(Object(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_8__["map"])(function (sellers) { return sellers.find(function (s) { return !!s.property.find(function (p) { return p._id === id; }); }); }))
                            .toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ChatRoomComponent.prototype.getBuyerOfId = function (buyerId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.buyerService.getBuyerById(buyerId).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ChatRoomComponent.prototype.readMsg = function () {
        var _this = this;
        var ids = this.chat.messages
            .filter(function (m) { return !m.readBy.some(function (r) { return r === _this.user.id; }); })
            .map(function (msg) { return msg._id; });
        this.chatService.addRead(this.chat._id, ids, this.user.id).subscribe();
    };
    ChatRoomComponent.prototype.ngOnDestroy = function () {
        this.readMsg();
    };
    ChatRoomComponent.prototype.backOne = function () {
        var _this = this;
        this.router
            .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
            .then(function () { return _this.router.navigate(['chat']); });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Content"]),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Content"])
    ], ChatRoomComponent.prototype, "content", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('myInput'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ChatRoomComponent.prototype, "myInput", void 0);
    ChatRoomComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-chat-room',
            template: __webpack_require__(/*! ./chat-room.component.html */ "./src/app/components/chat/chat-room/chat-room.component.html"),
            styles: [__webpack_require__(/*! ./chat-room.component.scss */ "./src/app/components/chat/chat-room/chat-room.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_2__["ChatService"],
            _services_user_session_service__WEBPACK_IMPORTED_MODULE_4__["UserSessionService"],
            _services_property_service__WEBPACK_IMPORTED_MODULE_5__["PropertyService"],
            _services_pre_build_service__WEBPACK_IMPORTED_MODULE_11__["PreBuildService"],
            _services_socket_io_service__WEBPACK_IMPORTED_MODULE_6__["SocketIoService"],
            _services_onesignal_service__WEBPACK_IMPORTED_MODULE_7__["OnesignalService"],
            _services_seller_service__WEBPACK_IMPORTED_MODULE_9__["SellerService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_buyer_service__WEBPACK_IMPORTED_MODULE_10__["BuyerService"]])
    ], ChatRoomComponent);
    return ChatRoomComponent;
}());



/***/ }),

/***/ "./src/app/components/chat/chat.module.ts":
/*!************************************************!*\
  !*** ./src/app/components/chat/chat.module.ts ***!
  \************************************************/
/*! exports provided: ChatPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatPageModule", function() { return ChatPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _chat_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chat.page */ "./src/app/components/chat/chat.page.ts");
/* harmony import */ var _chat_room_chat_room_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./chat-room/chat-room.component */ "./src/app/components/chat/chat-room/chat-room.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: '',
        component: _chat_page__WEBPACK_IMPORTED_MODULE_5__["ChatPage"],
    },
    {
        path: 'room',
        component: _chat_room_chat_room_component__WEBPACK_IMPORTED_MODULE_6__["ChatRoomComponent"],
    },
];
var ChatPageModule = /** @class */ (function () {
    function ChatPageModule() {
    }
    ChatPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
            ],
            declarations: [_chat_page__WEBPACK_IMPORTED_MODULE_5__["ChatPage"], _chat_room_chat_room_component__WEBPACK_IMPORTED_MODULE_6__["ChatRoomComponent"]],
        })
    ], ChatPageModule);
    return ChatPageModule;
}());



/***/ }),

/***/ "./src/app/components/chat/chat.page.html":
/*!************************************************!*\
  !*** ./src/app/components/chat/chat.page.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button style=\"color: white\"></ion-menu-button>\n    </ion-buttons>\n    <ion-title> Chat </ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content padding>\n  <ng-container\n    *ngIf=\"\n      user.type === 'buyer' || user.type === 'preBuyer';\n      then: Buyer;\n      else: NoBuyer\n    \"\n  ></ng-container>\n  <ng-template #Buyer>\n    <!-- En listar status azul -->\n    <ng-container *ngIf=\"propertiesBuyer.length > 0; else: notBlue\">\n      <ion-card\n        *ngFor=\"let item of propertiesBuyer\"\n        [ngClass]=\"{\n          'state-verde': item.status === 'verde',\n          'state-amarillo': item.status === 'amarillo',\n          'state-rojo': item.status === 'rojo',\n          'state-azul': item.status === 'azul'\n        }\"\n        (click)=\"goToRoom(item.property._id)\"\n      >\n        <ion-card-header>\n          <ion-item lines=\"none\">\n            <ion-card-title text-wrap>{{ item.property.name }}</ion-card-title>\n            <ion-icon *ngIf=\"item.noRead > 0\" slot=\"end\" name=\"mail\"></ion-icon>\n            <ion-badge *ngIf=\"item.noRead > 0\" id=\"badge\" color=\"danger\">{{\n              item.noRead\n            }}</ion-badge>\n          </ion-item>\n        </ion-card-header>\n        <ion-card-content class=\"content-card-chat\">\n          <ion-item lines=\"none\">\n            <ion-icon\n              style=\"color:  #F5811E\"\n              name=\"arrow-forward\"\n              slot=\"end\"\n            ></ion-icon>\n            <ion-label text-wrap>Chat de la propiedad</ion-label>\n          </ion-item>\n        </ion-card-content>\n      </ion-card>\n    </ng-container>\n    <ng-template #notBlue>\n      <h5 *ngIf=\"propertiesBuyer.length === 0 && isLoad\">\n        No cuentas con propiedades adquiridas para generar chat\n      </h5>\n      <ion-spinner\n        *ngIf=\"propertiesBuyer.length === 0 && !isLoad\"\n        name=\"bubbles\"\n      ></ion-spinner>\n    </ng-template>\n  </ng-template>\n  <ng-template #NoBuyer>\n    <!-- todos los chat para admin ofice -->\n    <!-- filtrar los chat para seller y manag -->\n    <div *ngIf=\"isLoad\" class=\"my-contenet\">\n      <ion-card\n        *ngFor=\"let chat of chats\"\n        class=\"state-azul\"\n        (click)=\"goToRoom(chat.property)\"\n      >\n        <ion-card-header>\n          <ion-item lines=\"none\">\n            <ion-card-title *ngIf=\"chat.prop\" text-wrap>{{\n              chat.prop.name\n            }}</ion-card-title>\n            <ion-icon *ngIf=\"chat.noRead > 0\" slot=\"end\" name=\"mail\"></ion-icon>\n            <ion-badge *ngIf=\"chat.noRead > 0\" id=\"badge\" color=\"danger\">{{\n              chat.noRead\n            }}</ion-badge>\n          </ion-item>\n        </ion-card-header>\n        <ion-card-content class=\"content-card-chat\">\n          <ion-item lines=\"none\">\n            <ion-icon\n              style=\"color:  #F5811E\"\n              name=\"arrow-forward\"\n              slot=\"end\"\n            ></ion-icon>\n            <ion-label text-wrap>Chat de la propiedad</ion-label>\n          </ion-item>\n        </ion-card-content>\n      </ion-card>\n    </div>\n  </ng-template>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/components/chat/chat.page.scss":
/*!************************************************!*\
  !*** ./src/app/components/chat/chat.page.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".content-card-chat {\n  padding: 0px 20px 10px 20px !important; }\n\n#badge {\n  position: absolute;\n  top: 1px;\n  right: 2px;\n  font-size: x-small; }\n"

/***/ }),

/***/ "./src/app/components/chat/chat.page.ts":
/*!**********************************************!*\
  !*** ./src/app/components/chat/chat.page.ts ***!
  \**********************************************/
/*! exports provided: ChatPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatPage", function() { return ChatPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/user-session.service */ "./src/app/services/user-session.service.ts");
/* harmony import */ var _services_status_buyer_property_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/status-buyer-property.service */ "./src/app/services/status-buyer-property.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_seller_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/seller.service */ "./src/app/services/seller.service.ts");
/* harmony import */ var _services_property_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/property.service */ "./src/app/services/property.service.ts");
/* harmony import */ var _services_pre_buyer_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/pre-buyer.service */ "./src/app/services/pre-buyer.service.ts");
/* harmony import */ var _services_pre_build_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/pre-build.service */ "./src/app/services/pre-build.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};










var ChatPage = /** @class */ (function () {
    function ChatPage(userSessionService, statusBPService, chatService, router, sellerService, propertyService, preBuyerService, preBuildService) {
        this.userSessionService = userSessionService;
        this.statusBPService = statusBPService;
        this.chatService = chatService;
        this.router = router;
        this.sellerService = sellerService;
        this.propertyService = propertyService;
        this.preBuyerService = preBuyerService;
        this.preBuildService = preBuildService;
        this.propertiesBuyer = [];
        this.chats = [];
        this.user = userSessionService.userSession.value;
    }
    ChatPage.prototype.ngOnInit = function () {
        if (this.user.type === 'buyer') {
            this.getStatus();
        }
        else if (this.user.type === 'preBuyer') {
            this.getPrebuyer();
        }
        else {
            this.getRoomChatsByUser();
        }
    };
    ChatPage.prototype.getPrebuyer = function () {
        var _this = this;
        this.preBuyerService.getBuyerById(this.user.id).subscribe(function (buyer) {
            var buildsToChat = buyer.preBuild.filter(function (build) { return !build.timeLine.some(function (b) { return !b.isComplete; }); });
            console.log(buildsToChat);
            if (buildsToChat.length > 0) {
                buildsToChat.forEach(function (build) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _b = (_a = this.propertiesBuyer).push;
                                _c = {
                                    status: 'azul',
                                    property: { _id: build._id, name: build.name }
                                };
                                return [4 /*yield*/, this.getMsgNotReadByProp(build._id)];
                            case 1:
                                _b.apply(_a, [(_c.noRead = _d.sent(),
                                        _c)]);
                                return [2 /*return*/];
                        }
                    });
                }); });
                console.log(_this.propertiesBuyer);
            }
        });
    };
    ChatPage.prototype.getStatus = function () {
        var _this = this;
        // por status azul
        this.isLoad = false;
        this.statusBPService
            .findByBuyer(this.user.id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (sbp) { return sbp.filter(function (s) { return s.status === 'azul'; }); }))
            .subscribe(function (pb) {
            _this.propertiesBuyer = pb;
            _this.propertiesBuyer.map(function (sBP) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = sBP;
                            _b = 'noRead';
                            return [4 /*yield*/, this.getMsgNotReadByProp(sBP.property._id)];
                        case 1:
                            _a[_b] = _c.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            _this.isLoad = true;
        });
    };
    ChatPage.prototype.getRoomChatsByUser = function () {
        var _this = this;
        this.isLoad = false;
        this.chatService.getAll().subscribe(function (chatsAll) { return __awaiter(_this, void 0, void 0, function () {
            var seller_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatsAll.forEach(function (chat) {
                            _this.checkIsLive(chat.property, chat._id);
                        });
                        if (!(this.user.type === 'seller')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getSeller()];
                    case 1:
                        seller_1 = _a.sent();
                        this.chats = chatsAll.filter(function (chat) {
                            return seller_1.property.some(function (p) { return p._id === chat.property; });
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        if (this.user.type === 'management') {
                            this.chats = chatsAll.filter(function (chat) {
                                return chat.city === 'Puebla';
                            });
                        }
                        else {
                            this.chats = chatsAll;
                        }
                        _a.label = 3;
                    case 3:
                        this.chats.map(function (c) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c, _d;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        _a = c;
                                        _b = 'noRead';
                                        return [4 /*yield*/, this.getMsgNotReadByProp(c.property)];
                                    case 1:
                                        _a[_b] = _e.sent();
                                        _c = c;
                                        _d = 'prop';
                                        return [4 /*yield*/, this.getProperty(c.property)];
                                    case 2:
                                        _c[_d] = _e.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.isLoad = true;
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ChatPage.prototype.getMsgNotReadByProp = function (propId) {
        return __awaiter(this, void 0, void 0, function () {
            var chat;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chatService.getByProp(propId).toPromise()];
                    case 1:
                        chat = _a.sent();
                        if (chat !== null) {
                            return [2 /*return*/, chat.messages.filter(function (m) { return !m.readBy.some(function (r) { return r === _this.user.id; }); })
                                    .length];
                        }
                        else {
                            return [2 /*return*/, 0];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatPage.prototype.goToRoom = function (id) {
        var data = { queryParams: { id: id } };
        this.router.navigate(['chat/room'], data);
    };
    ChatPage.prototype.getSeller = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sellerService.getSellerById(this.user.id).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ChatPage.prototype.getProperty = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var prop;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.propertyService.getPropertyById(id).toPromise()];
                    case 1:
                        prop = _a.sent();
                        if (!(prop !== null)) return [3 /*break*/, 2];
                        return [2 /*return*/, prop];
                    case 2: return [4 /*yield*/, this.preBuildService.getBuildById(id).toPromise()];
                    case 3:
                        prop = _a.sent();
                        return [2 /*return*/, prop];
                }
            });
        });
    };
    ChatPage.prototype.checkIsLive = function (propId, chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var prop;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.propertyService.getPropertyById(propId).toPromise()];
                    case 1:
                        prop = _a.sent();
                        if (!(prop === null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.preBuildService.getBuildById(propId).toPromise()];
                    case 2:
                        prop = _a.sent();
                        if (prop === null) {
                            this.chatService.deletedById(chatId).subscribe();
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-chat',
            template: __webpack_require__(/*! ./chat.page.html */ "./src/app/components/chat/chat.page.html"),
            styles: [__webpack_require__(/*! ./chat.page.scss */ "./src/app/components/chat/chat.page.scss")]
        }),
        __metadata("design:paramtypes", [_services_user_session_service__WEBPACK_IMPORTED_MODULE_1__["UserSessionService"],
            _services_status_buyer_property_service__WEBPACK_IMPORTED_MODULE_2__["StatusBuyerPropertyService"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_4__["ChatService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _services_seller_service__WEBPACK_IMPORTED_MODULE_6__["SellerService"],
            _services_property_service__WEBPACK_IMPORTED_MODULE_7__["PropertyService"],
            _services_pre_buyer_service__WEBPACK_IMPORTED_MODULE_8__["PreBuyerService"],
            _services_pre_build_service__WEBPACK_IMPORTED_MODULE_9__["PreBuildService"]])
    ], ChatPage);
    return ChatPage;
}());



/***/ }),

/***/ "./src/app/services/chat.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/chat.service.ts ***!
  \******************************************/
/*! exports provided: ChatService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatService", function() { return ChatService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/internal/operators/map */ "./node_modules/rxjs/internal/operators/map.js");
/* harmony import */ var rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config_api_end_points__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_config/api.end-points */ "./src/app/_config/api.end-points.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChatService = /** @class */ (function () {
    function ChatService(http) {
        this.http = http;
    }
    ChatService.prototype.getAll = function () {
        return this.http.get(_config_api_end_points__WEBPACK_IMPORTED_MODULE_3__["END_POINT"].CHAT).pipe(Object(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_2__["map"])(function (data) { return data.data; }));
    };
    ChatService.prototype.getByProp = function (propertyId) {
        return this.http
            .get(_config_api_end_points__WEBPACK_IMPORTED_MODULE_3__["END_POINT"].CHAT_PROP_ID + propertyId)
            .pipe(Object(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_2__["map"])(function (data) { return data.data; }));
    };
    ChatService.prototype.getByChatId = function (chatId) {
        return this.http
            .get(_config_api_end_points__WEBPACK_IMPORTED_MODULE_3__["END_POINT"].CHAT_ID + chatId)
            .pipe(Object(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_2__["map"])(function (data) { return data.data; }));
    };
    ChatService.prototype.getByCity = function (cityId) {
        return this.http
            .get(_config_api_end_points__WEBPACK_IMPORTED_MODULE_3__["END_POINT"].CHAT_CITY_ID + cityId)
            .pipe(Object(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_2__["map"])(function (data) { return data.data; }));
    };
    ChatService.prototype.addMsg = function (chatId, newMessages) {
        var body = { _id: chatId, newMessages: newMessages };
        return this.http
            .post(_config_api_end_points__WEBPACK_IMPORTED_MODULE_3__["END_POINT"].CHAT_ADD_MSG, body)
            .pipe(Object(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_2__["map"])(function (data) { return data.data; }));
    };
    ChatService.prototype.addRead = function (chatId, messagesId, uid) {
        var body = { _id: chatId, messagesId: messagesId, uid: uid };
        return this.http
            .post(_config_api_end_points__WEBPACK_IMPORTED_MODULE_3__["END_POINT"].CHAT_ADD_READ, body)
            .pipe(Object(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_2__["map"])(function (data) { return data.data; }));
    };
    ChatService.prototype.newChat = function (buyerId, propertyId, city) {
        if (city === void 0) { city = 'Puebla'; }
        var body = {
            buyer: buyerId,
            property: propertyId,
            city: city,
            messages: []
        };
        return this.http
            .post(_config_api_end_points__WEBPACK_IMPORTED_MODULE_3__["END_POINT"].CHAT, body)
            .pipe(Object(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_2__["map"])(function (data) { return data.data; }));
    };
    ChatService.prototype.deletedById = function (id) {
        return this.http
            .delete(_config_api_end_points__WEBPACK_IMPORTED_MODULE_3__["END_POINT"].CHAT + id)
            .pipe(Object(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_2__["map"])(function (data) { return data.data; }));
    };
    ChatService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ChatService);
    return ChatService;
}());



/***/ })

}]);
//# sourceMappingURL=components-chat-chat-module.js.map
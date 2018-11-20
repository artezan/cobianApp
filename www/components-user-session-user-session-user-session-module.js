(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-user-session-user-session-user-session-module"],{

/***/ "./src/app/components/user-session/user-session/user-session.module.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/components/user-session/user-session/user-session.module.ts ***!
  \*****************************************************************************/
/*! exports provided: UserSessionPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSessionPageModule", function() { return UserSessionPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _user_session_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user-session.page */ "./src/app/components/user-session/user-session/user-session.page.ts");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../material.module */ "./src/app/material.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: '',
        component: _user_session_page__WEBPACK_IMPORTED_MODULE_5__["UserSessionPage"],
    },
];
var UserSessionPageModule = /** @class */ (function () {
    function UserSessionPageModule() {
    }
    UserSessionPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
                _material_module__WEBPACK_IMPORTED_MODULE_6__["AppMaterialModule"],
            ],
            declarations: [_user_session_page__WEBPACK_IMPORTED_MODULE_5__["UserSessionPage"]],
        })
    ], UserSessionPageModule);
    return UserSessionPageModule;
}());



/***/ }),

/***/ "./src/app/components/user-session/user-session/user-session.page.html":
/*!*****************************************************************************!*\
  !*** ./src/app/components/user-session/user-session/user-session.page.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-back-button style=\"color: white !important\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Agregar Cuenta</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <div class=\"user-select-contenet\">\n    <ion-card>\n      <div class=\"center-login\">\n        <img src=\"assets/cobian-light.jpg\" style=\"max-width: 10em\" width=\"50%\" height=\"50%\" alt=\"\">\n      </div>\n      <ion-card-header class=\"center-text\">\n        <ion-card-title>Agregar cuenta</ion-card-title>\n      </ion-card-header>\n      <div *ngIf=\"!isFind\" style=\"margin-top: 2%; margin-bottom: 2%; text-align: center;\">\n        <span class=\"alert alert-danger \">\n          Error usuario y/o contraseña inválido\n        </span>\n      </div>\n      <div class=\"form-center\">\n        <form #loginForm=\"ngForm\">\n          <mdc-text-field class=\"color-text-field\" label=\"Correo\" [(ngModel)]=\"emailInput\" #email=\"ngModel\" id=\"email\"\n            name=\"email\" required [outline]=\"true\" [required]=\"true\" [helperText]=\"weightHelper\"></mdc-text-field>\n          <mdc-text-field-helper-text #weightHelper=\"mdcHelperText\" [validation]=\"true\">\n            <span *ngIf=\"email.dirty || email.touched\">Anota correo</span>\n          </mdc-text-field-helper-text>\n          <mdc-text-field class=\"color-text-field\" (keyup)=\"pressEnter($event)\" label=\"Contraseña\" type=\"password\"\n            [(ngModel)]=\"passInput\" #pass=\"ngModel\" id=\"pass\" name=\"pass\" required [outline]=\"true\" [required]=\"true\"\n            [helperText]=\"weightHelper\"></mdc-text-field>\n          <mdc-text-field-helper-text #weightHelper=\"mdcHelperText\" [validation]=\"true\">\n            <span *ngIf=\"pass.dirty || pass.touched\">Anota Contraseña</span>\n          </mdc-text-field-helper-text>\n\n          <ion-button color=\"primary\" shape=\"round\" expand=\"block\" (click)=\"login()\">Agregar</ion-button>\n        </form>\n      </div>\n      <div class=\"space-buttons\"></div>\n    </ion-card>\n  </div>\n\n</ion-content>"

/***/ }),

/***/ "./src/app/components/user-session/user-session/user-session.page.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/components/user-session/user-session/user-session.page.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".user-select-contenet {\n  margin: 10% 20% 2% 20%; }\n\n.center-login {\n  display: flex;\n  justify-content: center; }\n\n.center-text {\n  text-align: center; }\n\n.form-center {\n  display: flex;\n  justify-content: center;\n  flex-wrap: nowrap; }\n\n.alert {\n  position: relative;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n\n.alert-danger {\n  color: #721c24;\n  background-color: #f8d7da;\n  border-color: #f5c6cb; }\n\n@media (max-width: 900px) {\n  .user-select-contenet {\n    margin: 1% 1% 1% 1%; } }\n"

/***/ }),

/***/ "./src/app/components/user-session/user-session/user-session.page.ts":
/*!***************************************************************************!*\
  !*** ./src/app/components/user-session/user-session/user-session.page.ts ***!
  \***************************************************************************/
/*! exports provided: UserSessionPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSessionPage", function() { return UserSessionPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _services_user_session_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/user-session.service */ "./src/app/services/user-session.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/dist/index.js");
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




var UserSessionPage = /** @class */ (function () {
    function UserSessionPage(loadingController, userSession, storage) {
        this.loadingController = loadingController;
        this.userSession = userSession;
        this.storage = storage;
        this.isFind = true;
        this.getSessions();
    }
    UserSessionPage.prototype.getSessions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sessions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userSession.getSessionsSaved()];
                    case 1:
                        sessions = _a.sent();
                        console.log('sessions', sessions);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserSessionPage.prototype.ngOnInit = function () { };
    UserSessionPage.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var load, userData, currentData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoadingWithOptions()];
                    case 1:
                        load = _a.sent();
                        load.present();
                        return [4 /*yield*/, this.userSession
                                .logginUserSession(this.emailInput, this.passInput)
                                .toPromise()];
                    case 2:
                        userData = _a.sent();
                        if (userData !== 'error') {
                            currentData = {
                                type: userData.type,
                                name: userData.data[0].name,
                                id: userData.data[0]._id,
                                password: userData.data[0].password,
                                email: userData.data[0].email,
                            };
                            this.storage.set('userSessionCurrent', currentData);
                            this.userSession.saveSession(currentData);
                            this.userSession.loggoutWithoutStore();
                            load.dismiss();
                        }
                        else {
                            load.dismiss();
                            this.isFind = false;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserSessionPage.prototype.presentLoadingWithOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Iniciando...',
                            translucent: true,
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserSessionPage.prototype.pressEnter = function (event) {
        if (event.keyCode === 13) {
            this.login();
        }
    };
    UserSessionPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-session',
            template: __webpack_require__(/*! ./user-session.page.html */ "./src/app/components/user-session/user-session/user-session.page.html"),
            styles: [__webpack_require__(/*! ./user-session.page.scss */ "./src/app/components/user-session/user-session/user-session.page.scss")],
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["LoadingController"],
            _services_user_session_service__WEBPACK_IMPORTED_MODULE_2__["UserSessionService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"]])
    ], UserSessionPage);
    return UserSessionPage;
}());



/***/ })

}]);
//# sourceMappingURL=components-user-session-user-session-user-session-module.js.map
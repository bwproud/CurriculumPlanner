"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
// The first page the user sees after creating and account
var WelcomeComponent = (function () {
    function WelcomeComponent() {
        this.onNext = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WelcomeComponent.prototype, "onNext", void 0);
    WelcomeComponent = __decorate([
        core_1.Component({
            selector: 'welcome',
            template: "\n    <topnotification text=\"Welcome, let's get started by selecting what classes you've already taken\"></topnotification>\n    \n    <div class=\"padded-container container\">    \n      <coursescontainer></coursescontainer>\n      <takencourses></takencourses>\n    </div>\n    \n    <div class=\"fixed-action-btn\">\n      <a routerLink=\"/semester\" routerLinkActive=\"active\" class=\"btn-floating btn-large\">\n        <i class=\"large material-icons\">done</i>\n      </a>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], WelcomeComponent);
    return WelcomeComponent;
}());
exports.WelcomeComponent = WelcomeComponent;
//# sourceMappingURL=welcome.component.js.map
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
var TopNotificationComponent = (function () {
    function TopNotificationComponent() {
        this.done = false;
    }
    TopNotificationComponent.prototype.clickOK = function () {
        this.done = true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TopNotificationComponent.prototype, "text", void 0);
    TopNotificationComponent = __decorate([
        core_1.Component({
            selector: 'topnotification',
            template: "\n    <div class=\"row top-row blue lighten-4 z-depth-1\" [class.minimized]=\"done\">\n      <div class=\"center-align\">\n        <div class=\"col text-col s12\">\n          <h5 class=\"flow-text\">{{ text }}</h5>\n          \n          <a *ngIf=\"!done\" class=\"waves-effect waves-light btn-large\" (click)=\"clickOK()\">OK</a>\n        </div>\n      </div>\n    </div>"
        }), 
        __metadata('design:paramtypes', [])
    ], TopNotificationComponent);
    return TopNotificationComponent;
}());
exports.TopNotificationComponent = TopNotificationComponent;
//# sourceMappingURL=topnotification.component.js.map
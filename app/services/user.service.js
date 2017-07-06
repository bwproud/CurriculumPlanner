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
var http_1 = require('@angular/http');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var core_2 = require('angular2-cookie/core');
var router_1 = require('@angular/router');
require('rxjs/add/operator/filter');
var UserService = (function () {
    function UserService(router, http, cookies) {
        var _this = this;
        this.router = router;
        this.http = http;
        this.cookies = cookies;
        this._user = new BehaviorSubject_1.BehaviorSubject(null);
        // If has cookie, use that to get user
        if (cookies.get("auth")) {
            var uid = cookies.get("auth");
            this.http.get("/api/User/" + uid).map(this.extractData).subscribe(function (users) { return _this._user.next(users[0]); }, function (err) { return alert(err); });
        }
    }
    UserService.prototype.extractData = function (res) {
        return res.json() || {};
    };
    /// Get the user as observable that will emit every time the user changes
    UserService.prototype.getUserAsObservable = function () {
        return this._user.asObservable();
    };
    /// Get the current user (once) or wait for a user
    UserService.prototype.getUser = function () {
        return this.getUserAsObservable().filter(function (user) { return user != null; }).take(1);
    };
    UserService.prototype.logout = function () {
        this.cookies.remove("auth");
        this._user.next(null);
        this.router.navigateByUrl('/');
    };
    UserService.prototype.login = function (user) {
        this._user.next(user);
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, core_2.CookieService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
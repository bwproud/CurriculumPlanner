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
var user_service_1 = require('../services/user.service');
var router_1 = require('@angular/router');
var $ = window.$ || {};
var Materialize = window.Materialize || {};
var LoginComponent = (function () {
    function LoginComponent(http, userservice, router) {
        var _this = this;
        this.http = http;
        this.userservice = userservice;
        this.router = router;
        this.clicked = new core_1.EventEmitter();
        this.showPopupLogin = false;
        this.showPopupSignUp = false;
        // Forward if already logged in
        userservice.getUser().subscribe(function () {
            _this.router.navigateByUrl('/welcome');
        });
    }
    LoginComponent.prototype.loginUser = function (email_login, password_login) {
        var _this = this;
        console.log(email_login);
        console.log(password_login);
        this.http.post('/user/login', {
            Username: email_login,
            Password: password_login
        }).map(function (res) { return res.json() || {}; })
            .subscribe(function (user) {
            _this.userservice.login(user);
            _this.router.navigateByUrl('/welcome');
            (function (err) { return alert(err); });
            // Load the UID into the user service, go to welcome page
        });
    };
    LoginComponent.prototype.signUpUser = function (fnSU, lnSU, pwSU, pwSUR, emSU) {
        var _this = this;
        var name = fnSU + " " + lnSU;
        if (fnSU == "" || lnSU == "") {
            Materialize.toast('Please enter a first and last name.', 3000);
        }
        else if (emSU == "") {
            Materialize.toast('Please enter a Username.', 3000);
        }
        else if (pwSU == "" || pwSUR == "" || pwSU == null || pwSUR == null) {
            Materialize.toast('Passwords can not be empty, please re-enter.', 3000);
        }
        else if (pwSU !== pwSUR) {
            Materialize.toast('Passwords do not match, please re-enter.', 3000);
        }
        else if (emSU.substring(emSU.length - 7, emSU.length) !== "unc.edu") {
            Materialize.toast('Not using UNC email as username, please re-enter.', 3000);
        }
        else {
            this.http.post('/user/register', {
                Name: name,
                Username: emSU,
                Password: pwSU
            }).subscribe(function () {
                //Logs the user in immediately after 
                _this.loginUser(emSU, pwSU);
            });
        }
    };
    LoginComponent.prototype.showDetailsLogin = function () {
        this.showPopupLogin = true;
    };
    LoginComponent.prototype.hideDetailsLogin = function () {
        this.showPopupLogin = false;
    };
    LoginComponent.prototype.showDetailsSignUp = function () {
        this.showPopupSignUp = true;
    };
    LoginComponent.prototype.hideDetailsSignUp = function () {
        this.showPopupSignUp = false;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LoginComponent.prototype, "clicked", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            template: "\n<topnotification text=\"Log In or Create a new Account\"></topnotification>\n<div class = \"padded-container access-in-button-container\" style = \"text-align: center\">\n  <a href=\"javascript:void(0)\" (click)=\"showDetailsLogin()\" class=\"waves-effect waves-light btn-large\">Log In</a>\n  <a href=\"javascript:void(0)\" (click)=\"showDetailsSignUp()\"class=\"waves-effect waves-light btn-large\">Sign Up</a>\n</div>\n<!-- Login Popup -->\n<div *ngIf=\"showPopupLogin\" class=\"modal open\" style=\"z-index: 1003; display: block; opacity: 1; transform: scaleX(1); top: 10%;\">\n  <p style = \"text-align: center\">Please login with your UNC Email and Password</p>\n  <div class=\"modal-content\">\n    <div class=\"row\">\n      <form class=\"col s12\">\n        <div class=\"row\">\n          <div class=\"input-field col s12\">\n            <i class=\"material-icons prefix\">account_circle</i>\n            <input #email_login id=\"email-login\" type=\"email\" class=\"validate\">\n            <label for=\"email-login\">Email</label>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-field col s12\">\n            <i class=\"material-icons prefix\">vpn_key</i>\n            <input #password_login id=\"password-login\" type=\"password\" class=\"validate\">\n            <label for=\"password-login\">Password</label>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n    <div class = \"closeButton\" style = \"float: left;\">\n      <a href=\"javascript:void(0)\" (click)=\"hideDetailsLogin()\" class=\"modal-close waves-effect waves-green btn-flat\">Close</a>\n    </div>\n    <div class = \"closeButton\" style = \"float: right;\">\n      <a href=\"javascript:void(0)\" (click)=\"loginUser(email_login.value, password_login.value)\" class=\"modal-close waves-effect waves-green btn-flat\"><i class=\"material-icons prefix\">input</i></a>\n    </div>\n  </div>\n</div>\n<div *ngIf=\"showPopupLogin\" class=\"modal-overlay open\" id=\"materialize-modal-overlay-1\" style=\"z-index: 1002; display: block; opacity: 0.5;\"></div>\n<!-- Sign Up Popup -->\n<div *ngIf=\"showPopupSignUp\" class=\"modal open\" style=\"z-index: 1003; display: block; opacity: 1; transform: scaleX(1); top: 10%; max-height: 100%;\">\n  <p style = \"text-align: center\">Sign Up for your Account, please use your UNC Email for Username</p>\n  <div class=\"modal-content\">\n    <div class=\"row\">\n      <form class=\"col s12\">\n        <div class=\"row\">\n          <div class=\"input-field col s6\">\n            <i class=\"material-icons prefix\">account_circle</i>\n            <input #first_name_signup id=\"first-name-signup\" type=\"text\" class=\"validate\">\n            <label for=\"first-name-signup\">First Name</label>\n          </div>\n          <div class=\"input-field col s6\">\n            <i class=\"material-icons prefix\">account_circle</i>\n            <input #last_name_signup id=\"last-name-signup\" type=\"text\" class=\"validate\">\n            <label for=\"last-name-signup\">Last Name</label>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-field col s12\">\n            <i class=\"material-icons prefix\">perm_identity</i>\n            <input #email_signup id=\"email-signup\" type=\"email\" class=\"validate\">\n            <label for=\"email-signup\">Username (Please Enter UNC Email)</label>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-field col s12\">\n            <i class=\"material-icons prefix\">vpn_key</i>\n            <input #password_signup id=\"password-signup\" type=\"password\" class=\"validate\">\n            <label for=\"password-signup\">Password</label>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-field col s12\">\n            <i class=\"material-icons prefix\">vpn_key</i>\n            <input #password_signup_repeat id=\"password-signup-repeat\" type=\"password\" class=\"validate\">\n            <label for=\"password-signup\">Repeat Password</label>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n    <div class = \"closeButton\" style = \"float: left;\">\n      <a href=\"javascript:void(0)\" (click)=\"hideDetailsSignUp()\" class=\"modal-close waves-effect waves-green btn-flat\">Close</a>\n    </div>\n    <div class = \"closeButton\" style = \"float: right;\">\n      <a href=\"javascript:void(0)\" (click)=\"signUpUser(first_name_signup.value, last_name_signup.value, password_signup.value, password_signup_repeat.value, email_signup.value)\" class=\"modal-close waves-effect waves-green btn-flat\">Sign Up</a>\n    </div>\n  </div>\n</div>\n<div *ngIf=\"showPopupSignUp\" class=\"modal-overlay open\" id=\"materialize-modal-overlay-1\" style=\"z-index: 1002; display: block; opacity: 0.5;\"></div>\n"
        }), 
        __metadata('design:paramtypes', [http_1.Http, user_service_1.UserService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map
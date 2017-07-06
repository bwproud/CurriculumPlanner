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
// The second page the user sees after the welcome page
var SemesterComponent = (function () {
    function SemesterComponent() {
    }
    SemesterComponent = __decorate([
        core_1.Component({
            selector: 'semester',
            template: "\n    <topnotification text=\"Optionally categorize the courses you've taken by semester\"></topnotification>\n    \n    <div class=\"padded-container container\">\n      <semestercategorizer></semestercategorizer>\n    </div>\n    \n    <div class=\"fixed-action-btn\">\n      <a routerLink=\"/home\" routerLinkActive=\"active\" class=\"btn-floating btn-large\">\n        <i class=\"large material-icons\">done</i>\n      </a>\n      <ul>\n        <li><a routerLink=\"/welcome\" routerLinkActive=\"active\" class=\"btn-floating red\"><i class=\"fa fa-arrow-left\"></i></a></li>\n      </ul>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], SemesterComponent);
    return SemesterComponent;
}());
exports.SemesterComponent = SemesterComponent;
//# sourceMappingURL=semester.component.js.map
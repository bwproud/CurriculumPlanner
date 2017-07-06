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
// After user has created an account and selected their taken courses this is the default page
var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.switchTab('forum');
    };
    HomeComponent.prototype.switchTab = function (t) {
        this.tab = t;
    };
    HomeComponent.prototype.isTab = function (t) {
        return this.tab === t;
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            template: "\n    <ul class=\"tabs tabs-transparent blue\">\n      <li class=\"tab\" [class.active]=\"isTab('course_planner')\">\n        <a class=\"grey-text text-lighten-5\" (click)=\"switchTab('course_planner')\">Course Planner</a>\n      </li>\n      <li class=\"tab\" [class.active]=\"isTab('semester_planner')\">\n        <a class=\"grey-text text-lighten-5\" (click)=\"switchTab('semester_planner')\">Semester Planner</a>\n      </li>\n      <li class=\"tab active\" [class.active]=\"isTab('forum')\">\n        <a class=\"grey-text text-lighten-5\" (click)=\"switchTab('forum')\">Course Page</a>\n      </li>\n    </ul>\n  \n    <!-- SVG wrap entire width -->\n    <div [hidden]=\"!isTab('course_planner')\" class=\"col s12\">\n      <div id=\"lines-wrapper\" style=\"padding-left: 5px; height: 800px; overflow-x: scroll; overflow-y: hidden;\">\n        <innersvg></innersvg>\n      </div>\n    </div>\n    <div [hidden]=\"!isTab('forum')\" class=\"col s12\">\n      <div class = \"row\">\n        <coursePage></coursePage>\n      </div>\n    </div>\n  \n    <div class=\"padded-container container\" [hidden]=\"!isTab('semester_planner')\">    \n      <div class=\"col s12\">\n        <semesterplanner></semesterplanner>\n      </div>\n    </div>\n  ",
            styleUrls: ['app/components/home.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map
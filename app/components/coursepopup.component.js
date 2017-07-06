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
var courses_service_1 = require('../services/courses.service');
var CoursePopupComponent = (function () {
    function CoursePopupComponent(coursesService) {
        this.coursesService = coursesService;
        this.open = false;
        this.course = null;
        this.close = new core_1.EventEmitter();
        this.prereqs = [];
    }
    CoursePopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { _this.open = true; }, 50);
    };
    CoursePopupComponent.prototype.setCourse = function (c) {
        var _this = this;
        this.course = c;
        this.prereqsSub = this.coursesService.getPrereqs(this.course).subscribe(function (prereqs) {
            _this.prereqs = prereqs;
        });
    };
    CoursePopupComponent.prototype.setTaken = function () {
        this.coursesService.setAsTaken(this.course);
    };
    CoursePopupComponent.prototype.onClickClose = function () {
        var _this = this;
        this.open = false;
        setTimeout(function () { _this.close.emit(); }, 500);
    };
    CoursePopupComponent.prototype.ngOnDestroy = function () {
        if (this.prereqsSub)
            this.prereqsSub.unsubscribe();
    };
    CoursePopupComponent = __decorate([
        core_1.Component({
            selector: 'coursepopup',
            template: "\n  <div class=\"modal bottom-sheet\" [class.open]=\"open\">\n    <div class=\"modal-content\">\n      <a *ngIf=\"!coursesService.hasTaken(course)\" (click)=\"setTaken()\" class=\"btn pull-right\">\n        Set as taken\n      </a>\n    \n      <h4>Details on {{ course?.code }}</h4>\n      \n      <h6>Category: {{ course?.category }} <small>{{ course?.alt_cat }}</small></h6>\n      \n      <p>{{ course?.long_desc }}</p>\n      \n      <div class=\"row\" *ngIf=\"prereqs.length > 0 && prereqs[0].length > 0\">\n        <div class=\"col m1 s12\">\n          <b>Prereqs</b>\n        </div>\n        <div class=\"col m10 s12\">\n          <div *ngFor=\"let group of prereqs\">\n            <i *ngIf=\"group.length > 1\">One of &nbsp;</i>\n            <course-chip [crossout]=\"coursesService.hasTaken(course)\" *ngFor=\"let course of group\" \n                [closeable]=\"false\" [course]=\"course\"></course-chip>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <a href=\"javascript:void(0)\" (click)=\"onClickClose()\" class=\"modal-action modal-close btn-flat\">\n        Close\n      </a>\n    </div>\n  </div>\n\n  <div class=\"modal-overlay\" [class.open]=\"open\" (click)=\"onClickClose()\"></div>\n\t",
            styleUrls: ['app/components/coursepopup.component.css']
        }), 
        __metadata('design:paramtypes', [courses_service_1.CoursesService])
    ], CoursePopupComponent);
    return CoursePopupComponent;
}());
exports.CoursePopupComponent = CoursePopupComponent;
//# sourceMappingURL=coursepopup.component.js.map
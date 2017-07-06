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
var ng2_dragula_js_1 = require('../../node_modules/ng2-dragula/ng2-dragula.js');
// Drag and drop courses between semesters
var SemesterCategorizerComponent = (function () {
    function SemesterCategorizerComponent(dragulaService, courseService) {
        this.dragulaService = dragulaService;
        this.courseService = courseService;
        this.cardHeight = 0;
        this.semesters = [];
    }
    SemesterCategorizerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dragulaSubscription = this.dragulaService.drop.subscribe(function (value) {
            _this.courseService.forceCourseSemesters(_this.semesters);
        });
        // Inital setup
        var obs = this.courseService.getCourseSemestersAsObservable();
        this.semestersSubscription = obs.subscribe(function (semesters) {
            _this.semesters = semesters;
            _this.onCourseOrderChanged();
        });
    };
    SemesterCategorizerComponent.prototype.addSemester = function () {
        this.courseService.addSemester();
    };
    SemesterCategorizerComponent.prototype.removeSemester = function (id) {
        this.courseService.removeSemester(id);
    };
    // Recalculate height
    SemesterCategorizerComponent.prototype.onCourseOrderChanged = function () {
        var max_cnt = this.courseService.getMaxCoursesInSemester();
        this.cardHeight = (max_cnt + 1) * 37 + 150;
    };
    SemesterCategorizerComponent.prototype.ngOnDestroy = function () {
        if (this.dragulaSubscription)
            this.dragulaSubscription.unsubscribe();
        if (this.semestersSubscription)
            this.semestersSubscription.unsubscribe();
    };
    SemesterCategorizerComponent = __decorate([
        core_1.Component({
            selector: 'semestercategorizer',
            template: "    \n    <table id=\"semester-wrapper\" [style.height.px]=\"cardHeight * 2\">\n      <tbody>\n        <tr id=\"semester-row\">\n          <td class=\"semester\" *ngFor=\"let courses of semesters; let i = index;\" [style.height.px]=\"cardHeight\">\n            <div class=\"card\">\n              <div class=\"card-content\">\n                <span class=\"card-title\">Semester {{ i+1 }}</span>\n                <div class=\"semester-div\" [dragula]=\"'semester'\" [dragulaModel]=\"courses\">\n                  <course-chip [course]=\"c\" [closeable]=\"false\" *ngFor=\"let c of courses\"></course-chip>\n                </div>\n              </div>\n              <div class=\"card-action\" *ngIf=\"semesters.length > 1\">\n                <a href=\"javascript:void(0)\" (click)=\"removeSemester(i)\">Remove</a>\n              </div>\n            </div>\n          </td>\n          <td *ngIf=\"semesters.length < 8\" id=\"add-semester\" class=\"col l3 m4 s6 z-depth-1\" (click)=\"addSemester()\" [style.height]=\"cardHeight + 'px'\">\n            <h4>+</h4>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  ",
            styleUrls: ["app/components/semestercategorizer.component.css"]
        }), 
        __metadata('design:paramtypes', [ng2_dragula_js_1.DragulaService, courses_service_1.CoursesService])
    ], SemesterCategorizerComponent);
    return SemesterCategorizerComponent;
}());
exports.SemesterCategorizerComponent = SemesterCategorizerComponent;
//# sourceMappingURL=semestercategorizer.component.js.map
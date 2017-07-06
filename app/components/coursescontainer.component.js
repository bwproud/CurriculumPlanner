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
var CoursesContainerComponent = (function () {
    function CoursesContainerComponent(coursesService) {
        this.coursesService = coursesService;
        this.coursesMatrix = coursesService.getAvailableCourses();
    }
    CoursesContainerComponent.prototype.onCourseClicked = function (course) {
        this.coursesService.setAsTaken(course);
    };
    CoursesContainerComponent = __decorate([
        core_1.Component({
            selector: 'coursescontainer',
            template: "\n\t<span *ngIf=\"(coursesMatrix | async)?.length > 0\">\n    <div class=\"category-group collection-item\" *ngFor=\"let courses of (coursesMatrix | async)\">\n      <span class=\"title\">\n        <h5>{{courses[0].category}}</h5>\n        <hr />\n      </span>\n      <div class=\"row\">\n        <course *ngFor=\"let c of courses\" [model]=\"c\" (clicked)=\"onCourseClicked($event)\"></course>\n      </div>\n    </div>\n\t</span>\n\t",
            styles: ["\n\t\t.row {\n\t\t\tmargin: 0px;\n\t\t}\n\t"]
        }), 
        __metadata('design:paramtypes', [courses_service_1.CoursesService])
    ], CoursesContainerComponent);
    return CoursesContainerComponent;
}());
exports.CoursesContainerComponent = CoursesContainerComponent;
//# sourceMappingURL=coursescontainer.component.js.map
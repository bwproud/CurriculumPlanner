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
var TakenCoursesComponent = (function () {
    function TakenCoursesComponent(courseService) {
        this.courseService = courseService;
    }
    TakenCoursesComponent.prototype.ngOnInit = function () {
        this.takenCourses = this.courseService.getTakenCourses();
    };
    TakenCoursesComponent.prototype.unsetTaken = function (course) {
        this.courseService.unsetAsTaken(course);
    };
    TakenCoursesComponent = __decorate([
        core_1.Component({
            selector: 'takencourses',
            template: "\n\t<footer>\n\t\t<div class=\"container\">\n\t\t\t<div class=\"row taken-courses\">\n\t\t\t\t<div class=\"col s12\">\n\t\t\t\t\t<course-chip [course]=\"c\" [closeable]=\"true\" (onClose)=\"unsetTaken($event)\" \n              *ngFor=\"let c of takenCourses | async\"></course-chip>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</footer>",
            styles: [
                "\n\t\tfooter {\n\t\t\tbottom: 0;\n\t\t\tposition: fixed;\n\t\t\twidth: 70%;\n\t\t}\n\t\t"
            ]
        }), 
        __metadata('design:paramtypes', [courses_service_1.CoursesService])
    ], TakenCoursesComponent);
    return TakenCoursesComponent;
}());
exports.TakenCoursesComponent = TakenCoursesComponent;
//# sourceMappingURL=takencourses.component.js.map
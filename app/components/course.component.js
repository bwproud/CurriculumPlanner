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
var course_model_1 = require('../models/course.model');
var courses_service_1 = require('../services/courses.service');
var CourseComponent = (function () {
    function CourseComponent(courseService) {
        this.courseService = courseService;
        this.clicked = new core_1.EventEmitter();
    }
    CourseComponent.prototype.onClick = function () {
        this.clicked.emit(this.model);
    };
    CourseComponent.prototype.showDetails = function () {
        // Request for the master page to show the details popup for this course
        this.courseService.requestDetailsPopup(this.model);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', course_model_1.CourseModel)
    ], CourseComponent.prototype, "model", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CourseComponent.prototype, "clicked", void 0);
    CourseComponent = __decorate([
        core_1.Component({
            selector: 'course',
            template: "\n\t<div class=\"col s12 m6 l4\">\n\t\t<div class=\"click-card card\">\n\t\t\t<div class=\"card-content darken-2 white-text\" [ngClass]=\"model.categoryColor\" (click)=\"onClick()\">\n        <span class=\"badge white-text darken-3\" [ngClass]=\"model.altCategoryColor\">{{ model.alt_cat }}</span>\n\t\t\t\t<span class=\"card-title\">\n          {{model.code}}\n        </span>\n\t\t\t\t<p>{{model.desc}}</p>\n\t\t\t</div>\n      <div class=\"card-action\">\n        <a href=\"javascript:void(0)\" (click)=\"showDetails()\">Details</a>\n      </div>\n\t\t</div>\n\t</div>"
        }), 
        __metadata('design:paramtypes', [courses_service_1.CoursesService])
    ], CourseComponent);
    return CourseComponent;
}());
exports.CourseComponent = CourseComponent;
//# sourceMappingURL=course.component.js.map
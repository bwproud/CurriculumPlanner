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
var course_model_1 = require('../models/course.model');
var CourseChipComponent = (function () {
    function CourseChipComponent(courseService) {
        this.courseService = courseService;
        this.onClose = new core_1.EventEmitter();
    }
    CourseChipComponent.prototype.onClickClose = function () {
        if (this.closeable)
            this.onClose.emit(this.course);
    };
    CourseChipComponent.prototype.onDoubleClick = function () {
        this.courseService.requestDetailsPopup(this.course);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', course_model_1.CourseModel)
    ], CourseChipComponent.prototype, "course", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CourseChipComponent.prototype, "closeable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CourseChipComponent.prototype, "crossout", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CourseChipComponent.prototype, "onClose", void 0);
    CourseChipComponent = __decorate([
        core_1.Component({
            selector: 'course-chip',
            template: "\n  <div class=\"chip white-text darken-2\" [class.crossout]=\"crossout\" [ngClass]=\"course.categoryColor\" (dblclick)=\"onDoubleClick()\">\n    {{ course.code }}\n    <i class=\"close material-icons\" *ngIf=\"closeable\" (click)=\"onClickClose()\">close</i>\n  </div>\n\t",
            styles: ["\n    .chip {\n      -webkit-touch-callout: none;\n      -webkit-user-select: none;\n      -khtml-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      user-select: none;\n    }\n    .crossout {\n      text-decoration: line-through;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [courses_service_1.CoursesService])
    ], CourseChipComponent);
    return CourseChipComponent;
}());
exports.CourseChipComponent = CourseChipComponent;
//# sourceMappingURL=coursechip.component.js.map
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
require("../../../lines/lines.js");
// Force global
var Snap = window.Snap || {};
// After user has created an account and selected their taken courses this is the default page
var InnerSVGComponent = (function () {
    function InnerSVGComponent(courseService) {
        this.courseService = courseService;
    }
    InnerSVGComponent.prototype.ngAfterViewInit = function () {
        window.loadSVG();
        this.courseService.getTakenCourses().subscribe(function (courses) {
            for (var _i = 0, courses_1 = courses; _i < courses_1.length; _i++) {
                var course = courses_1[_i];
                var s = Snap("#lines-graphic");
                var c = s.select("g#cid-" + course.CID);
                if (c)
                    c.attr({ fill: "green" });
            }
        });
    };
    InnerSVGComponent.prototype.open = function (cid) {
        var _this = this;
        this.courseService.getById(cid).then(function (course) {
            _this.courseService.requestDetailsPopup(course);
        });
    };
    InnerSVGComponent = __decorate([
        core_1.Component({
            selector: 'innersvg',
            templateUrl: 'lines/line-thing.html',
            styleUrls: ['app/components/home.component.css']
        }), 
        __metadata('design:paramtypes', [courses_service_1.CoursesService])
    ], InnerSVGComponent);
    return InnerSVGComponent;
}());
exports.InnerSVGComponent = InnerSVGComponent;
//# sourceMappingURL=innersvg.component.js.map
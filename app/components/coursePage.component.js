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
var user_service_1 = require('../services/user.service');
var $ = window.$ || {};
var Materialize = window.Materialize || {};
//loads the posts and comments from a particular course
var CoursePageComponent = (function () {
    function CoursePageComponent(courseService, userService) {
        this.courseService = courseService;
        this.userService = userService;
        this.user = userService.getUser();
        this.open = true;
        this.cid = null;
        this.course = "Not Entered";
        this.forumB = false;
        this.recourcesB = false;
    }
    CoursePageComponent.prototype.setCurrentUserClass = function (cidI, courseI) {
        this.cid = cidI;
        this.course = courseI;
        this.showForum();
        $('ul.tabs').tabs();
    };
    CoursePageComponent.prototype.showForum = function () {
        $("#forumTab > a").addClass("active");
        $("#resourcesTab > a").removeClass("active");
        if (this.course === "Not Entered") {
            // alert("Please select a course first");
            Materialize.toast('<span class="red-text">Please select a course first</span>', 5000);
        }
        else {
            this.forumB = true;
            this.recourcesB = false;
        }
    };
    CoursePageComponent.prototype.showResources = function () {
        $("#forumTab > a").removeClass("active");
        $("#resourcesTab > a").addClass("active");
        if (this.course === "Not Entered") {
            // alert("Please select a course first");
            Materialize.toast('<span class="red-text">Please select a course first</span>', 5000);
        }
        else {
            this.forumB = false;
            this.recourcesB = true;
        }
    };
    CoursePageComponent.prototype.ngAfterViewInit = function () {
        // document ready
        $(".collapsible").collapsible();
        $('ul.tabs').tabs();
    };
    CoursePageComponent = __decorate([
        core_1.Component({
            selector: 'coursePage',
            template: "\n<div class=\"row\">\n    <div class=\"col s3\">\n        <ul id=\"slide-out\" style=\"position:absolute; z-index: 10;\" class=\"side-nav\">\n            <li>\n                <div class=\"userView\" style=\"width: 300px; height: 175px;\">\n                    <div class=\"background\">\n                        <img src=\"images/chapelhill-grad.png\">\n                    </div>\n                    <a href=\"#!name\"><span class=\"white-text name\" style = \"text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\">{{ (user | async)?.Name }}</span></a>\n                    <a href=\"#!email\"><span class=\"white-text email\" style = \"text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\">{{(user | async)?.Username}}</span></a>\n                    <a href=\"#!class\"><span class=\"white-text email\" style = \"text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\">Selected Course: {{ course }}</span></a>\n                </div>\n            </li>\n            <ul class=\"collapsible collapsible-accordion\" data-collapsible=\"accordion\">\n                <li [class.active]=\"open\">\n                    <div class=\"collapsible-header\" (click)=\"open = !open\" [class.active]=\"open\"><i class=\"fa fa-book\" aria-hidden=\"true\"></i>Class</div>\n                    <div class=\"collapsible-body\">\n                        <ul>\n                            <div>\n                                <li style=\"cursor: pointer\" class=\"collection-item\" *ngFor=\"let course of courseService.getTakenCourses() | async\" ng-class=\"{course.code: true}\" href=\"javascript:void(0)\" (click)=\"setCurrentUserClass(course.CID, course.code)\">\n                                    <a>\n                \t\t\t\t\t\t{{ course.code }}\n              \t\t\t\t\t\t</a>\n                                </li>\n                            </div>\n                        </ul>\n                    </div>\n                </li>\n            </ul>\n        </ul>\n    </div>\n    <div class=\"col s9\">\n    \t<div *ngIf=\"course !== 'Not Entered'\" class=\"row\" >\n\t\t    <div class=\"col s12\">\n\t\t        <ul class=\"tabs\">\n\t\t            <li class=\"tab col s12\" id=\"forumTab\"><a (click)=\"showForum()\" class=\"active\">Forum</a></li>\n\t\t        </ul>\n\t\t    </div>\n\t\t</div>\n\n\t\t<div class=\"form-wrapper\">\n        <div *ngIf=\"!forumB && !recourcesB\">\n            <p>Select a course to access its Forum.</p>\n        </div>\n        <div *ngIf=\"forumB && !recourcesB\">\n            <formPage [cid]=\"cid\" [course]=\"course\"></formPage>\n        </div>\n    </div>\n    </div>\n    \n</div>\n\n\n",
            styles: [
                "\n.side-nav {\ntransform: translateX(0px);\nmargin-top: 112px;\n}\n.collapsible li.active .collapsible-body {\ndisplay: block !important;\n}\n\n.tab > a.active {\n\tborder-bottom: 2px solid #ee6e73;\n}\n"
            ]
        }), 
        __metadata('design:paramtypes', [courses_service_1.CoursesService, user_service_1.UserService])
    ], CoursePageComponent);
    return CoursePageComponent;
}());
exports.CoursePageComponent = CoursePageComponent;
//# sourceMappingURL=coursePage.component.js.map
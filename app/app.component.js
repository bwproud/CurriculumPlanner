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
var coursepopup_component_1 = require('./components/coursepopup.component');
var courses_service_1 = require('./services/courses.service');
var user_service_1 = require('./services/user.service');
var AppComponent = (function () {
    function AppComponent(courseService, userService, componentFactoryResolver) {
        var _this = this;
        this.courseService = courseService;
        this.userService = userService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.logged_in = false;
        userService.getUserAsObservable().subscribe(function (user) {
            _this.logged_in = (user != null);
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Global handler for when someone requests a course popup
        this.courseService.courseDetailsPopupReq.subscribe(function (c) {
            // Close any already open dialogs
            _this.popupAnchor.clear();
            // Create component
            var popupComponentFactory = _this.componentFactoryResolver.resolveComponentFactory(coursepopup_component_1.CoursePopupComponent);
            var popupComponentRef = _this.popupAnchor.createComponent(popupComponentFactory);
            // Bind inputs and outputs
            popupComponentRef.instance.setCourse(c);
            popupComponentRef.instance.close.subscribe(function () {
                popupComponentRef.destroy();
            });
        });
    };
    AppComponent.prototype.logout = function () {
        this.userService.logout();
    };
    AppComponent.prototype.search = function () {
        this.search_res = this.courseService.findCourses(this.txt_search);
    };
    AppComponent.prototype.clearSearch = function () {
        this.txt_search = "";
        this.search_res = null;
    };
    AppComponent.prototype.showDetails = function (course) {
        // Request for the master page to show the details popup for this course
        this.courseService.requestDetailsPopup(course);
    };
    AppComponent.prototype.onActivate = function (e, outlet) {
        outlet.scrollTop = 0;
    };
    __decorate([
        core_1.ViewChild('popupAnchor', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], AppComponent.prototype, "popupAnchor", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n  <nav class=\"blue lighten-1\" *ngIf=\"logged_in\">\n    <div class=\"nav-wrapper row\">\n      <div class=\"col l11 s10\" style=\"height: 100%\">\n        <div class=\"input-field\">\n          <input [(ngModel)]=\"txt_search\" type=\"search\" (keyup)=\"search()\">\n          <label for=\"search\"><i class=\"material-icons\">search</i></label>\n          <i class=\"material-icons\" (click)=\"clearSearch()\">close</i>\n        </div>\n      </div>\n      <div class=\"col l1 s2\" style=\"height: 100%\">\n        <a href=\"javascript:;\" (click)=\"logout()\"><i class=\"fa fa-fw fa-sign-out fa-3\"></i></a>\n      </div>\n    </div>\n  </nav>\n  \n  <ul class=\"dropdown-content\" [class.active]=\"(search_res | async)?.length > 0\" (click)=\"clearSearch()\">\n    <li *ngFor=\"let course of search_res | async\" (click)=\"showDetails(course)\">\n      <a href=\"javascript:;\">{{ course.code }} - Details</a>\n    </li>\n  </ul>\n  \n  <router-outlet (activate)=\"onActivate($event, outlet)\" #outlet></router-outlet>\n  \n  <div #popupAnchor></div>\n  ",
            styles: ["\n    .dropdown-content.active {\n      display: block;\n      width: 100%;\n      opacity: 1;\n      z-index: 1005;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [courses_service_1.CoursesService, user_service_1.UserService, core_1.ComponentFactoryResolver])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
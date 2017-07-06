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
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var platform_browser_1 = require('@angular/platform-browser');
var ng2_dragula_js_1 = require('../node_modules/ng2-dragula/ng2-dragula.js');
var cookies_service_1 = require('../node_modules/angular2-cookie/services/cookies.service');
var user_service_1 = require('./services/user.service');
var courses_service_1 = require('./services/courses.service');
var app_component_1 = require('./app.component');
var home_component_1 = require('./components/home.component');
var login_component_1 = require('./components/login.component');
var course_component_1 = require('./components/course.component');
var welcome_component_1 = require('./components/welcome.component');
var innersvg_component_1 = require('./components/innersvg.component');
var semester_component_1 = require('./components/semester.component');
var coursechip_component_1 = require('./components/coursechip.component');
var coursepopup_component_1 = require('./components/coursepopup.component');
var takencourses_component_1 = require('./components/takencourses.component');
var topnotification_component_1 = require('./components/topnotification.component');
var coursescontainer_component_1 = require('./components/coursescontainer.component');
var semestercategorizer_component_1 = require('./components/semestercategorizer.component');
var courseplanner_component_1 = require('./components/home/courseplanner.component');
var semesterplanner_component_1 = require('./components/home/semesterplanner.component');
var coursePage_component_1 = require('./components/coursePage.component');
var resources_component_1 = require('./components/resources.component');
var form_component_1 = require('./components/form.component');
var post_component_1 = require('./components/post.component');
var comment_component_1 = require('./components/comment.component');
var appRoutes = [
    { path: 'semester', component: semester_component_1.SemesterComponent },
    { path: 'welcome', component: welcome_component_1.WelcomeComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: '', component: login_component_1.LoginComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                ng2_dragula_js_1.DragulaModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                router_1.RouterModule.forRoot(appRoutes, { useHash: true })
            ],
            providers: [
                user_service_1.UserService,
                courses_service_1.CoursesService,
                ng2_dragula_js_1.DragulaService,
                cookies_service_1.CookieService
            ],
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                login_component_1.LoginComponent,
                course_component_1.CourseComponent,
                welcome_component_1.WelcomeComponent,
                innersvg_component_1.InnerSVGComponent,
                semester_component_1.SemesterComponent,
                coursechip_component_1.CourseChipComponent,
                coursepopup_component_1.CoursePopupComponent,
                takencourses_component_1.TakenCoursesComponent,
                topnotification_component_1.TopNotificationComponent,
                coursescontainer_component_1.CoursesContainerComponent,
                semestercategorizer_component_1.SemesterCategorizerComponent,
                courseplanner_component_1.CoursePlannerComponent,
                semesterplanner_component_1.SemesterPlannerComponent,
                coursePage_component_1.CoursePageComponent,
                resources_component_1.ResourceComponent,
                form_component_1.FormComponent,
                post_component_1.PostComponent,
                comment_component_1.CommentComponent
            ],
            entryComponents: [coursepopup_component_1.CoursePopupComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
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
var course_model_1 = require('../models/course.model');
var EQClassesTracker_1 = require('./util/EQClassesTracker');
var CourseSemesterTracker_1 = require('./util/CourseSemesterTracker');
var CourseMap_1 = require('./util/CourseMap');
var user_service_1 = require('./user.service');
var Observable_1 = require('rxjs/Observable');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var Subject_1 = require('rxjs/Subject');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/take');
require('rxjs/add/operator/map');
var CoursesService = (function () {
    function CoursesService(http, userService) {
        var _this = this;
        this.http = http;
        this.userService = userService;
        this.planToTakeCourses = {};
        // Observable to invoke to request the course details popup
        this.subjectCourseDetailsPopup = new Subject_1.Subject();
        this.courseDetailsPopupReq = this.subjectCourseDetailsPopup.asObservable();
        this.takenCourses = {};
        this.takenEQClass = new EQClassesTracker_1.EQClassesTracker();
        this.courseSemesters = new CourseSemesterTracker_1.CourseSemesterTracker(this);
        this._courses = new BehaviorSubject_1.BehaviorSubject(null);
        this.loadAllCourses().subscribe(function (courses) {
            var map = new CourseMap_1.CourseMap();
            for (var _i = 0, courses_1 = courses; _i < courses_1.length; _i++) {
                var course = courses_1[_i];
                map.add(course);
            }
            _this._courses.next(map);
        });
        // Load already taken courses each time the user changes
        this.userService.getUserAsObservable().subscribe(function (user) {
            _this.initCaches();
            if (user == null)
                return;
            user.ClassesTaken.forEach(function (taken_course) {
                _this.getById(taken_course.Class).then(function (course) {
                    _this.setAsTaken(course, taken_course.Semester, false);
                });
            });
        });
    }
    CoursesService.prototype.initCaches = function () {
        this.takenCourses = {};
        this.takenEQClass.reset();
        this.courseSemesters.reset();
    };
    /// Get courses (once), once they have loaded
    CoursesService.prototype.getCourses = function () {
        return this._courses.asObservable().filter(function (courses) { return courses != null; }).take(1);
    };
    CoursesService.prototype.loadAllCourses = function () {
        var _this = this;
        return this.http.get("/api/Class").map(function (res) {
            var arr = [];
            var json = res.json() || [];
            for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
                var c_json = json_1[_i];
                arr.push(_this.parseCourse(c_json));
            }
            return arr;
        });
    };
    CoursesService.prototype.extractData = function (res) {
        return res.json() || {};
    };
    /// Utility to convert json version of a course to a TypeScript Model Object
    CoursesService.prototype.parseCourse = function (c) {
        var cid = c.CID;
        var main_categ = c.Categories.length > 0 ? c.Categories[0].Name : "Other";
        var alt_categ = c.Categories.length > 1 ? c.Categories[1].Name : "";
        var code = c.Name.split(":")[0];
        var short_desc = c.Name.split(":")[1].trim();
        var full_desc = c.Description;
        var eq_groups = c.EQClasses.map(function (c) { return c.EQClass; });
        var prereqs = c.Prerequisites.map(function (c) { return c.EQClass; });
        return new course_model_1.CourseModel(cid, main_categ, alt_categ, code, short_desc, full_desc, eq_groups, prereqs);
    };
    CoursesService.prototype.getById = function (cid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Once courses are loaded, search through them and try to find the given cid
            _this.getCourses().subscribe(function (courses) {
                var course = courses.getById(cid);
                if (course)
                    resolve(course);
                else
                    reject();
            });
        });
    };
    CoursesService.prototype.hasTaken = function (course) {
        if (course == null)
            return false;
        else
            return !!this.takenCourses[course.CID];
    };
    CoursesService.prototype.setAsTaken = function (course, semester, postback) {
        var _this = this;
        if (semester === void 0) { semester = 0; }
        if (postback === void 0) { postback = true; }
        if (this.takenCourses[course.CID])
            return;
        // Update cache    
        this.takenCourses[course.CID] = true;
        // Update equivalence codes and notify view (order here matters)
        this.takenEQClass.addCourse(course);
        this.courseSemesters.setCourseSemester(course, semester);
        if (postback) {
            // Postback
            this.userService.getUser().subscribe(function (user) {
                _this.http.post("/api/ClassesTaken", {
                    User: user.UID,
                    Class: course.CID,
                    Semester: semester
                }).subscribe(function (res) { }, function (err) { return alert(err); });
            });
        }
    };
    CoursesService.prototype.unsetAsTaken = function (course) {
        var _this = this;
        if (!this.takenCourses[course.CID])
            return;
        var semester = this.courseSemesters.getCourseSemester(course);
        // Update cache
        this.takenCourses[course.CID] = false;
        // Update equivalence codes and notify view
        this.takenEQClass.removeCourse(course);
        this.courseSemesters.removeCourse(course);
        // Postback
        this.userService.getUser().subscribe(function (user) {
            _this.http.delete("/api/ClassesTaken/" + course.CID + "," + user.UID).subscribe(function (res) { return console.log(res); }, function (err) { return console.log(err); });
        });
    };
    CoursesService.prototype.getCourseSemestersAsObservable = function () {
        return this.courseSemesters.asObservable();
    };
    CoursesService.prototype.addSemester = function () {
        this.courseSemesters.addEmptySemester();
    };
    CoursesService.prototype.setSemester = function (course, semester) {
        this.courseSemesters.setCourseSemester(course, semester);
    };
    /// Force courses into the given semesters
    CoursesService.prototype.forceCourseSemesters = function (semesters) {
        this.courseSemesters.forceCourseSemesters(semesters);
    };
    CoursesService.prototype.removeSemester = function (id) {
        this.courseSemesters.removeSemester(id);
    };
    CoursesService.prototype.getMaxCoursesInSemester = function () {
        return this.courseSemesters.getMaxCoursesInSemester();
    };
    /// Get all active courses sorted by category
    CoursesService.prototype.getAvailableCourses = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            // Will update each time the taken EQ classes changes
            _this.takenEQClass.asObservable().subscribe(function (takenEQClass) {
                // Wait for courses to be loaded
                _this.getCourses().subscribe(function (courses) {
                    var categories = {};
                    for (var _i = 0, _a = courses.asArray(); _i < _a.length; _i++) {
                        var course = _a[_i];
                        if (!_this.hasTaken(course) && takenEQClass.hasCoursesFor(course)) {
                            var my_cat = categories[course.category];
                            if (!my_cat) {
                                my_cat = [];
                                categories[course.category] = my_cat;
                            }
                            my_cat.push(course);
                        }
                    }
                    observer.next(Object.values(categories));
                });
            });
        });
    };
    // Get taken courses (unsorted)
    CoursesService.prototype.getTakenCourses = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            // Will update each time the taken EQ classes changes
            _this.takenEQClass.asObservable().subscribe(function () {
                // Wait for courses to be loaded
                _this.getCourses().subscribe(function (courses) {
                    var res = [];
                    for (var _i = 0, _a = courses.asArray(); _i < _a.length; _i++) {
                        var course = _a[_i];
                        if (_this.hasTaken(course))
                            res.push(course);
                    }
                    observer.next(res);
                });
            });
        });
    };
    /// Find courses by name (autocomplete)
    CoursesService.prototype.findCourses = function (text, limit) {
        var _this = this;
        if (limit === void 0) { limit = 10; }
        return Observable_1.Observable.create(function (observer) {
            _this.getCourses().subscribe(function (courses) {
                if (text.length == 0)
                    return [];
                text = text.toLowerCase();
                var res = [];
                for (var _i = 0, _a = courses.asArray(); _i < _a.length; _i++) {
                    var course = _a[_i];
                    if (course.code.toLowerCase().includes(text) || course.desc.toLowerCase().includes(text)) {
                        res.push(course);
                        if (res.length >= limit)
                            break;
                    }
                }
                observer.next(res);
            });
        });
    };
    /// Get the prereqs (from DB) for a given course, where at least one is required from each inner array
    CoursesService.prototype.getPrereqs = function (course) {
        var _this = this;
        if (course == null)
            return null;
        return this.http.get("/api/prereqs/" + course.CID).map(function (res) {
            var prereq_groups = res.json() || [];
            return prereq_groups.map(function (g) { return g.map(function (c) { return _this.parseCourse(c); }); });
        });
    };
    /// Call to broadcast a request for details to be shown on a given course
    CoursesService.prototype.requestDetailsPopup = function (c) {
        if (c == null)
            return;
        this.subjectCourseDetailsPopup.next(c);
    };
    CoursesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, user_service_1.UserService])
    ], CoursesService);
    return CoursesService;
}());
exports.CoursesService = CoursesService;
//# sourceMappingURL=courses.service.js.map
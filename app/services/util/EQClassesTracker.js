"use strict";
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/take');
require('rxjs/add/operator/map');
var EQClassesTracker = (function () {
    function EQClassesTracker() {
        this.eqClasses = {};
        this._onChange = new BehaviorSubject_1.BehaviorSubject(this);
    }
    EQClassesTracker.prototype.reset = function () {
        this.eqClasses = {};
        this._onChange.next(this);
    };
    EQClassesTracker.prototype.asObservable = function () {
        return this._onChange.asObservable();
    };
    EQClassesTracker.prototype.getTracker = function (eqcode) {
        if (this.eqClasses[eqcode]) {
            return this.eqClasses[eqcode];
        }
        else {
            var tracker = new EQClassTracker();
            this.eqClasses[eqcode] = tracker;
            return tracker;
        }
    };
    EQClassesTracker.prototype.addCourse = function (course) {
        var changed = false;
        for (var _i = 0, _a = course.eqcodes; _i < _a.length; _i++) {
            var eqcode = _a[_i];
            var tracker = this.getTracker(eqcode);
            if (tracker.addCourse(course)) {
                changed = true;
            }
        }
        if (changed)
            this._onChange.next(this);
    };
    EQClassesTracker.prototype.removeCourse = function (course) {
        var changed = false;
        for (var _i = 0, _a = course.eqcodes; _i < _a.length; _i++) {
            var eqcode = _a[_i];
            var tracker = this.getTracker(eqcode);
            if (tracker.removeCourse(course)) {
                changed = true;
            }
        }
        if (changed)
            this._onChange.next(this);
    };
    EQClassesTracker.prototype.hasCoursesFor = function (course) {
        for (var _i = 0, _a = course.prereq_eqcodes; _i < _a.length; _i++) {
            var pr_code = _a[_i];
            if (pr_code === 0)
                continue;
            var tracker = this.getTracker(pr_code);
            if (!tracker.hasOne())
                return false;
        }
        return true;
    };
    return EQClassesTracker;
}());
exports.EQClassesTracker = EQClassesTracker;
// Private utility class
var EQClassTracker = (function () {
    function EQClassTracker() {
        this.matchedCID = {};
    }
    // Update to include the given course, return true if updating made a change
    EQClassTracker.prototype.addCourse = function (course) {
        if (!this.matchedCID[course.CID]) {
            this.matchedCID[course.CID] = true;
            return true;
        }
        else {
            return false;
        }
    };
    // Update to exclude a given course, return true if updating made a change
    EQClassTracker.prototype.removeCourse = function (course) {
        if (this.matchedCID[course.CID]) {
            delete this.matchedCID[course.CID];
            return true;
        }
        else {
            return false;
        }
    };
    EQClassTracker.prototype.hasOne = function () {
        return Object.keys(this.matchedCID).length > 0;
    };
    return EQClassTracker;
}());
//# sourceMappingURL=EQClassesTracker.js.map
"use strict";
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/take');
require('rxjs/add/operator/map');
var CourseSemesterTracker = (function () {
    function CourseSemesterTracker(courseService) {
        this.courseService = courseService;
        this.semesters = [[]];
        this._onChange = new BehaviorSubject_1.BehaviorSubject(this.semesters);
    }
    CourseSemesterTracker.prototype.reset = function () {
        this.semesters = [[]];
        this.emitChange();
    };
    CourseSemesterTracker.prototype.asObservable = function () {
        return this._onChange.asObservable();
    };
    CourseSemesterTracker.prototype.addEmptySemester = function () {
        // Limit to 8 semesters
        if (this.semesters.length < 8) {
            this.semesters.push([]);
            this.emitChange();
        }
    };
    CourseSemesterTracker.prototype.removeSemester = function (remove_id) {
        // Can't remove last semester
        if (this.semesters.length > 1) {
            var removed = this.semesters.splice(remove_id, 1)[0];
            var new_id = Math.max(0, remove_id - 1);
            for (var _i = 0, removed_1 = removed; _i < removed_1.length; _i++) {
                var course = removed_1[_i];
                this.setCourseSemester(course, new_id, false);
            }
            this.emitChange();
        }
    };
    // Get the [ semester, idx in semester ]
    CourseSemesterTracker.prototype.getCourseSemesterLocation = function (course) {
        for (var i = 0, ii = this.semesters.length; i < ii; i++) {
            var semester = this.semesters[i];
            for (var j = 0, jj = semester.length; j < jj; j++) {
                var sc = semester[j];
                if (sc.CID == course.CID) {
                    return [i, j];
                }
            }
        }
        return [-1, -1];
    };
    CourseSemesterTracker.prototype.getCourseSemester = function (course) {
        return this.getCourseSemesterLocation(course)[0];
    };
    CourseSemesterTracker.prototype.setCourseSemester = function (course, idx, emit) {
        var _this = this;
        if (emit === void 0) { emit = true; }
        if (idx < 0 || idx > 10)
            return; // Invalid
        var old_loc = this.getCourseSemesterLocation(course);
        if (old_loc[0] == idx) {
            // If already in correct semester
            return;
        }
        else if (old_loc[0] >= 0) {
            // Remove from old location
            var old_semester_idx = old_loc[0];
            this.semesters[old_semester_idx].splice(old_loc[1], 1);
            this.courseService.userService.getUser().subscribe(function (user) {
                _this.courseService.http.delete("/api/ClassesTaken/" + course.CID + "," + user.UID);
            });
        }
        // Create new semesters if need
        while (this.semesters.length <= idx) {
            this.semesters.push([]);
        }
        this.semesters[idx].push(course);
        this.courseService.userService.getUser().subscribe(function (user) {
            _this.courseService.http.post("/api/ClassesTaken", {
                User: user.UID,
                Class: course.CID,
                Semester: idx
            });
        });
        if (emit)
            this.emitChange();
    };
    /// Force all the semesters for the user
    CourseSemesterTracker.prototype.forceCourseSemesters = function (semesters) {
        var _this = this;
        this.courseService.userService.getUser().subscribe(function (user) {
            for (var idx = 0, ii = semesters.length; idx < ii; idx++) {
                var semester = semesters[idx];
                for (var _i = 0, semester_1 = semester; _i < semester_1.length; _i++) {
                    var course = semester_1[_i];
                    var body = {
                        User: user.UID,
                        Class: course.CID,
                        Semester: idx
                    };
                    var old_idx = _this.getCourseSemester(course);
                    if (old_idx >= 0)
                        if (old_idx != idx)
                            _this.courseService.http.put("/api/ClassesTaken/" + course.CID + "," + user.UID, body)
                                .subscribe(function () { return console.log("ok"); });
                        else
                            _this.courseService.http.post("/api/ClassesTaken", body);
                }
            }
            _this.semesters = semesters;
            _this.emitChange();
        });
    };
    CourseSemesterTracker.prototype.removeCourse = function (course) {
        var old_loc = this.getCourseSemesterLocation(course);
        if (old_loc[0] >= 0) {
            this.semesters[old_loc[0]].splice(old_loc[1], 1);
            this.emitChange();
        }
    };
    CourseSemesterTracker.prototype.getMaxCoursesInSemester = function () {
        var maxVal = 0;
        for (var _i = 0, _a = this.semesters; _i < _a.length; _i++) {
            var semester = _a[_i];
            if (semester.length > maxVal)
                maxVal = semester.length;
        }
        return maxVal;
    };
    CourseSemesterTracker.prototype.emitChange = function () {
        // Clone semester to make internal state immutable from outside
        var cloned_semesters = [];
        for (var _i = 0, _a = this.semesters; _i < _a.length; _i++) {
            var semester = _a[_i];
            var cloned_semester = [];
            for (var _b = 0, semester_2 = semester; _b < semester_2.length; _b++) {
                var course = semester_2[_b];
                cloned_semester.push(course);
            }
            cloned_semesters.push(cloned_semester);
        }
        this._onChange.next(cloned_semesters);
    };
    return CourseSemesterTracker;
}());
exports.CourseSemesterTracker = CourseSemesterTracker;
//# sourceMappingURL=CourseSemesterTracker.js.map
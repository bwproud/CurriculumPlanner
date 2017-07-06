"use strict";
var CourseMap = (function () {
    function CourseMap() {
        this.courses = {};
    }
    CourseMap.prototype.add = function (course) {
        this.courses[course.CID] = course;
    };
    CourseMap.prototype.getById = function (cid) {
        return this.courses[cid];
    };
    CourseMap.prototype.asArray = function () {
        return Object.values(this.courses);
    };
    return CourseMap;
}());
exports.CourseMap = CourseMap;
//# sourceMappingURL=CourseMap.js.map
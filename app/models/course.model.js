"use strict";
/// Static class that contains what was returned from the server, to modify use course service
var CourseModel = (function () {
    function CourseModel(CID, category, alt_cat, code, desc, long_desc, eqcodes, prereq_eqcodes) {
        if (desc === void 0) { desc = ""; }
        if (long_desc === void 0) { long_desc = ""; }
        if (eqcodes === void 0) { eqcodes = []; }
        if (prereq_eqcodes === void 0) { prereq_eqcodes = []; }
        this.CID = CID;
        this.category = category;
        this.alt_cat = alt_cat;
        this.code = code;
        this.desc = desc;
        this.long_desc = long_desc;
        this.eqcodes = eqcodes;
        this.prereq_eqcodes = prereq_eqcodes;
        if (code.length < 8)
            throw "Invalid code: ${code}!";
        else if (CID == null)
            throw "Must provide the course's CID!";
        else if (category == null || alt_cat == null)
            throw "Course categories are required!";
        else if (eqcodes.length == 0)
            throw "Must provide at least one equivalence group for " + code;
    }
    /// Utility function to consistently convert a string to a color
    CourseModel.prototype.strToColor = function (s) {
        var code = s.split("").reduce(function (a, b) { a = (a * 31) + b.charCodeAt(0); return a | 0; }, 0);
        code = Math.abs(code) % CourseModel.CAT_COLORS.length;
        return CourseModel.CAT_COLORS[code];
    };
    Object.defineProperty(CourseModel.prototype, "categoryColor", {
        get: function () {
            return this.strToColor(this.category);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CourseModel.prototype, "altCategoryColor", {
        get: function () {
            return this.strToColor(this.alt_cat);
        },
        enumerable: true,
        configurable: true
    });
    CourseModel.CAT_COLORS = [
        "red", "pink", "purple", "deep-purple", "indigo", "blue", "light-blue", "cyan", "teal", "green",
        "light-green", "lime", "yellow", "amber", "orange", "deep-orange", "blue-grey", "brown"
    ];
    return CourseModel;
}());
exports.CourseModel = CourseModel;
//# sourceMappingURL=course.model.js.map
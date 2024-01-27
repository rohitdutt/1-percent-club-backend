"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRIORITY = exports.TASK_STATUS = void 0;
var TASK_STATUS;
(function (TASK_STATUS) {
    TASK_STATUS["PENDING"] = "Pending";
    TASK_STATUS["COMPLETED"] = "Completed";
    TASK_STATUS["IN_PROGRESS"] = "In Progress";
})(TASK_STATUS || (exports.TASK_STATUS = TASK_STATUS = {}));
var PRIORITY;
(function (PRIORITY) {
    PRIORITY[PRIORITY["BLOCKER"] = 1] = "BLOCKER";
    PRIORITY[PRIORITY["CRITICAL"] = 2] = "CRITICAL";
    PRIORITY[PRIORITY["MAJOR"] = 3] = "MAJOR";
    PRIORITY[PRIORITY["LOWER"] = 4] = "LOWER";
})(PRIORITY || (exports.PRIORITY = PRIORITY = {}));

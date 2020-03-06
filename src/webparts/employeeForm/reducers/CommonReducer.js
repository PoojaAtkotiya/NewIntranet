"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppConstants_1 = require("../AppConstants");
exports.EmpListIdReducer = function (state, action) {
    if (state === void 0) { state = null; }
    switch (action.type) {
        case AppConstants_1.ActionTypes.GetEmpID:
            state = __assign({}, state, { EmpListID: action.payload.EmpListID });
            break;
        case AppConstants_1.ActionTypes.SetEmpID:
            state = __assign({}, state, { EmpListID: action.payload.EmpListID });
            break;
    }
    return state;
};
exports.CommonReducer = function (state, action) {
    if (state === void 0) { state = null; }
    switch (action.type) {
        case AppConstants_1.ActionTypes.SetTabName:
            state = __assign({}, state, { CurrentForm: action.payload.CurrentForm });
            break;
    }
    return state;
};
//# sourceMappingURL=CommonReducer.js.map
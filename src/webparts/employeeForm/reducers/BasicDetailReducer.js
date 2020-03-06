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
exports.BasicDetailSectionReducer = function (state, action) {
    if (state === void 0) { state = null; }
    switch (action.type) {
        // Gets the values for dropdown fields from SharePoint master/choice columns.
        case AppConstants_1.ActionTypes.GetBasicFormControls:
            state = __assign({}, state, { FirstName: action.payload.FirstName, LastName: action.payload.LastName, DateofJoining: action.payload.DateofJoining, Designation: action.payload.Designation, Technology: action.payload.Technology, CompanyEmail: action.payload.CompanyEmail, designationOptions: action.payload.designationOptions, technologyOptions: action.payload.technologyOptions });
            break;
    }
    return state;
};
//# sourceMappingURL=BasicDetailReducer.js.map
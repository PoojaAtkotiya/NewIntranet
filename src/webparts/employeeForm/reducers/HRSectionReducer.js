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
exports.HRSectionReducer = function (state, action) {
    if (state === void 0) { state = null; }
    switch (action.type) {
        // Gets the values for all fields from SharePoint master/choice columns.
        case "GET_HR_FORM_CONTROLS":
            state = __assign({}, state, { employmentStatusOptions: action.payload.employmentStatusOptions, reasonOfLeavingOptions: action.payload.reasonOfLeavingOptions, UserAlies: action.payload.UserAlies, ADLogin: action.payload.ADLogin, Manager: action.payload.Manager, employementStatus: action.payload.employementStatus, DateofLeft: action.payload.DateofLeft, reasonForLeaving: action.payload.reasonForLeaving, ResigntionDate: action.payload.ResigntionDate, EligibleforRehire: action.payload.EligibleforRehire });
            break;
        case "ADD_VALUE_FROM_HR":
            state = __assign({}, state, { UserAlies: action.payload.UserAlies, ADLogin: action.payload.ADLogin, Manager: action.payload.Manager, employementStatus: action.payload.employementStatus, DateofLeft: action.payload.DateofLeft, reasonForLeaving: action.payload.reasonForLeaving, ResigntionDate: action.payload.ResigntionDate, EligibleforRehire: action.payload.EligibleforRehire, 
                // Represent the choices to be displayed in dropdown when the form loads.
                employmentStatusOptions: action.payload.employmentStatusOptions, reasonOfLeavingOptions: action.payload.reasonOfLeavingOptions });
            break;
    }
    return state;
};
//# sourceMappingURL=HRSectionReducer.js.map
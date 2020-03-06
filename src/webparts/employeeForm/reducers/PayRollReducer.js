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
exports.PayRollSectionReducer = function (state, action) {
    if (state === void 0) { state = null; }
    switch (action.type) {
        // Gets the values for dropdown fields from SharePoint master/choice columns.
        case "GET_PAYROLL_FORM_CONTROLS":
            state = __assign({}, state, { UserID: action.payload.UserID, ESIApplicable: action.payload.ESIApplicable, ESINo: action.payload.ESINo, ESIDispensary: action.payload.ESIDispensary, PFApplicable: action.payload.PFApplicable, PFNo: action.payload.PFNo, PFNoforDeptFile: action.payload.PFNoforDeptFile, RestrictPF: action.payload.RestrictPF, ZeroPension: action.payload.ZeroPension, ZeroPT: action.payload.ZeroPT, Ward_x002f_Circle: action.payload.Ward_x002f_Circle, Director: action.payload.Director });
            break;
        // case "SET_INITIAL_FORM_STATE":
        //     state = {
        //         ...state,
        //         //ESIApplicable:action.payload.ESIApplicable,
        //         ESINo:action.payload.ESINo,
        //         ESIDispensary:action.payload.ESIDispensary,
        //         //PFApplicable:action.payload.PFApplicable,
        //         PFNo:action.payload.PFNo,
        //         PFNoforDeptFile:action.payload.PFNoforDeptFile,
        //         RestrictPF:action.payload.RestrictPF,
        //         ZeroPension:action.payload.ZeroPension,
        //         ZeroPT:action.payload.ZeroPT,
        //         Ward_x002f_Circle:action.payload.Ward_x002f_Circle,
        //         Director:action.payload.Director,
        //     };
        //     break;
        case "ADD_PAYROLL_DATA":
            state = __assign({}, state, { ESIApplicable: action.payload.ESIApplicable, ESINo: action.payload.ESINo, ESIDispensary: action.payload.ESIDispensary, PFApplicable: action.payload.PFApplicable, PFNo: action.payload.PFNo, PFNoforDeptFile: action.payload.PFNoforDeptFile, RestrictPF: action.payload.RestrictPF, ZeroPension: action.payload.ZeroPension, ZeroPT: action.payload.ZeroPT, Ward_x002f_Circle: action.payload.Ward_x002f_Circle, Director: action.payload.Director });
            break;
    }
    return state;
};
//# sourceMappingURL=PayRollReducer.js.map
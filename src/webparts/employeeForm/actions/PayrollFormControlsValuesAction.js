"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConstants_1 = require("../AppConstants");
var NewEmployeeService_1 = require("../services/NewEmployeeService");
function GetPayrollAction(EmpListID) {
    return function (dispatch) {
        var formControlState = {};
        var newEmpServiceObj = new NewEmployeeService_1.default();
        newEmpServiceObj.getPayrollControlState(EmpListID).then(function (resp) {
            formControlState = resp;
            dispatch({
                type: AppConstants_1.ActionTypes.GetPayrollFormControls,
                payload: formControlState
            });
        });
    };
}
exports.GetPayrollAction = GetPayrollAction;
function SetTabName(tabData) {
    return ({
        type: "SET_TAB",
        payload: tabData
    });
}
exports.SetTabName = SetTabName;
//# sourceMappingURL=PayrollFormControlsValuesAction.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConstants_1 = require("../AppConstants");
var NewEmployeeService_1 = require("../services/NewEmployeeService");
//Get all Control's Values
function GetInitialControlValuesAction(EmpListID) {
    return function (dispatch) {
        var formControlState = {};
        var newEmpServiceObj = new NewEmployeeService_1.default();
        newEmpServiceObj.getHRFormControlState(EmpListID).then(function (resp) {
            //DropDown Field Value
            formControlState.reasonOfLeavingOptions = resp.reasonOfLeavingOptions;
            formControlState.employmentStatusOptions = [];
            //textbox Values
            formControlState.UserAlies = resp.UserAlies;
            formControlState.ADLogin = resp.ADLogin;
            formControlState.Manager = resp.Manager;
            formControlState.employementStatus = resp.employementStatus;
            formControlState.DateofLeft = resp.DateofLeft;
            formControlState.reasonForLeaving = resp.reasonForLeaving;
            formControlState.ResigntionDate = resp.ResigntionDate;
            formControlState.EligibleforRehire = resp.EligibleforRehire;
            dispatch({
                type: AppConstants_1.ActionTypes.GetHRFormControls,
                payload: formControlState
            });
        });
    };
}
exports.GetInitialControlValuesAction = GetInitialControlValuesAction;
// Creates a new employee request.
function HrAddNewEmployee(empReqData, managerdata, EmpListID) {
    return function (dispatch) {
        var newEmpReqServiceObj = new NewEmployeeService_1.default();
        newEmpReqServiceObj.HrAddNewEmployee(empReqData, managerdata, EmpListID).then(function (resp) {
            alert("New Employee is added successfully");
        }).catch(function () {
            alert("Sorry. Error while adding employee...");
        });
        dispatch({
            type: AppConstants_1.ActionTypes.AddValueFromHR,
            payload: empReqData
        });
    };
}
exports.HrAddNewEmployee = HrAddNewEmployee;
function SetTabName(tabData) {
    return ({
        type: AppConstants_1.ActionTypes.SetTabName,
        payload: tabData
    });
}
exports.SetTabName = SetTabName;
//# sourceMappingURL=HRFormControlsValuesAction.js.map
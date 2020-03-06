"use strict";
/**  The file contains actions for the NewEmployeeReducer */
Object.defineProperty(exports, "__esModule", { value: true });
var NewEmployeeService_1 = require("../services/NewEmployeeService");
var AppConstants_1 = require("../AppConstants");
/**Get default values for Emp Details Form from sharepoint lists */
function GetInitialControlValuesAction(EmpListID) {
    return function (dispatch) {
        var formControlState = {};
        var newEmpServiceObj = new NewEmployeeService_1.default();
        newEmpServiceObj.getNewFormControlState(EmpListID).then(function (resp) {
            formControlState = resp;
            dispatch({
                type: AppConstants_1.ActionTypes.GetDefaultFormControls,
                payload: formControlState
            });
        });
    };
}
exports.GetInitialControlValuesAction = GetInitialControlValuesAction;
function SetTabName(tabData) {
    return function (dispatch) {
        dispatch({
            type: AppConstants_1.ActionTypes.SetTabName,
            payload: tabData
        });
    };
}
exports.SetTabName = SetTabName;
/** Method to remove row from Grids */
function RemoveDetailRowFromGrid(removeditem, section, index) {
    return function (dispatch) {
        var newEmpServiceObj = new NewEmployeeService_1.default();
        //remove row from Children detail grid
        if (section == "childDetailItems")
            newEmpServiceObj.deleteDataFromListUsingID(removeditem.childDetailId, AppConstants_1.ListNames.CHILDDETAILS);
        dispatch({
            type: AppConstants_1.ActionTypes.RemoveChildDetailRow,
            payload: index
        });
        //remove row from Visa detail grid
        if (section == "visaDetailItems")
            newEmpServiceObj.deleteDataFromListUsingID(removeditem.visaDetailId, AppConstants_1.ListNames.VISADETAILS);
        dispatch({
            type: AppConstants_1.ActionTypes.RemoveVisaDetailRow,
            payload: index
        });
    };
}
exports.RemoveDetailRowFromGrid = RemoveDetailRowFromGrid;
/** Method to add new blank row in Grids */
function AddDetailRowToGrid(section) {
    var actionObj;
    if (section == "childDetailItems") {
        //add row in Children detail grid
        var newChildDetailGridRow = {
            childDetailId: 0,
            ChildName: '',
            DateOfBirth: ''
        };
        actionObj = {
            type: AppConstants_1.ActionTypes.AddChildDetailRow,
            payload: newChildDetailGridRow
        };
    }
    else if (section == "visaDetailItems") {
        //add row in Visa detail grid
        var newVisaDetailGridRow = {
            visaDetailId: 0,
            ValidVisa: false,
            VisaOfCountry: '',
            VisaNo: '',
            Entry: '',
            VisaValidity: null,
            IsTravelled: false
        };
        actionObj = {
            type: AppConstants_1.ActionTypes.AddVisaDetailRow,
            payload: newVisaDetailGridRow
        };
    }
    return actionObj;
}
exports.AddDetailRowToGrid = AddDetailRowToGrid;
//# sourceMappingURL=NewFormControlsValuesAction.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConstants_1 = require("../AppConstants");
var NewEmployeeService_1 = require("../services/NewEmployeeService");
//gets initial value for all controls in the form
function GetInitialControlValuesAction(EmpListID) {
    return function (dispatch) {
        var newEmpServiceObj = new NewEmployeeService_1.default();
        var payLoadArrayEducationDetail = [];
        var payLoadArrayCertificationDetail = [];
        //gets already set education details for user
        newEmpServiceObj.getMultipleDataFromListUsingParentID(AppConstants_1.ListNames.EducationDetail, EmpListID)
            .then(function (resp) {
            resp.forEach(function (element) {
                payLoadArrayEducationDetail.push({
                    educationId: element.ID,
                    DiplomaDegree: element.qualification,
                    Grade: element.grade,
                    StartYear: element.startYear,
                    EndYear: element.yearOfCompletion,
                    Board: element.board,
                    SchoolCollege: element.school,
                    DegreeName: element.degree
                });
            });
            dispatch({
                type: AppConstants_1.ActionTypes.SetInitialEduDetailFormState,
                payload: payLoadArrayEducationDetail
            });
        });
        //get already existing certification details for user
        newEmpServiceObj.getMultipleDataFromListUsingParentID(AppConstants_1.ListNames.CertificationDetail, EmpListID)
            .then(function (resp) {
            resp.forEach(function (element) {
                payLoadArrayCertificationDetail.push({
                    certificationId: element.ID,
                    Certification: element.certification,
                    StartYear: element.startYear,
                    YearOfCompletion: element.yearOfCompletion,
                    InstituteName: element.institution,
                    GradePercentage: element.GradeOrPercent
                });
                dispatch({
                    type: AppConstants_1.ActionTypes.SetInitialCertiDetailFormState,
                    payload: payLoadArrayCertificationDetail
                });
            });
        });
    };
}
exports.GetInitialControlValuesAction = GetInitialControlValuesAction;
function SetTabName(tabData) {
    return ({
        type: "SET_TAB",
        payload: tabData
    });
}
exports.SetTabName = SetTabName;
//add rows in detail grids
function addEducationDetailRow(section) {
    var actionObj;
    if (section == "educationDetails") {
        //add row in education detail grid
        var initialEducationDetailGrid = { educationId: 0,
            DiplomaDegree: "",
            Grade: "",
            StartYear: "",
            EndYear: "",
            Board: "",
            SchoolCollege: "",
            DegreeName: ""
        };
        actionObj = {
            type: AppConstants_1.ActionTypes.AddEducationDetailRow,
            payload: initialEducationDetailGrid
        };
    }
    //add row in certification detail grid
    else {
        var initialCertificationDetailGrid = {
            certificationId: 0,
            Certification: '',
            StartYear: '',
            YearOfCompletion: '',
            InstituteName: '',
            GradePercentage: ''
        };
        actionObj = {
            type: AppConstants_1.ActionTypes.AddCertiDetailRow,
            payload: initialCertificationDetailGrid
        };
    }
    return actionObj;
}
exports.addEducationDetailRow = addEducationDetailRow;
//remove rows from detail grids
function removeEducationDetailRow(removeditem, section, index) {
    return function (dispatch) {
        var newEmpServiceObj = new NewEmployeeService_1.default();
        if (section == "educationDetails") {
            newEmpServiceObj.deleteDataFromListUsingID(removeditem.educationId, AppConstants_1.ListNames.EducationDetail);
            dispatch({
                type: AppConstants_1.ActionTypes.RemoveEducationDetailRow,
                payload: index
            });
        }
        //remove row from certification detail rows
        else {
            newEmpServiceObj.deleteDataFromListUsingID(removeditem.certificationId, AppConstants_1.ListNames.CertificationDetail);
            dispatch({
                type: AppConstants_1.ActionTypes.RemoveCertiDetailRow,
                payload: index
            });
        }
    };
}
exports.removeEducationDetailRow = removeEducationDetailRow;
//# sourceMappingURL=EducationDetailAction.js.map
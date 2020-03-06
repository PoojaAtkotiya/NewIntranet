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
//Initialise state of Employee Detail
exports.newEmpFormControlsInitialState = {
    PersonalEmail: '',
    Mobile: '',
    DateOfBirth: null,
    Age: 0,
    BloodGroup: '',
    FatherName: '',
    MotherName: '',
    MaritalStatus: '',
    SpouceName: '',
    SpouseOccupation: '',
    SpouceDOB: null,
    EmergencyNo: '',
    RelationWithEmergencyNo: '',
    CurrentAddress: '',
    IsSameAsCurrAddress: false,
    PermanentAddress: '',
    PanNo: '',
    AadharNo: '',
    IsPassAvail: false,
    PassportNo: '',
    PassportValidity: null,
    Gender: '',
    // Represent the choices to be displayed in dropdown when the form loads.
    genderOptions: [],
    designationOptions: [],
    maritalStatusOptions: [],
    technologyOptions: [],
    //tran list Items
    childDetailItems: [],
    visaDetailItems: []
};
exports.NewEmpRequestReducer = function (state, action) {
    if (state === void 0) { state = null; }
    switch (action.type) {
        // Gets the values for dropdown fields from SharePoint master/choice columns.
        case AppConstants_1.ActionTypes.GetDefaultFormControls:
            state = __assign({}, state, { PersonalEmail: action.payload.PersonalEmail, Mobile: action.payload.Mobile, DateOfBirth: action.payload.DateOfBirth, Age: action.payload.Age, BloodGroup: action.payload.BloodGroup, FatherName: action.payload.FatherName, MotherName: action.payload.MotherName, MaritalStatus: action.payload.MaritalStatus, SpouceName: action.payload.SpouceName, SpouseOccupation: action.payload.SpouseOccupation, SpouceDOB: action.payload.SpouceDOB, EmergencyNo: action.payload.EmergencyNo, RelationWithEmergencyNo: action.payload.RelationWithEmergencyNo, CurrentAddress: action.payload.CurrentAddress, IsSameAsCurrAddress: action.payload.IsSameAsCurrAddress, PermanentAddress: action.payload.PermanentAddress, PanNo: action.payload.PanNo, AadharNo: action.payload.AadharNo, IsPassAvail: action.payload.IsPassAvail, PassportNo: action.payload.PassportNo, PassportValidity: action.payload.PassportValidity, Gender: action.payload.Gender, genderOptions: action.payload.genderOptions, maritalStatusOptions: action.payload.maritalStatusOptions, childDetailItems: action.payload.childDetailItems, visaDetailItems: action.payload.visaDetailItems });
            break;
        case "SET_INITIAL_STATE":
            state = __assign({}, state, { PersonalEmail: action.payload.NewEmpReqData.PersonalEmail, Mobile: action.payload.NewEmpReqData.Mobile, DateOfBirth: action.payload.NewEmpReqData.DateOfBirth, Age: action.payload.NewEmpReqData.Age, BloodGroup: action.payload.NewEmpReqData.BloodGroup, FatherName: action.payload.NewEmpReqData.FatherName, MotherName: action.payload.NewEmpReqData.MotherName, MaritalStatus: action.payload.NewEmpReqData.MaritalStatus, SpouceName: action.payload.NewEmpReqData.SpouceName, 
                // SpouceOccupation: action.payload.NewEmpReqData.SpouceOccupation,
                SpouceDOB: action.payload.NewEmpReqData.spouceDOB, EmergencyNo: action.payload.NewEmpReqData.EmergencyNo, RelationWithEmergencyNo: action.payload.NewEmpReqData.RelationWithEmergencyNo });
            break;
        case "ADD_NEW_EMPLOYEE":
            state = __assign({}, state, { PersonalEmail: action.payload.PersonalEmail, Mobile: action.payload.Mobile, DateOfBirth: action.payload.DateOfBirth, Age: action.payload.Age, BloodGroup: action.payload.BloodGroup, FatherName: action.payload.FatherName, MotherName: action.payload.MotherName, MaritalStatus: action.payload.MaritalStatus, SpouceName: action.payload.SpouceName, SpouseOccupation: action.payload.SpouseOccupation, SpouceDOB: action.payload.SpouceDOB, EmergencyNo: action.payload.EmergencyNo, RelationWithEmergencyNo: action.payload.RelationWithEmergencyNo, CurrentAddress: action.payload.CurrentAddress, IsSameAsCurrAddress: action.payload.IsSameAsCurrAddress, PermanentAddress: action.payload.PermanentAddress, PanNo: action.payload.PanNo, AadharNo: action.payload.AadharNo, IsPassAvail: action.payload.IsPassAvail, PassportNo: action.payload.PassportNo, PassportValidity: action.payload.PassportValidity, 
                // Represent the choices to be displayed in dropdown when the form loads.
                genderOptions: action.payload.genderOptions, designationOptions: action.payload.designationOptions, maritalStatusOptions: action.payload.maritalStatusOptions, technologyOptions: action.payload.technologyOptions });
            break;
        case AppConstants_1.ActionTypes.AddChildDetailRow:
            state = __assign({}, state, { childDetailItems: state.childDetailItems.concat([action.payload]) });
            break;
        case AppConstants_1.ActionTypes.RemoveChildDetailRow:
            state = __assign({}, state, { childDetailItems: state.childDetailItems.slice(0, action.payload).concat(state.childDetailItems.slice(action.payload + 1)) });
            break;
        case AppConstants_1.ActionTypes.AddVisaDetailRow:
            state = __assign({}, state, { visaDetailItems: state.visaDetailItems.concat([action.payload]) });
            break;
        case AppConstants_1.ActionTypes.RemoveVisaDetailRow:
            state = __assign({}, state, { visaDetailItems: state.visaDetailItems.slice(0, action.payload).concat(state.visaDetailItems.slice(action.payload + 1)) });
            break;
    }
    return state;
};
//# sourceMappingURL=NewEmpRequestReducer.js.map
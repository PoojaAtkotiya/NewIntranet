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
//Initialise state of Education 
exports.eduDetailState = {
    educationDetails: [],
    certificationDetails: []
};
exports.EducationSectionReducer = function (state, action) {
    if (state === void 0) { state = exports.eduDetailState; }
    switch (action.type) {
        // Gets the values for dropdown fields from SharePoint master/choice columns.
        case "GET_DEFAULT_FORM_CONTROLS":
            state = __assign({}, state);
            break;
        case "ADD_NEW_EMPLOYEE":
            state = __assign({}, state);
            break;
        //educationDetail section
        // Sets initial or already filled values in state from sp list 
        case "SET_INITIAL_EDUDETAIL_FORM_STATE":
            state = __assign({}, state, { educationDetails: action.payload });
            break;
        //adds empty array from payload to state.educationdetails
        case AppConstants_1.ActionTypes.AddEducationDetailRow:
            state = __assign({}, state, { educationDetails: state.educationDetails.concat([action.payload]) });
            break;
        //removes array from state.educationdetails on index
        case AppConstants_1.ActionTypes.RemoveEducationDetailRow:
            state = __assign({}, state, { educationDetails: state.educationDetails.slice(0, action.payload).concat(state.educationDetails.slice(action.payload + 1)) });
            break;
        //CertiDetails section
        //sets already set values from sp list to state
        case "SET_INITIAL_CERTIDETAIL_FORM_STATE":
            state = __assign({}, state, { certificationDetails: action.payload });
            break;
        //adds empty array from payload to state
        case "ADD_NEW_CERTIDETAIL_ROW":
            state = __assign({}, state, { certificationDetails: state.certificationDetails.concat([action.payload]) });
            break;
        //removes row from state based on index
        case "REMOVE_CERTIDETAIL_ROW":
            state = __assign({}, state, { certificationDetails: state.certificationDetails.slice(0, action.payload).concat(state.certificationDetails.slice(action.payload + 1)) });
            break;
    }
    return state;
};
//# sourceMappingURL=EducationDetailReducer.js.map
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
exports.professionalDetailState = {
    IsFresher: false,
    organizationDetails: [],
    technologyDetails: []
};
exports.ProfessionalDetailSectionReducer = function (state, action) {
    if (state === void 0) { state = exports.professionalDetailState; }
    switch (action.type) {
        // Gets the values for dropdown fields from SharePoint master/choice columns.
        case "GET_PROFESSIONALDETAIL_FORM_CONTROLS":
            state = __assign({}, state);
            break;
        case "ADD_PROFESSIONALDETAILS_VALUE":
            state = __assign({}, state);
            break;
        //educationDetail section
        // Sets initial or already filled values in state from sp list 
        case "SET_INITIAL_PROFESSIONALDETAIL_FORM_STATE":
            state = __assign({}, state, { IsFresher: action.payload.IsFresher, organizationDetails: action.payload.organizationDetails });
            break;
        //adds empty array from payload to state.professionaldetail
        case "ADD_NEW_PROFESSIONAL_DETAIL_ROW":
            state = __assign({}, state, { organizationDetails: state.organizationDetails.concat([action.payload]) });
            break;
        //removes array from state.professionaldetail on index
        case "REMOVE_PROFESSIONALDETAIL_ROW":
            state = __assign({}, state, { organizationDetails: state.organizationDetails.slice(0, action.payload).concat(state.organizationDetails.slice(action.payload + 1)) });
            break;
        //CertiDetails section
        //sets already set values from sp list to state
        case "SET_INITIAL_TECHNOLOGY_FORM_STATE":
            state = __assign({}, state, { IsFresher: action.payload.IsFresher, technologyDetails: action.payload.technologyDetails });
            break;
        //adds empty array from payload to state
        case "ADD_NEW_TECHNOLOGY_ROW":
            state = __assign({}, state, { technologyDetails: state.technologyDetails.concat([
                    action.payload
                ]) });
            break;
        //removes row from state based on index
        case "REMOVE_TECHNOLOGY_ROW":
            state = __assign({}, state, { technologyDetails: state.technologyDetails.slice(0, action.payload).concat(state.technologyDetails.slice(action.payload + 1)) });
            break;
    }
    return state;
};
//# sourceMappingURL=ProfessionalDetailSectionReducer.js.map
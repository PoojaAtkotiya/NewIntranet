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
var redux_1 = require("redux");
var BasicDetailReducer_1 = require("../reducers/BasicDetailReducer");
var NewEmpRequestReducer_1 = require("../reducers/NewEmpRequestReducer");
var EducationDetailReducer_1 = require("../reducers/EducationDetailReducer");
var HRSectionReducer_1 = require("../reducers/HRSectionReducer");
var PayRollReducer_1 = require("../reducers/PayRollReducer");
var ProfessionalDetailSectionReducer_1 = require("../reducers/ProfessionalDetailSectionReducer");
var CommonReducer_1 = require("../reducers/CommonReducer");
var redux_thunk_1 = require("redux-thunk");
// import { reducer as formReducer } from 'redux-form';
var react_redux_form_1 = require("react-redux-form");
// Configures the redux store.
// export default function ConfigureStore():any{
//     // Combine multiple reducers to create the store. FormReducer is for the redux-form.
//     const EmpRequestStore = createStore(
//         combineReducers
//         ({
//             NewFormControlValues:NewEmpRequestReducer,
//             form:formReducer
//         }),
//         // {},
//         applyMiddleware(thunk)
//     );
//     return EmpRequestStore;
// }
// If you want your entire store to have the form state...
exports.store = redux_1.createStore(redux_1.combineReducers(__assign({ EmpListId: CommonReducer_1.EmpListIdReducer, CommonReducer: CommonReducer_1.CommonReducer }, react_redux_form_1.createForms({
    Basic: BasicDetailReducer_1.BasicDetailSectionReducer,
    Employee: NewEmpRequestReducer_1.NewEmpRequestReducer,
    HR: HRSectionReducer_1.HRSectionReducer,
    Education: EducationDetailReducer_1.EducationSectionReducer,
    ProfessionalDetail: ProfessionalDetailSectionReducer_1.ProfessionalDetailSectionReducer,
    Payroll: PayRollReducer_1.PayRollSectionReducer
}))), redux_1.applyMiddleware(redux_thunk_1.default));
// Or you have an existing store and want the form state to
// exist alongside the existing state...
// const store = createStore(combineReducers({
//     existing: existingReducer,
//     foo: fooReducer,
//     bar: barReducer,
//     // ... use createForms, which will create:
//     // the model reducer at "user"
//     // the forms reducer at "forms" (e.g., "forms.user")
//     ...createForms({
//       user: initialUserState,
//     }),
//   }));
//# sourceMappingURL=ConfigureStore.js.map
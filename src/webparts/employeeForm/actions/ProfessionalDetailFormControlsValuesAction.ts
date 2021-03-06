import { IProfessionalDetailState } from '../state/IProfessionalDetailControlState';
import { ICommonState } from '../state/ICommonState';
import NewEmployeeService from '../services/NewEmployeeService';
import { ActionTypes, AppConstats, ListNames } from '../AppConstants';
import NewEmpService from '../services/NewEmployeeService';
import UtilityService from "../services/UtilityService";
import { actions } from 'react-redux-form';

export function GetInitialControlValuesAction(EmpListID) {
  let formcontrol = {} as IProfessionalDetailState;
  return dispatch => {
    let newEmpServiceObj: NewEmpService = new NewEmpService();
    newEmpServiceObj.getIsFreshers(EmpListID)
      .then((resp) => {
        formcontrol.IsFresher = resp.IsFresher;
        if (formcontrol.IsFresher == false) {
          let payLoadArrayOrganizationDetails = [];
          //gets already set ProfessionalDetails for user
          newEmpServiceObj.getProfessionalDetailsFromList(ListNames.PROFESSIONALHISTORY, EmpListID)
            .then((organizationdetailresp) => {
              payLoadArrayOrganizationDetails = organizationdetailresp;
              formcontrol.organizationDetails = payLoadArrayOrganizationDetails;
              dispatch({
                type: ActionTypes.SetInitialProfessionalDetailFormState,
                payload: formcontrol
              });
            });
        }
        //get already existing ProfessionalDetails for user
        let payLoadArrayTechnologyDetails = [];
        newEmpServiceObj.getTechnicalDetailsFromList(ListNames.EMPLOYEETECHNICALSKILL, EmpListID)
          .then((technicaldetailsresp) => {
            payLoadArrayTechnologyDetails = technicaldetailsresp;
            formcontrol.technologyDetails = payLoadArrayTechnologyDetails;
            dispatch({
              type: ActionTypes.SetInitialTechnologyFromState,
              payload: formcontrol
            });
          });
        dispatch({
          type: ActionTypes.GetProfessionalDetailForm,
          payload: formcontrol
        });
      });
  };
}
export function SetTabName(tabData: ICommonState) {
  return ({
    type: "SET_TAB",
    payload: tabData
  });
}
//add rows in detail grids
export function addProfessionalDetailRow(section) {
  if (section == "organizationDetails") {
    //add row in education detail grid
    return dispatch => {
      let utilityServiceObj: UtilityService = new UtilityService();
      utilityServiceObj.getOptionsFromMaster(ListNames.REASONFORLEAVING, 'Title')
        .then((ReasonResp) => {
          let initialOrganizationDetailsGrid =
          {
            organizationId: 0,
            organization: '',
            designation: '',
            startDate: '',//dateTime?
            endDate: '', //dateTime?
            reportingTo: '',
            reportingDesignation: '',
            totalExp: '',
            reasonForLeaving: '',
            // Represent the choices to be displayed in dropdown when the form loads.
            reasonOfLeavingOptions: ReasonResp,
          };

          dispatch({
            type: ActionTypes.AddProfessionalDetailRow,
            payload: initialOrganizationDetailsGrid
          });
        });
    };
  }
  //add row in certification detail grid
  else {
    return dispatch => {
      let utilityServiceObj: UtilityService = new UtilityService();
      utilityServiceObj.getOptionsFromMaster(ListNames.TECHNOLOGY, 'Title')
        .then((techResp) => {
          let initialTechnologyDetailGrid = {
            technologyId: 0,
            Technology: '',
            SinceWhen: '',
            Expertise: '',
            Rating: '',
            technologyOptions: techResp
          };
          dispatch({
            type: ActionTypes.AddTechnologyDetailRow,
            payload: initialTechnologyDetailGrid
          });
        });
    };
  }
  // return actionObj;
}

/** Method to remove row from grids */
export function removeProfessionalDetailRow(removeditem, section, index) {
  return dispatch => {
    let newEmpServiceObj: NewEmpService = new NewEmpService();
    if (section == "organizationDetails") {
      newEmpServiceObj.deleteDataFromListUsingID(removeditem.organizationId, ListNames.PROFESSIONALHISTORY);
      dispatch({
        type: ActionTypes.RemoveProfessionalDetailRow,
        payload: index
      });
    }
    //remove row from Technology detail rows
    else {
      newEmpServiceObj.deleteDataFromListUsingID(removeditem.technologyId, ListNames.EMPLOYEETECHNICALSKILL);
      dispatch({
        type: ActionTypes.RemoveTechnologyRow,
        payload: index
      });
    }
  };
}

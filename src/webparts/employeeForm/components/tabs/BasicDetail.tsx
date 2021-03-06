import * as React from 'react';
import { Form, Control, Errors } from 'react-redux-form';
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { connect } from "react-redux";
import { GetEmpBasicData, SetTabName, GetEmpListIdByUserEmail, SetEmpIdInStore } from "../../actions/BasicEmpDetailAction";
import { ICommonState, IEmpListIdState } from '../../state/ICommonState';
import BasicService from '../../services/BasicFormService';
import { ActionTypes } from '../../AppConstants';
import { store } from '../../store/ConfigureStore';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import styles from "../EmployeeForm.module.scss";
import { ListItemPicker } from '@pnp/spfx-controls-react/lib/listItemPicker';
import pnp from 'sp-pnp-js';
interface IBasicFormConnectedDispatch {
  //Get Employee Id using Current User Email
  setEmpId: (empId) => void;
  setTabName: (tabName: ICommonState) => void;
  // Gets the options for dropdown fields
  getBasicDatail: (empListId) => void;
}

interface IButtonState {
  isDisable: boolean;
  selectedTechnologies: any;
}

class BasicDetail extends React.Component<any, IButtonState>{
  constructor(props) {
    super(props);
    this.state = { isDisable: true, selectedTechnologies: '' };
  }

  //On Button Save : Basic Details saved In List
  async handleSubmit(formValues) {
    this.props.handleSpinner(false);
    let newEmpReqServiceObj: BasicService = new BasicService();
    const idState = store.getState().EmpListId;
    this.setState({ isDisable: true });
    let AdLoginName = await this.getUserId(this.props.empEmail);
    let technologydata = this.convertTechnologyinString(this.state.selectedTechnologies);
    if (idState != null && idState != undefined) {
      //Edit Form when ID is not null
      newEmpReqServiceObj.UpdateBasicDetail(formValues, technologydata, idState, AdLoginName).then(resp => {
        this.setState({ isDisable: false });
        alert("Basic details updated successfully");
        this.props.handleSpinner(true);
      }).catch(() => {
        alert("Sorry. Error while adding employee...");
      });
    }
    else {
      //New Form 
      newEmpReqServiceObj.AddBasicDetail(formValues, technologydata, AdLoginName).then(resp => {
        let empIdState = { EmpListID: resp } as IEmpListIdState;
        dispatch => {
          dispatch({
            type: ActionTypes.GetEmpID,
            payload: empIdState
          });
        };
        this.setState({ isDisable: false });
        alert("Basic details saved successfully");
        this.props.handleSpinner(true);
      }).catch(() => {
        alert("Sorry. Error while adding employee...");
      });
    }

  }

  public async componentDidMount() {
    let newEmpReqServiceObj: BasicService = new BasicService();
    var eId = await GetEmpListIdByUserEmail(this.props.empEmail);
    let isExistsInHR = false;
    if (this.props.empEmail != null && this.props.empEmail != undefined && this.props.empEmail != '') {
      var userGroups = await newEmpReqServiceObj.GetCurrentUserGroups(this.props.empEmail);
      if (userGroups != null && userGroups != undefined) {
        userGroups.forEach(grp => {
          if (grp == 'HR Team')
            isExistsInHR = true;
        });
      }
    }
    if (eId != null && eId != undefined) {
      this.props.setEmpId(eId);//set empId in store
      this.props.getBasicDatail(eId); //get Basic Details 
      this.props.showTabs(eId, isExistsInHR);
      var technology = await newEmpReqServiceObj.GetEmpTechnology(eId.EmpListID);
      if (technology != null && technology != undefined) {
        var TechnologyDropDown = technology.split(",");
        let final = [];
        TechnologyDropDown.forEach(tech => {
          final.push({ 'key': tech, 'name': tech });
        });
        this.setState({ selectedTechnologies: final });
      }
    }
    const CommonState: ICommonState = { CurrentForm: "Employee" };
    this.props.setTabName(CommonState);
  }

  public render() {
    { console.log("TFS Solution"); }
    let desigOpt;
    if (this.props.Basic != null || this.props.Basic != undefined) {
      if (this.props.Basic.designationOptions != null || this.props.Basic.designationOptions != undefined) {
        desigOpt = this.props.Basic.designationOptions.map(desig => { return <option key={desig} value={desig}>{desig}</option>; });
      }
    }
    if (!this.props.Employee) return (<div> Loading.... </div>);
    return (
      <div>
        <div className={styles.employeeForm}>
          <div className={styles.container}>
            <div className={`ms-Grid-row  ms-fontColor-white ${styles.row}`}>
              <Form model="Basic" onSubmit={(val) => this.handleSubmit(val)}  >
                <div className='ms-Grid-col ms-u-sm4 block'>
                  <label>First Name *:</label>
                </div>
                <div className="ms-Grid-col ms-u-sm8 block">
                  <Control.text model=".FirstName" id='.FirstName' component={TextField} className={styles.marginb}
                    validators={{ requiredFirstName: (val) => val && val.length }} />
                  <Errors
                    className={styles.errors}
                    show="touched"
                    model=".FirstName" messages={{ requiredFirstName: 'Please provide an email address.' }} />
                </div>
                <div className='ms-Grid-col ms-u-sm4 block'>
                  <label>Last Name *:</label>
                </div>
                <div className="ms-Grid-col ms-u-sm8 block">
                  <Control.text model=".LastName" id='.LastName' component={TextField} className={styles.marginb}
                    validators={{ requiredLastName: (val) => val && val.length }} />
                  <Errors
                    className={styles.errors}
                    show="touched"
                    model=".LastName" messages={{ requiredLastName: 'Please provide an email address.' }} />
                </div>
                <div className='ms-Grid-col ms-u-sm4 block'>
                  <label>Date Of Joining *:</label>
                </div>
                <div className="ms-Grid-col ms-u-sm8 block">
                  <Control model='.DateofJoining' id='.DateofJoining' component={DatePicker} className={styles.marginb}
                    mapProps={{
                      value: (props) => { return props.viewValue; },
                      onSelectDate: (props) => { return props.onChange; }
                    }}
                  ></Control>
                </div>
                <div className='ms-Grid-col ms-u-sm4 block'>
                  <label>Designation *:</label>
                </div>
                <div className="ms-Grid-col ms-u-sm8 block">
                  <Control.select model=".Designation" id=".Designation" className={styles.dropdowncustom} validators={{
                    requiredDesignationStatus: (val) => val && val != "--Select--"
                  }} >
                    <option>--Select--</option>
                    {desigOpt}
                  </Control.select>
                  <Errors
                    className={styles.errors}
                    show="touched"
                    model=".Designation"
                    messages={{
                      requiredDesignationStatus: 'Please Select Designation.'
                    }}
                  />
                </div>
                <div className='ms-Grid-col ms-u-sm4 block'>
                  <label>Technology *:</label>
                </div>
                <div className="ms-Grid-col ms-u-sm8 block">
                  <ListItemPicker listId='6fd1826b-625e-4288-8e10-df480fb0d17d'
                    columnInternalName='Title'
                    itemLimit={2}
                    onSelectedItem={this.onSelectedItem}
                    context={this.props.context}
                    suggestionsHeaderText="Please select asset"
                    defaultSelectedItems={this.state.selectedTechnologies}
                  />
                  <Errors
                    className={styles.errors}
                    show="touched"
                    model=".Technology" messages={{ requiredTechnology: 'Please Select Technology.' }} />
                </div>
                <div className='ms-Grid-col ms-u-sm4 block'>
                  <label>Company Email *:</label>
                </div>
                <div className="ms-Grid-col ms-u-sm8 block">
                  <Control.text model=".CompanyEmail" id='.CompanyEmail' className={styles.marginb} component={TextField}
                    validators={{
                      requiredEmail: (val) => val && val.length,
                      isEmail: (val) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) // ES6 property shorthand
                    }} />
                  <Errors
                    className={styles.errors}
                    show="touched"
                    model=".PersonalEmail"
                    messages={{
                      requiredEmail: 'Please provide an email address.',
                      isEmail: (val) => `${val} is not a valid email.`,
                    }}
                  />
                </div>
                <DefaultButton id="DefaultSubmit" primary={true} text={"Submit"} type="submit"
                  disabled={!this.state.isDisable} className={styles.button} />
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private onSelectedItem = (data: { key: string; name: string }[]): void => {
    this.setState({ selectedTechnologies: data });
  }
  private convertTechnologyinString = (data: { key: string; name: string }[]) => {
    let TechnologyName = [];
    for (var i = 0; i < data.length; i++) { TechnologyName.push(data[i].name); }
    var TechnologyString = TechnologyName.toString();
    return TechnologyString;
  }

  public getUserId(email: string): Promise<any> {
    return pnp.sp.site.rootWeb.ensureUser(email).
      then(result => {
        return result.data.Id;
      });
  }
}

const mapStateToProps = (state) => {
  return state;
};

// Maps dispatch to props
const mapDispatchToProps = (dispatch): IBasicFormConnectedDispatch => {
  return {
    setEmpId: (empId) => {
      return dispatch(SetEmpIdInStore(empId));
    },
    setTabName: (tabData: ICommonState) => {
      return dispatch(SetTabName(tabData));
    },
    getBasicDatail: (empListId) => {
      return dispatch(GetEmpBasicData(empListId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicDetail);

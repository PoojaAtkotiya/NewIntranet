"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConstants_1 = require("../AppConstants");
var UtilityService_1 = require("./UtilityService");
var sp_pnp_js_1 = require("sp-pnp-js");
var BasicFormService = /** @class */ (function () {
    function BasicFormService() {
    }
    //Get Emp Basic Data when Id = 0
    BasicFormService.prototype.GetEmpBasicData = function () {
        var basicFormControlsState = {};
        var utilityServiceObj = new UtilityService_1.default();
        return utilityServiceObj.getOptionsFromMaster(AppConstants_1.ListNames.DESIGNATION, 'Designation').then(function (desigResp) {
            basicFormControlsState.designationOptions = desigResp;
            return utilityServiceObj.getOptionsFromMaster(AppConstants_1.ListNames.TECHNOLOGY, 'Title').then(function (techResp) {
                basicFormControlsState.technologyOptions = techResp;
                return basicFormControlsState;
            });
        });
    };
    //Get Emp Basic Data when Id = 0
    BasicFormService.prototype.GetEmpBasicDataById = function (empListId) {
        var basicFormControlsState = {};
        var utilityServiceObj = new UtilityService_1.default();
        return utilityServiceObj.getOptionsFromMaster(AppConstants_1.ListNames.DESIGNATION, 'Designation').then(function (desigResp) {
            basicFormControlsState.designationOptions = desigResp;
            return utilityServiceObj.getOptionsFromMaster(AppConstants_1.ListNames.TECHNOLOGY, 'Title').then(function (techResp) {
                basicFormControlsState.technologyOptions = techResp;
                return utilityServiceObj.GetEmployeeContactListById(empListId).then(function (mainListResp) {
                    basicFormControlsState.FirstName = mainListResp.FirstName;
                    basicFormControlsState.LastName = mainListResp.LastName;
                    basicFormControlsState.CompanyEmail = mainListResp.Email;
                    basicFormControlsState.DateofJoining = new Date(mainListResp.DateofJoining);
                    basicFormControlsState.Designation = mainListResp.Designation; //CurrentDesignation
                    basicFormControlsState.Technology = mainListResp.Technology;
                    return basicFormControlsState;
                });
            });
        });
    };
    //Get Emp Technology
    BasicFormService.prototype.GetEmpTechnology = function (empListId) {
        var technology;
        var utilityServiceObj = new UtilityService_1.default();
        return utilityServiceObj.GetEmployeeContactListById(empListId).then(function (mainListResp) {
            technology = mainListResp.Technology;
            return technology;
        });
    };
    BasicFormService.prototype.AddBasicDetail = function (empData, technologydata, AdLoginName) {
        var web = new sp_pnp_js_1.Web(AppConstants_1.AppConstats.SITEURL);
        return web.lists.getByTitle(AppConstants_1.ListNames.EMPLOYEECONTACT).items.add({
            FirstName: empData.FirstName,
            LastName: empData.LastName,
            Designation: empData.Designation,
            Technology: technologydata,
            DateofJoining: empData.DateofJoining,
            Email: empData.CompanyEmail,
            ADLoginId: AdLoginName
        }).then(function (result) {
            var mainListID = result.data.Id;
            return mainListID;
        }).catch(function (error) {
            console.log("error while adding an basic detail");
            console.log(error);
        });
    };
    BasicFormService.prototype.UpdateBasicDetail = function (basicData, technologydata, empListId, AdLoginName) {
        var web = new sp_pnp_js_1.Web(AppConstants_1.AppConstats.SITEURL);
        return web.lists.getByTitle(AppConstants_1.ListNames.EMPLOYEECONTACT).items.getById(empListId.EmpListID).update({
            FirstName: basicData.FirstName,
            LastName: basicData.LastName,
            Designation: basicData.Designation,
            Technology: technologydata,
            DateofJoining: basicData.DateofJoining,
            Email: basicData.CompanyEmail,
            ADLoginId: AdLoginName
        }).then(function (result) {
            var mainListID = result.data.Id;
            return mainListID;
        }).catch(function (error) {
            console.log("error while updating Basic details");
            console.log(error);
        });
    };
    BasicFormService.prototype.GetCurrentUserGroups = function (email) {
        var web = new sp_pnp_js_1.Web(AppConstants_1.AppConstats.SITEURL);
        var groupList = [];
        return web.siteUsers.getByEmail(email).groups.get().then(function (grps) {
            grps.forEach(function (grp) {
                groupList.push(grp.Title);
            });
            return groupList;
        }).catch(function (error) {
            console.log('error while get user groups');
            console.log(error);
        });
    };
    return BasicFormService;
}());
exports.default = BasicFormService;
//# sourceMappingURL=BasicFormService.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var sp_pnp_js_1 = require("sp-pnp-js");
var Common = /** @class */ (function () {
    function Common() {
    }
    Common.prototype.getDataFromList = function (Url, listName, query, method) {
        var _this = this;
        var url = null;
        if (query == null)
            url = Url + "/_api/web/lists/GetByTitle('" + listName + "')/items";
        else
            url = Url + "/_api/web/lists/GetByTitle('" + listName + "')/items" + query;
        return axios_1.default.get(url)
            .then(function (res) {
            if (res.data.value != undefined && res.data.value != null) {
                return res;
            }
        }).catch(function (error) {
            _this.SaveErrorInList(Url, listName, error);
        });
    };
    Common.prototype.SaveErrorInList = function (Url, methodName, activityoccur) {
        var web = new sp_pnp_js_1.Web(Url);
        web.lists.getByTitle('ErrorLog').items.add({
            Title: methodName,
            Description: String(JSON.stringify(activityoccur))
        }).then(function (result) {
            console.log("Error Log saved successfully");
        }).catch(function (error) {
            console.log("error while adding an Error Log");
        });
    };
    return Common;
}());
exports.default = Common;
//# sourceMappingURL=Common.js.map
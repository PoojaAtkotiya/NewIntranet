import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import axios from 'axios';
import * as jquery from 'jquery';
import { ItemAddResult, Web } from "sp-pnp-js";

export default class Common {
  public getDataFromList(Url, listName, query, method): Promise<any> {
        var url = null;
        if (query == null)
            url = Url + `/_api/web/lists/GetByTitle('` + listName + `')/items`;
        else
            url = Url + `/_api/web/lists/GetByTitle('` + listName + `')/items`+ query;
        return axios.get(url)
            .then(res => {
                if (res.data.value != undefined && res.data.value != null) {
                    return res;
                }
            }).catch(error => {
              this.SaveErrorInList(Url, method, error);              
            });
    }

  public SaveErrorInList(Url, methodName, activityoccur) {
        let web = new Web(Url);
        web.lists.getByTitle('ErrorLog').items.add({
          Title: methodName,
          Description: String(JSON.stringify(activityoccur))
        }).then((result: ItemAddResult) => {
          console.log("Error Log saved successfully");

        }).catch(error => {
          console.log("error while adding an Error Log");
        });
    }

}

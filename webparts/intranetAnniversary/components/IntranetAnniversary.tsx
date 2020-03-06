import * as React from 'react';
import styles from './IntranetAnniversary.module.scss';
import { IIntranetAnniversaryProps } from './IIntranetAnniversaryProps';
import { IIntranetAnniversaryState } from './IIntranetAnniversaryState';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from 'jquery';
import Common from '../../common/Common';
const logo: string = require('../assets/01.jpg');

var getyear = new Date().getFullYear();

export default class Anniversary extends React.Component<IIntranetAnniversaryProps, IIntranetAnniversaryState> {
  public constructor(props: IIntranetAnniversaryProps, state: IIntranetAnniversaryState) {
        super(props);
        this.state = {
            items: [
                {
                    "Title": "No Anniversary Today",
                    "DateofJoining": "",
                    "EmploymentStatus": ""
                }
            ],
            "AnniversaryUser": "",
            "AnniversaryUser1": 0,
            "Counter": 0
        };
    }
    public componentDidMount() {
        this.GetItemsForAnniversary();
    }
    public componentWillMount() {
        var timer = setInterval(() => {
            this.renderUser();
        }, 7000);
    }

    public renderUser() {
        this.setState({
          AnniversaryUser: this.state.items[this.state.Counter].Title,
          AnniversaryUser1: (getyear) - (new Date(this.state.items[this.state.Counter].DateofJoining).getFullYear())

        });
      this.setState({
        Counter: this.state.Counter == this.state.items.length - 1 ? 0 : this.state.Counter + 1
      });
    }

    public GetItemsForAnniversary() {
         var AnniversaryHandler = this;
         let newCommonObj: Common = new Common();
         var url = this.props.siteurl;
         var listName ='EmployeeContact';
         var query = '?$top=1000';
        var method = 'get items for Anniversary';
         newCommonObj.getDataFromList(url, listName, query, method).then(res => {
              if (res.data.value != undefined && res.data.value != null) {
                    var dataFiltered = res.data.value.filter(
                     data => data.Status == 'Active' && new Date(data.DateofJoining).getDate() == new Date().getDate() && new Date(data.DateofJoining).getMonth() == new Date().getMonth() && new Date(data.DateOfJoining).getFullYear() != new Date().getFullYear(),
                      );
                 if (dataFiltered != undefined && dataFiltered != null && dataFiltered.length > 0) {
                     //if dataFiltered has values
                     AnniversaryHandler.setState({
                        items: dataFiltered
                     });
                 }
              }
         }).catch(error => {
           console.log(error);
          }); 
    }

    public render(): React.ReactElement<IIntranetAnniversaryProps> {
        return (
            <div className={ styles.intranetAnniversary }>
                <div className={ styles.container }>
                    <div className={ styles.row }>
                        <div className={ styles.column }>
                            <img src={`${logo}`} className={styles.rightalig} />
                            <div className="ms-Grid-col ms-md12">
                                <div className={styles.BirthdayHeader}>Congratulations</div>

                                {this.state.items.length > 1 ? (

                      <div><div className={styles.para}>{this.state.AnniversaryUser}  </div>
                        <div className={styles.para}>{this.state.AnniversaryUser1} Year Celebration</div>

                                    </div>
                                ) : (<div className={styles.para}>{this.state.items[0].Title} </div>)
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


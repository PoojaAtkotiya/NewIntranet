import * as React from 'react';
import styles from './IntranetAnnouncements.module.scss';
import { IIntranetAnnouncementsProps } from './IIntranetAnnouncementsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IIntranetAnnouncementsState } from "./IIntranetAnnouncementsState";
import axios from "axios";
import { Link } from "office-ui-fabric-react/lib/components/Link";
import Common from '../../common/Common';
const icon: string = require("../assets/icon.png");
const arrow: string = require("../assets/arrow.jpg");

export default class IntranetAnnouncements extends React.Component<IIntranetAnnouncementsProps, IIntranetAnnouncementsState> {
  public constructor(props: IIntranetAnnouncementsProps,state: IIntranetAnnouncementsState) {
    super(props);

    this.state = {
      items: [
        {
          Title: "Test",
          Description: "Test description",
          ExpiryDate: new Date(),
        }
      ],
      status: false
    };
  }
  public componentDidMount() {
    this.GetItemsForAnnouncement();
  }

  public GetItemsForAnnouncement() {
      debugger;
      let newCommonObj: Common = new Common();
      var listName = this.props.listName;
      var url = this.props.siteurl;
      var method = 'get items for announcement';
      newCommonObj.getDataFromList(url, listName, null, method).then(res => {
          if (res.data.value != undefined && res.data.value != null) {
            var dataFiltered = res.data.value.filter(
              data => new Date(data.ExpiryDate).setHours(0, 0, 0, 0) >= new Date().setHours(0,0,0,0)           
            );
            this.setState({ items: dataFiltered });
          }
      }).catch(error => {
          console.log('error while getting data');
          console.log(error);
      });
  }

  public render(): React.ReactElement<IIntranetAnnouncementsProps> {
    if (this.state.items.length >0) {
      return (
        <div className={styles.intranetAnnouncements}>
          <div className={styles.container}>
            <img src={`${icon}`} className={styles.rightalig} />

            <p className={styles.header}>Announcement</p>
            <div className="ms-Grid" dir="ltr">
              <div className={styles.sectionbody}>
                <div className={styles.item}>
                  <div className={styles.jobsection}>
                    <div className={styles.jobitem}>
                      {this.state.items.map((item, key) => {
                        return (
                          <div>
                            <div className="ms-Grid-row">
                              <div className="ms-Grid-col ms-md4">
                                <div className={styles.dateitem}>
                                  <img src={require("../assets/Ann1.png")} alt="test" />
                                </div>
                              </div>
                              <div className="ms-Grid-col ms-md8">
                                <p className={styles.subject}>{item.Title}</p>
                                <p className={styles.subject1}>
                                  {item.Description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link
              href={`${this.props.siteurl}/SitePages/Announcement.aspx`}
              target="_blank"
              className={styles.viewAll}>
              <img src={`${arrow}`} className={styles.viewAll} />
            </Link>
          </div>
        </div>
        
      );
    }
    else {
      return (
        <div className={styles.intranetAnnouncements}>
          <div className={styles.container}>
            <img src={`${icon}`} className={styles.rightalig} />
            <p className={styles.header}>Announcement</p>
            <div className="ms-Grid" dir="ltr">
              <div className={styles.sectionbody}>
                <div className={styles.item}>
                  <div>
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-md4">
                      <div className={styles.dateitem}>
                        <img src={require("../assets/Ann1.png")} alt="test" />
                      </div>
                    </div>
                  <div className={styles.jobsection}>
                    <div className={styles.jobitem}>
                      <div className="ms-Grid-col ms-md8">
                        <p className={styles.subject1}>
                          No announcements
                      </p>
                      </div>
                    </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
    }
  }
}

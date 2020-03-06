import * as React from "react";
import styles from "./IntranetJobOpening.module.scss";
import { IIntranetJobOpeningProps } from "./IIntranetJobOpeningProps";
import { IIntranetJobOpeningState } from "./IIntranetJobOpeningState";
import { Link } from "office-ui-fabric-react/lib/components/Link";
import axios from "axios";
import Common from '../../common/Common';
const arrow: string = require("../assets/arrow.jpg");
const logo: string = require("../assets/icon.png");
export default class IntranetJobOpening extends React.Component<IIntranetJobOpeningProps,IIntranetJobOpeningState> {
  public constructor(props: IIntranetJobOpeningProps) {
    super(props);

    this.state = {
      items: [
        {
          Title: "",
          Technology: "Test",
          Experience: "Test description",
          RequirementId:0
        }
      ],
      currentopening: "",
      counter: 0
    };
  }

  public componentDidMount() {
    this.GetItemsForJobOpening();
  }

  public GetItemsForJobOpening() {
      let newCommonObj: Common = new Common();
      var listName = 'OpenPostions';
      var url = this.props.siteurl;
      var query = `?$orderby=RaisedDate desc&$top=3`;
      var method = 'get items for job opening';
      newCommonObj.getDataFromList(url, listName, query, method).then(res => {
              if (res.data.value.length > 0) {
                  const Jobopeningdata = res.data.value;
                  this.setState({ items: Jobopeningdata});
          }
      }).catch(error => {
          console.log('error while getting data');
          console.log(error);
      });
  }

  public render(): React.ReactElement<IIntranetJobOpeningProps> {
    var redirectLink = `${this.props.siteurl}/SitePages/Open-Job-Positions.aspx`;
    return (
      <div className={styles.intranetJobOpening}>
        <div className={styles.container}>
          <img src={`${logo}`} className={styles.rightalig} />
          <p className={styles.header}>Job Openings</p>
          <div className="ms-Grid" dir="ltr">
            <div className={styles.sectionbody}>
              <div className={styles.item}>
                <div className={styles.jobsection}>
                  <div className={styles.jobitem}>
                    {this.state.items.map((item, key)=> {
                      return (
                        <div>
                          <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-md3">
                              <div className={styles.dot}>
                                {item.Technology}
                              </div>
                            </div>
                            <div className="ms-Grid-col  ms-md9 ">
                                
                            <div className={styles.subject}>{item.Title}</div>
                           
                            
                              <div className={styles.subject1}>
                                {item.Experience} Years
                              </div>
                              <div className={styles.subject2}>
                                <Link
                                  href={`/sites/leadership-connection/SitePages/ResumeUpload.aspx?RID=${item.RequirementId}`}
                                  data-interception="off" target="_blank" rel="noopener noreferrer"
                                  className={styles.subject2}
                                >
                                  More Details &rarr;
                                </Link>
                              </div>
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
          <Link href={redirectLink} target='_blank' className={styles.viewAll}>
            <img src={`${arrow}`} className={styles.viewAll} />
          </Link>
        </div>
      </div>
    );
  }
}

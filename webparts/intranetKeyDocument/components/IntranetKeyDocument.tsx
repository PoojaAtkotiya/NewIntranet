import * as React from 'react';
//Styling
import styles from './IntranetKeyDocument.module.scss';
import { Link } from 'office-ui-fabric-react/lib/components/Link';

import { IIntranetKeyDocumentProps } from './IIntranetKeyDocumentProps';
import { IIntranetKeyDocumentState } from './IIntranetKeyDocumentState';
import { escape } from '@microsoft/sp-lodash-subset';
import axios from 'axios';
import Common from '../../common/Common';
const logo: string = require('../assets/logo.png');
const excel: string = require('../assets/excel.png');
const pdf: string = require('../assets/pdf.png');
const word: string = require('../assets/word.png');

export default class IntranetKeyDocument extends React.Component<IIntranetKeyDocumentProps, IIntranetKeyDocumentState> {
  public constructor(props: IIntranetKeyDocumentProps, state: IIntranetKeyDocumentState) {
    super(props);
    this.state = {
      items: [
        {
          File: {
            Name:"",
            LinkingUri: "",
            //FileRef: "",
           File_x0020_Type: ""
          },
          File_x0020_Type: ""
        }
      ]
    };
  }
  public componentDidMount() {
    this.GetItemsForDocuments();
  }
  public GetItemsForDocuments = () => {
      let newCommonObj: Common = new Common();
      var listName = 'Documents';
      var url = this.props.siteurl;
    var query = `?$select=File,File_x0020_Type&$expand=File&$top=3&$orderby=Modified desc`;
      var method = 'get items for Documents';
      newCommonObj.getDataFromList(url, listName, query, method).then(res => {
          if (res.data.value != undefined && res.data.value != null) {
              if (res.data.value.length > 0) {
                  const items = res.data.value;
                  this.setState({ items });
              }
          }
      }).catch(error => {
          console.log('error while getting data');
        console.log(error);
      });
  }
  public render(): React.ReactElement<IIntranetKeyDocumentProps> {
    return (
      <div className={styles.intranetKeyDocument}>
        <div className={styles.container}>
          <img src={`${logo}`} className={styles.rightalig} />
          <p className={styles.header}>Key Documents</p>
          <div className={`ms-Grid ${styles.keyblk}`} dir="ltr">
            {this.state.items.map((item, key) => {
              return (<div className="ms-Grid-row">
                <div className={`ms-Grid-col ms-sm2 ms-md2 ${styles.docimg}`}>
                  {item.File_x0020_Type == 'xlsx'?(
                  <img src={`${excel}`} />
                  ):item.File_x0020_Type == 'pdf'?
                  (<img src={`${pdf}`}/>)
                  :(<img src={`${word}`}/>) }
                  
                </div>
                <div className="ms-Grid-col ms-sm9 ms-md9 filename">
                  <Link href={`${item.File.LinkingUri}`} target='_blank' className={styles.text}>{item.File.Name}</Link>
                </div>
               
              </div>);
            })}
          </div>
        </div>
      </div>
    );
  }
}

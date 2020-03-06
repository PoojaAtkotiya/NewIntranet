import * as React from 'react';
import styles from './IntranetGallery.module.scss';
import { IIntranetGalleryProps } from './IIntranetGalleryProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IIntranetGalleryState } from './IIntranetGalleryState';
import { Link } from 'office-ui-fabric-react/lib/components/Link';
import axios from 'axios';
import Common from '../../common/Common';
const logo: string = require('../assets/logo.png');

export default class IntranetGallery extends React.Component<IIntranetGalleryProps, IIntranetGalleryState> {
 public constructor(props: IIntranetGalleryProps, state: IIntranetGalleryState) {
    super(props);
    this.state = {
      items: [{
        FileRef: ""
      }]
    };
  }
  public componentDidMount(): void {
    this.getimage();
  }
  public getimage = () => {
      let newCommonObj: Common = new Common();
      var listName = 'Quote_Picture';
      var url = this.props.siteurl;
    var query = `?$select=FileRef/FileRef&$top=4&$orderby=Modified desc`;
    var method = 'get images';
      newCommonObj.getDataFromList(url, listName, query, method).then(res => {
              if (res.data.value.length > 0) {
                  const items = res.data.value;
                  this.setState({ items });
              }
      }).catch(error => {
          console.log('error while getting data');
          console.log(error);
      });
  }
  public render(): React.ReactElement<IIntranetGalleryProps> {
    var redirectLink = `${this.props.siteurl}/Quote_Picture/Forms/Thumbnails.aspx`;
    return (
      <div className={styles.intranetGallery}>
        <div className={styles.container}>
          <Link href={redirectLink} target='_blank'>
            <img src={`${logo}`} className={styles.rightalig} />
          </Link>
          <p className={styles.header}>Grid Gallery</p>
          <div className={styles.margin}>
            {this.state.items.map((item, key) => {
              return (
                  <Link href={`${item.FileRef}`} target='_blank' className={styles.imagemain}>
                  <img src={`${item.FileRef}`} className={styles.image} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

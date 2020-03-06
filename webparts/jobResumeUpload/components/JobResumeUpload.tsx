import * as React from 'react';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import { IJobResumeUploadProps } from './IJobResumeUploadProps';
import { IJobResumeUploadState } from './IJobResumeUploadState';
import "@pnp/polyfill-ie11";
import { sp } from "@pnp/sp/presets/all";
import axios from "axios";
import styles from "./JobResumeUpload.module.scss"
import Dialog, { DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

export default class JobResumeUpload extends React.Component<IJobResumeUploadProps, IJobResumeUploadState> {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    Title: "",
                    Technology: "Test",
                    Experience: "Test description",
                    RequirementId: 0
                }
            ],
            Success: "",
            popupOpened: false,
            hideDialog: true
        };
        this.filesave = this.filesave.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    public componentDidMount() {
        var queryParms = new UrlQueryParameterCollection(window.location.href);
        var RequirementID = queryParms.getValue("RID");
        axios.get(`${this.props.siteurl}/_api/web/lists/getbytitle('OpenPostions')/items?$Filter=RequirementId eq ${RequirementID}`)
            .then(res => {
                const Jobopeningdata = res.data.value;
                this.setState({ items: Jobopeningdata });
            })
            .catch(error => {
                console.log(error);
            });
    }
    public render(): React.ReactElement<IJobResumeUploadProps> {
        return (
            <div>
                <Dialog type={DialogType.close} isOpen={this.state.popupOpened} title="Resume Upload" onDismiss={this.closeDialog}
                    containerClassName={''} isDarkOverlay={true} isBlocking={false} >
                    <div>
                        <div>
                            <Label>Thank You for Referring Candidate</Label>
                        </div>
                        <div style={{ paddingTop: '20px' }}>
                            <Button onClick={this.closeDialog} buttonType={ButtonType.primary}>OK</Button>
                        </div>
                    </div>
                </Dialog>
                <div className={styles.intranetJobOpening}>
                    <div className={styles.container}>
                        <p className={styles.header}>Job Openings Resume Upload</p>

                        <div className={styles.item}>
                            <div className={styles.jobsection}>
                                <div className={styles.jobitem}>
                                    {this.state.items.map(function (item, key) {
                                        return (
                                            <div>
                                                <div className="ms-Grid-row">
                                                    <div className="ms-Grid-col ms-md3">
                                                        Designation
                                                    </div>
                                                    <div className="ms-Grid-col  ms-md9 ">
                                                        <div className={styles.subject}>{item.Title}</div>
                                                    </div>
                                                </div>

                                                <div className="ms-Grid-row">
                                                    <div className="ms-Grid-col ms-md3">
                                                        Experience
                                                    </div>
                                                    <div className="ms-Grid-col  ms-md9 ">
                                                        <div className={styles.subject}>{item.Experience}</div>
                                                    </div>
                                                </div>

                                                <div className="ms-Grid-row">
                                                    <div className="ms-Grid-col ms-md3">
                                                        Technology
                                                    </div>
                                                    <div className="ms-Grid-col  ms-md9 ">
                                                        <div className={styles.subject}>{item.Technology}</div>
                                                    </div>
                                                </div>

                                            </div>
                                        );
                                    }) }
                                </div>
                                <div>
                                    <div>
                                        <input type="file" name="myFile" id="newfile" accept=".doc,.docx,.pdf" ></input></div>
                                    <div>
                                        <br></br>
                                        <button onClick={this.filesave}> UploadFile</button></div>
                                </div>
                                <div className={styles.subject} >{this.state.Success}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        );
    }

    private closeDialog(): void {
        this.setState({ popupOpened: false, hideDialog: true })
    }
    private filesave() {
        let myfile = (document.querySelector("#newfile") as HTMLInputElement).files[0];
        if (myfile.size <= 10485760) {
            sp.web.getFolderByServerRelativeUrl("/sites/leadership-connection/JobResumes").files.add(myfile.name, myfile, true).then(f => {
                console.log("File Uploaded");
                f.file.getItem().then(item => {
                    item.update({
                        JobTitle: this.state.items[0].Title,
                        Experience: this.state.items[0].Experience,
                        JobID: this.state.items[0].RequirementId
                    }).then((myupdate) => {
                        this.setState({ Success: "File Uploaded" });
                        this.setState({ popupOpened: true })
                    });
                });
            });
        }
        else {
            sp.web.getFolderByServerRelativeUrl("/sites/leadership-connection/JobResumes")
                .files.addChunked(myfile.name, myfile)
                .then(({ file }) => file.getItem()).then((item: any) => {
                    console.log("File Uploaded");
                    return item.update({
                        JobTitle: this.state.items[0].Title,
                        Experience: this.state.items[0].Experience,
                        JobID: this.state.items[0].RequirementId
                    }).then((myupdate) => {
                        this.setState({ popupOpened: true });
                    });
                }).catch(console.log);
        }
    }
}

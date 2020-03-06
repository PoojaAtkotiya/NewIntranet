export interface IJobResumeUploadState {
    items: [
        {
            Title: string;
            Technology: string;
            Experience: string;
            RequirementId: number;
        }
    ];
    Success: string;
    popupOpened?: boolean;
    hideDialog: boolean;
}

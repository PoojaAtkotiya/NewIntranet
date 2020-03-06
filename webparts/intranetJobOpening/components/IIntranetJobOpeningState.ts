export interface IIntranetJobOpeningState {
    items: [
      {
        Title:string;
        Technology: string;
        Experience: string;
        RequirementId:number;
      }
    ];
    currentopening: string;
    counter: number;
  }

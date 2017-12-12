export interface QurantinePeriod {
    idPk: number;
    startDate: Date;
    text: string;
    closedDate?: Date;
    closedFlag:boolean;
}
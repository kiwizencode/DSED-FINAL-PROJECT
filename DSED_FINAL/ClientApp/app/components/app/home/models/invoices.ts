export interface Invoices {
    idPk: number,
    date: Date,
    doa?: Date,
    flightNo: string,
    total: number,
    supplierFk: number,
    supplierFkNavigation?:any
}
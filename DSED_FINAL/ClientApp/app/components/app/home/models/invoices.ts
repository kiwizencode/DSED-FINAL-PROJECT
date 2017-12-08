export interface Invoices {
    idPk: number,
    date: Date,
    doa?: Date,
    flight: string,
    total: number,
    supplierFk: number
}
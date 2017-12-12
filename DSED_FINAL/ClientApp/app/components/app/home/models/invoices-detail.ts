export interface InvoiceDetails {
    idPk: number,
    invFk: number,
    speciesFk: number,
    qty: number,
    label: string,
    cost: number,
    posted: boolean,
    doa: number,    
    code: string,
    invFkNavigation?: any,
    speciesFkNavigation?: any,
    quarantineTank?: any
}
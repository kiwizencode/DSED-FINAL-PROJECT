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
    invFkNavigation?: null,
    speciesFkNavigation?: null
}
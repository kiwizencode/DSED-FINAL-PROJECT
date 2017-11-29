/* Define the structure of the RescorePetSize*/
export interface IPetSize {
    idPk: number,      // Primary Key
    description: string, // Description of Pet Size
    recordPet: number[],
    shipmentItem: number[],
    tankLog: number[]
}
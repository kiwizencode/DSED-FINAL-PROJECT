/* This file will store all API calling for the project. */
export class API_url {
    public static MPI_SPIECES = 'api/MPISpeciesAPI/';
    public static SYSTEM_TABLE_ENDPOINT = 'api/SystemTables/';

    public static GET_SPICIES = API_url.MPI_SPIECES +  'GetSpecies';
    public static GET_SYSTEM_TABLES = API_url.SYSTEM_TABLE_ENDPOINT + 'GetTables' ;
}
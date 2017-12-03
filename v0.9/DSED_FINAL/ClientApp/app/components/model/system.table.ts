/* data structure of the SYSTEM_TABLE */
export interface SystemTable {
    idPk: number;   // Primary Key, incrementing integer
    value: string;  // 'Code' for the record, use this field to do searching or grouping
    text: string;   // Description of the record, for user
    groupFk?: number;
    deleted: boolean;
}
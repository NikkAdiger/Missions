export interface Mission {
    key: string;
    value: string
}

export class Mission {
    _id?: string;
    key: string;
    value: string;
    constructor(key = '', value = ''){
        this.key = key;
        this.value = value;
    }
}
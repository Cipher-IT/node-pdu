import { Deliver } from '../../Deliver';
import { Submit } from '../../Submit';
import { Part } from './Part';
export interface DataOptions {
    data?: string;
    size?: number;
    parts?: Part[];
    isUnicode?: boolean;
}
export declare class Data {
    static readonly HEADER_SIZE = 7;
    private _data;
    private _size;
    private _parts;
    private _isUnicode;
    constructor(options?: DataOptions);
    get data(): string;
    get size(): number;
    get parts(): Part[];
    get isUnicode(): boolean;
    setData(data: string, pdu: Deliver | Submit): this;
    private checkData;
    private prepareParts;
    private partExists;
    private sortParts;
    private splitMessage;
    getText(): string;
    append(pdu: Deliver | Submit): void;
}

import { SCAType } from './SCAType';
export interface SCAOptions {
    type?: SCAType;
}
export declare class SCA {
    type: SCAType;
    private _isAddress;
    private _size;
    private _encoded;
    private _phone;
    constructor(isAddress?: boolean, options?: SCAOptions);
    get isAddress(): boolean;
    get size(): number;
    get encoded(): string;
    get phone(): string | null;
    setPhone(phone: string, detectType?: boolean, SC?: boolean): this;
    private detectScaType;
    getOffset(): number;
    toString(): string;
    static mapFilterDecode(letter: string): string;
    static mapFilterEncode(letter: string): string;
}

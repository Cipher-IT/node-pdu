import { Deliver } from '../../Deliver';
import { Submit } from '../../Submit';
import { Header } from './Header';
export declare class Part {
    readonly data: string;
    readonly size: number;
    readonly text: string;
    readonly header: Header | null;
    constructor(data: string, size: number, text: string, header?: Header);
    private getPduString;
    private getPartSize;
    toString(pdu: Deliver | Submit): string;
}

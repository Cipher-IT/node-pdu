import { PDU } from './PDU';
export interface VPOptions {
    datetime?: Date;
    interval?: number;
}
export declare class VP {
    static readonly PID_ASSIGNED = 0;
    private _datetime;
    private _interval;
    constructor(options?: VPOptions);
    get dateTime(): Date | null;
    setDateTime(datetime: string | Date): this;
    get interval(): number | null;
    setInterval(interval: number): this;
    toString(pdu: PDU): string;
}

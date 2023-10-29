export declare class SCTS {
    readonly time: number;
    readonly tzOff: number;
    constructor(date: Date, tzOff?: number);
    private getDateTime;
    private getDateWithOffset;
    getIsoString(): string;
    toString(): string;
}

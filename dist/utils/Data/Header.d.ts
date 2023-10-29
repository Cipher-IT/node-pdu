export type HeaderParams = {
    POINTER: number;
    SEGMENTS: number;
    CURRENT: number;
} | {
    type: number;
    dataHex: string;
}[];
export declare class Header {
    static readonly IE_CONCAT_8BIT_REF = 0;
    static readonly IE_CONCAT_16BIT_REF = 8;
    private ies;
    private concatIeIdx?;
    constructor(params: HeaderParams);
    toJSON(): {
        POINTER: number | undefined;
        SEGMENTS: number | undefined;
        CURRENT: number | undefined;
    };
    getSize(): number;
    getType(): number | undefined;
    getPointerSize(): number;
    getPointer(): number | undefined;
    getSegments(): number | undefined;
    getCurrent(): number | undefined;
    toString(): string;
}
export interface IES {
    type: number;
    dataHex: string;
    data?: {
        msgRef: number;
        maxMsgNum: number;
        msgSeqNo: number;
    };
}

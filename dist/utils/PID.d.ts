export interface PIDOptions {
    pid?: number;
    indicates?: number;
    type?: number;
}
export declare class PID {
    static readonly PID_ASSIGNED = 0;
    static readonly PID_GSM_03_40 = 1;
    static readonly PID_RESERVED = 2;
    static readonly PID_SPECIFIC = 3;
    static readonly TYPE_IMPLICIT = 0;
    static readonly TYPE_TELEX = 1;
    static readonly TYPE_TELEFAX = 2;
    static readonly TYPE_VOICE = 4;
    static readonly TYPE_ERMES = 5;
    static readonly TYPE_NPS = 6;
    static readonly TYPE_X_400 = 17;
    static readonly TYPE_IEM = 18;
    private _pid;
    private _indicates;
    private _type;
    constructor(options?: PIDOptions);
    get pid(): number;
    setPid(pid: number): this;
    get indicates(): number;
    setIndicates(indicates: number): this;
    get type(): number;
    setType(type: number): this;
    getValue(): number;
    toString(): string;
}

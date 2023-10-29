export declare class SCAType {
    static readonly TYPE_UNKNOWN = 0;
    static readonly TYPE_INTERNATIONAL = 1;
    static readonly TYPE_NATIONAL = 2;
    static readonly TYPE_ACCEPTER_INTO_NET = 3;
    static readonly TYPE_SUBSCRIBER_NET = 4;
    static readonly TYPE_ALPHANUMERICAL = 5;
    static readonly TYPE_TRIMMED = 6;
    static readonly TYPE_RESERVED = 7;
    static readonly PLAN_UNKNOWN = 0;
    static readonly PLAN_ISDN = 1;
    static readonly PLAN_X_121 = 2;
    static readonly PLAN_TELEX = 3;
    static readonly PLAN_NATIONAL = 8;
    static readonly PLAN_INDIVIDUAL = 9;
    static readonly PLAN_ERMES = 10;
    static readonly PLAN_RESERVED = 15;
    private _type;
    private _plan;
    constructor(value?: number);
    get type(): number;
    setType(type: number): this;
    get plan(): number;
    setPlan(plan: number): this;
    getValue(): number;
    toString(): string;
}

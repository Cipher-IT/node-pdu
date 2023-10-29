import { DCS } from './DCS';
import { PID } from './PID';
import { SCA } from './SCA/SCA';
import { DeliverType } from './Type/DeliverType';
import { ReportType } from './Type/ReportType';
import { SubmitType } from './Type/SubmitType';
export interface PDUOptions {
    serviceCenterAddress?: SCA;
    protocolIdentifier?: PID;
    dataCodingScheme?: DCS;
}
export declare abstract class PDU {
    abstract type: DeliverType | ReportType | SubmitType;
    private _address;
    private _serviceCenterAddress;
    private _protocolIdentifier;
    private _dataCodingScheme;
    constructor(address: string | SCA, options?: PDUOptions);
    get address(): SCA;
    setAddress(address: string | SCA): this;
    get serviceCenterAddress(): SCA;
    setServiceCenterAddress(address: SCA | string): this;
    get protocolIdentifier(): PID;
    setProtocolIdentifier(pid: PID): this;
    get dataCodingScheme(): DCS;
    setDataCodingScheme(dcs: DCS): this;
    private findAddress;
}

import { Data } from '../../utils/Data/Data';
import { DCS } from '../../utils/DCS';
import { PDUType } from '../../utils/Type/PDUType';
import { GetSubstr } from '../index';
export default function parseData(type: PDUType, dataCodingScheme: DCS, userDataLength: number, getPduSubstr: GetSubstr): Data;

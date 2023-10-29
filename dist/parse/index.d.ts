import { Deliver } from '../Deliver';
import { Report } from '../Report';
import { Submit } from '../Submit';
export type GetSubstr = (length: number) => string;
export declare function parse(str: string): Submit | Deliver | Report;

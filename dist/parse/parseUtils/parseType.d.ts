import { DeliverType } from '../../utils/Type/DeliverType';
import { ReportType } from '../../utils/Type/ReportType';
import { SubmitType } from '../../utils/Type/SubmitType';
import { GetSubstr } from '../index';
export default function parseType(getPduSubstr: GetSubstr): DeliverType | ReportType | SubmitType;

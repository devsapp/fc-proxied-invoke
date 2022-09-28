import { FunctionConfig } from '../interface/fc-function';
/**
 * 默认的bootstrap，环境变量3者生效顺序：环境变量>自定义参数>默认bootstrap
 * @param functionConfig FunctionConfig
 * @returns
 */
export default function (functionConfig: FunctionConfig): Promise<void>;

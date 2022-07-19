import { InputProps } from './common/entity';
export default class FcTunnelInvokeComponent {
    static readonly supportedDebugIde: string[];
    static readonly supportedDebugRuntime: string[];
    handlerInputs(inputs: InputProps): Promise<{
        [key: string]: any;
    }>;
    /**
     * setup
     * @param inputs
     * @returns
     */
    setup(inputs: InputProps): Promise<void>;
    /**
     * invoke
     * @param inputs
     * @returns
     */
    invoke(inputs: InputProps): Promise<void>;
    /**
     * cleanup
     * @param inputs
     * @returns
     */
    cleanup(inputs: InputProps): Promise<void>;
    /**
     * @Decrepted
     * clean
     * @param inputs
     * @returns
     */
    clean(inputs: InputProps): Promise<void>;
}

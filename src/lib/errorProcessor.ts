
export function processMakeHelperFunctionErr(e: any): void {
    if (e?.code === 'OSSInvalidRequest' && e?.message.includes(`event source 'oss' returned error: Cannot specify overlapping prefix and suffix with same event type`)) {
        throw new Error(`Oss trigger can not be deployed under helper function because it already exists online.Please remove it and exec 's clean' to remove the deployed helper resource. Then try 's setup' again.`);
    }
    throw e;
}

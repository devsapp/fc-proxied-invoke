"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredentials = void 0;
var lodash_1 = __importDefault(require("lodash"));
var logger_1 = __importDefault(require("../common/logger"));
var stdout_formatter_1 = __importDefault(require("./component/stdout-formatter"));
function validateCredentials(creds) {
    if (lodash_1.default.isEmpty(creds === null || creds === void 0 ? void 0 : creds.AccountID)) {
        logger_1.default.warning(stdout_formatter_1.default.stdoutFormatter.warn("credentials validation failed", "empty AccountID, please using 's config add' to add it."));
    }
    if (lodash_1.default.isEmpty(creds === null || creds === void 0 ? void 0 : creds.AccessKeyID)) {
        logger_1.default.warning(stdout_formatter_1.default.stdoutFormatter.warn("credentials validation failed", "empty AccessKeyID, please using 's config add' to add it."));
    }
    if (lodash_1.default.isEmpty(creds === null || creds === void 0 ? void 0 : creds.AccessKeySecret)) {
        logger_1.default.warning(stdout_formatter_1.default.stdoutFormatter.warn("credentials validation failed", "empty AccessKeySecret, please using 's config add' to add it."));
    }
}
exports.validateCredentials = validateCredentials;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3ZhbGlkYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLGtEQUF1QjtBQUN2Qiw0REFBc0M7QUFDdEMsa0ZBQTJEO0FBRTNELFNBQWdCLG1CQUFtQixDQUFDLEtBQW1CO0lBQ25ELElBQUksZ0JBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFNBQVMsQ0FBQyxFQUFFO1FBQzdCLGdCQUFNLENBQUMsT0FBTyxDQUFDLDBCQUFlLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQywrQkFBK0IsRUFBRSx5REFBeUQsQ0FBQyxDQUFDLENBQUM7S0FDcEo7SUFDRCxJQUFJLGdCQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxXQUFXLENBQUMsRUFBRTtRQUMvQixnQkFBTSxDQUFDLE9BQU8sQ0FBQywwQkFBZSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsK0JBQStCLEVBQUUsMkRBQTJELENBQUMsQ0FBQyxDQUFDO0tBQ3RKO0lBQ0QsSUFBSSxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsZUFBZSxDQUFDLEVBQUU7UUFDbkMsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLCtCQUErQixFQUFFLCtEQUErRCxDQUFDLENBQUMsQ0FBQztLQUMxSjtBQUNMLENBQUM7QUFWRCxrREFVQyJ9
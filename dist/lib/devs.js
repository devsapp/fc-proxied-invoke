"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCodeUriWithBuildPath = exports.detectTmpDir = exports.detectNasBaseDir = exports.getRootBaseDir = exports.DEFAULT_NAS_PATH_SUFFIX = exports.DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX = void 0;
var path = __importStar(require("path"));
var fs = __importStar(require("fs-extra"));
var logger_1 = __importDefault(require("../common/logger"));
var lodash_1 = __importDefault(require("lodash"));
var runtime_1 = require("./utils/runtime");
var stdout_formatter_1 = __importDefault(require("./component/stdout-formatter"));
exports.DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX = path.join('.s', 'build', 'artifacts');
exports.DEFAULT_NAS_PATH_SUFFIX = path.join('.s', 'nas');
var DEFAULT_LOCAL_TMP_PATH_SUFFIX = path.join('.s', 'tmp', 'local');
function getRootBaseDir(baseDir) {
    var idx = baseDir.indexOf(exports.DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX);
    if (idx !== -1) { // exist
        return baseDir.substring(0, idx);
    }
    return baseDir;
}
exports.getRootBaseDir = getRootBaseDir;
function detectNasBaseDir(devsPath) {
    var baseDir = getBaseDir(devsPath);
    return path.join(baseDir, exports.DEFAULT_NAS_PATH_SUFFIX);
}
exports.detectNasBaseDir = detectNasBaseDir;
function getBaseDir(devsPath) {
    var idx = devsPath.indexOf(exports.DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX);
    if (idx !== -1) {
        var baseDir = devsPath.substring(0, idx);
        if (!baseDir) {
            return process.cwd();
        }
        return baseDir;
    }
    return path.resolve(path.dirname(devsPath));
}
function detectTmpDir(devsPath, tmpDir) {
    if (tmpDir) {
        return tmpDir;
    }
    var baseDir = getBaseDir(devsPath);
    return path.join(baseDir, DEFAULT_LOCAL_TMP_PATH_SUFFIX);
}
exports.detectTmpDir = detectTmpDir;
function updateCodeUriWithBuildPath(baseDir, functionConfig, serviceName) {
    var buildBasePath = path.join(baseDir, exports.DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX);
    if (!fs.pathExistsSync(buildBasePath) || fs.lstatSync(buildBasePath).isFile() || runtime_1.isCustomContainerRuntime(functionConfig.runtime)) {
        functionConfig.originalCodeUri = functionConfig.codeUri;
        return functionConfig;
    }
    var resolvedFunctionConfig = lodash_1.default.cloneDeep(functionConfig);
    resolvedFunctionConfig.originalCodeUri = functionConfig.codeUri;
    resolvedFunctionConfig.codeUri = path.join(buildBasePath, serviceName, functionConfig.name);
    logger_1.default.info(stdout_formatter_1.default.stdoutFormatter.using('build codeUri', resolvedFunctionConfig.codeUri));
    return resolvedFunctionConfig;
}
exports.updateCodeUriWithBuildPath = updateCodeUriWithBuildPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZGV2cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQTZCO0FBQzdCLDJDQUErQjtBQUMvQiw0REFBc0M7QUFFdEMsa0RBQXVCO0FBQ3ZCLDJDQUEyRDtBQUMzRCxrRkFBMkQ7QUFFOUMsUUFBQSxtQ0FBbUMsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDcEYsUUFBQSx1QkFBdUIsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN0RSxJQUFNLDZCQUE2QixHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztBQUk5RSxTQUFnQixjQUFjLENBQUMsT0FBZTtJQUM1QyxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLDJDQUFtQyxDQUFDLENBQUM7SUFDakUsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxRQUFRO1FBQ3hCLE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDbEM7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBTkQsd0NBTUM7QUFFRCxTQUFnQixnQkFBZ0IsQ0FBQyxRQUFnQjtJQUMvQyxJQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFckMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSwrQkFBdUIsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFKRCw0Q0FJQztBQUVELFNBQVMsVUFBVSxDQUFDLFFBQWdCO0lBQ2xDLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsMkNBQW1DLENBQUMsQ0FBQztJQUVsRSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNkLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUN0QjtRQUNELE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0lBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBRUQsU0FBZ0IsWUFBWSxDQUFDLFFBQWdCLEVBQUUsTUFBZTtJQUM1RCxJQUFJLE1BQU0sRUFBRTtRQUFFLE9BQU8sTUFBTSxDQUFDO0tBQUU7SUFFOUIsSUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBTEQsb0NBS0M7QUFFRCxTQUFnQiwwQkFBMEIsQ0FBQyxPQUFlLEVBQUUsY0FBOEIsRUFBRSxXQUFtQjtJQUM3RyxJQUFNLGFBQWEsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSwyQ0FBbUMsQ0FBQyxDQUFDO0lBQ3RGLElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksa0NBQXdCLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2pJLGNBQWMsQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQztRQUN4RCxPQUFPLGNBQWMsQ0FBQztLQUN2QjtJQUNELElBQU0sc0JBQXNCLEdBQW1CLGdCQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzNFLHNCQUFzQixDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDO0lBQ2hFLHNCQUFzQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVGLGdCQUFNLENBQUMsSUFBSSxDQUFDLDBCQUFlLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNwRyxPQUFPLHNCQUFzQixDQUFDO0FBQ2hDLENBQUM7QUFYRCxnRUFXQyJ9
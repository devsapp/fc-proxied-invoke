'use strict';var a11_0x14d4=['__esModule','lodash','lstatSync','getRootBaseDir','isCustomContainerRuntime','artifacts','runtime','call','1411ozWpCC','default','stdoutFormatter','build\x20codeUri','tmp','__importStar','2369kWeAVI','dirname','build','detectTmpDir','using','DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX','149JLAFbe','info','4aSWQAl','DEFAULT_NAS_PATH_SUFFIX','./component/stdout-formatter','__setModuleDefault','29YAQYiA','239lWzyii','isFile','./utils/runtime','codeUri','originalCodeUri','9704ZDpGgw','173ckUfkL','760901YmYoNI','701527LbQgvD','fs-extra','detectNasBaseDir','join','updateCodeUriWithBuildPath','name','create','resolve','cloneDeep','688362UCBSUY','__createBinding','nas','indexOf','substring','1303uWzfSl','defineProperty'];var a11_0xdd68f8=a11_0x16d2;function a11_0x16d2(_0x2cac8b,_0x14878e){return a11_0x16d2=function(_0x14d473,_0x16d261){_0x14d473=_0x14d473-0xce;var _0x2fca0d=a11_0x14d4[_0x14d473];return _0x2fca0d;},a11_0x16d2(_0x2cac8b,_0x14878e);}(function(_0x3cd066,_0x5424d3){var _0x2e4248=a11_0x16d2;while(!![]){try{var _0x144ff0=-parseInt(_0x2e4248(0xce))*parseInt(_0x2e4248(0xeb))+parseInt(_0x2e4248(0xea))*-parseInt(_0x2e4248(0xf0))+-parseInt(_0x2e4248(0xd8))*parseInt(_0x2e4248(0xf1))+-parseInt(_0x2e4248(0xf3))+-parseInt(_0x2e4248(0xfc))+-parseInt(_0x2e4248(0xde))*parseInt(_0x2e4248(0xe4))+-parseInt(_0x2e4248(0xe6))*-parseInt(_0x2e4248(0xf2));if(_0x144ff0===_0x5424d3)break;else _0x3cd066['push'](_0x3cd066['shift']());}catch(_0x228a76){_0x3cd066['push'](_0x3cd066['shift']());}}}(a11_0x14d4,0x713b6));var __createBinding=this&&this[a11_0xdd68f8(0xfd)]||(Object[a11_0xdd68f8(0xf9)]?function(_0x32d9c9,_0x451d1a,_0x32c349,_0x5e73fb){var _0x310f30=a11_0xdd68f8;if(_0x5e73fb===undefined)_0x5e73fb=_0x32c349;Object[_0x310f30(0xcf)](_0x32d9c9,_0x5e73fb,{'enumerable':!![],'get':function(){return _0x451d1a[_0x32c349];}});}:function(_0x5e62a9,_0x1b0d17,_0x3ebebe,_0x4e3bca){if(_0x4e3bca===undefined)_0x4e3bca=_0x3ebebe;_0x5e62a9[_0x4e3bca]=_0x1b0d17[_0x3ebebe];}),__setModuleDefault=this&&this[a11_0xdd68f8(0xe9)]||(Object[a11_0xdd68f8(0xf9)]?function(_0x5b5d3e,_0x4c4e19){var _0x301d2b=a11_0xdd68f8;Object[_0x301d2b(0xcf)](_0x5b5d3e,_0x301d2b(0xd9),{'enumerable':!![],'value':_0x4c4e19});}:function(_0x348f71,_0x24edb9){var _0xb741bf=a11_0xdd68f8;_0x348f71[_0xb741bf(0xd9)]=_0x24edb9;}),__importStar=this&&this[a11_0xdd68f8(0xdd)]||function(_0x136a32){var _0x4cfc68=a11_0xdd68f8;if(_0x136a32&&_0x136a32[_0x4cfc68(0xd0)])return _0x136a32;var _0x4f2510={};if(_0x136a32!=null){for(var _0x186e76 in _0x136a32)if(_0x186e76!==_0x4cfc68(0xd9)&&Object['hasOwnProperty'][_0x4cfc68(0xd7)](_0x136a32,_0x186e76))__createBinding(_0x4f2510,_0x136a32,_0x186e76);}return __setModuleDefault(_0x4f2510,_0x136a32),_0x4f2510;},__importDefault=this&&this['__importDefault']||function(_0x2db734){var _0x29c01e=a11_0xdd68f8;return _0x2db734&&_0x2db734[_0x29c01e(0xd0)]?_0x2db734:{'default':_0x2db734};};Object[a11_0xdd68f8(0xcf)](exports,a11_0xdd68f8(0xd0),{'value':!![]}),exports[a11_0xdd68f8(0xf7)]=exports[a11_0xdd68f8(0xe1)]=exports[a11_0xdd68f8(0xf5)]=exports[a11_0xdd68f8(0xd3)]=exports[a11_0xdd68f8(0xe7)]=exports[a11_0xdd68f8(0xe3)]=void 0x0;var path=__importStar(require('path')),fs=__importStar(require(a11_0xdd68f8(0xf4))),logger_1=__importDefault(require('../common/logger')),lodash_1=__importDefault(require(a11_0xdd68f8(0xd1))),runtime_1=require(a11_0xdd68f8(0xed)),stdout_formatter_1=__importDefault(require(a11_0xdd68f8(0xe8)));exports[a11_0xdd68f8(0xe3)]=path['join']('.s',a11_0xdd68f8(0xe0),a11_0xdd68f8(0xd5)),exports[a11_0xdd68f8(0xe7)]=path['join']('.s',a11_0xdd68f8(0xfe));var DEFAULT_LOCAL_TMP_PATH_SUFFIX=path[a11_0xdd68f8(0xf6)]('.s',a11_0xdd68f8(0xdc),'local');function getRootBaseDir(_0x2044ba){var _0x562694=a11_0xdd68f8,_0x312bf8=_0x2044ba[_0x562694(0xff)](exports[_0x562694(0xe3)]);if(_0x312bf8!==-0x1)return _0x2044ba[_0x562694(0x100)](0x0,_0x312bf8);return _0x2044ba;}exports[a11_0xdd68f8(0xd3)]=getRootBaseDir;function detectNasBaseDir(_0x43bc2e){var _0x58d94e=a11_0xdd68f8,_0x47336c=getBaseDir(_0x43bc2e);return path[_0x58d94e(0xf6)](_0x47336c,exports[_0x58d94e(0xe7)]);}exports[a11_0xdd68f8(0xf5)]=detectNasBaseDir;function getBaseDir(_0xa30d4e){var _0x45a46d=a11_0xdd68f8,_0x16a162=_0xa30d4e[_0x45a46d(0xff)](exports[_0x45a46d(0xe3)]);if(_0x16a162!==-0x1){var _0x47b21a=_0xa30d4e[_0x45a46d(0x100)](0x0,_0x16a162);if(!_0x47b21a)return process['cwd']();return _0x47b21a;}return path[_0x45a46d(0xfa)](path[_0x45a46d(0xdf)](_0xa30d4e));}function detectTmpDir(_0x39ad73,_0x817d6d){var _0x9bc8aa=a11_0xdd68f8;if(_0x817d6d)return _0x817d6d;var _0x35ee31=getBaseDir(_0x39ad73);return path[_0x9bc8aa(0xf6)](_0x35ee31,DEFAULT_LOCAL_TMP_PATH_SUFFIX);}exports['detectTmpDir']=detectTmpDir;function updateCodeUriWithBuildPath(_0x3a1c9d,_0x2eb2fc,_0x27f2b1){var _0x2ba415=a11_0xdd68f8,_0x2a6738=path[_0x2ba415(0xf6)](_0x3a1c9d,exports[_0x2ba415(0xe3)]);if(!fs['pathExistsSync'](_0x2a6738)||fs[_0x2ba415(0xd2)](_0x2a6738)[_0x2ba415(0xec)]()||runtime_1[_0x2ba415(0xd4)](_0x2eb2fc[_0x2ba415(0xd6)]))return _0x2eb2fc[_0x2ba415(0xef)]=_0x2eb2fc[_0x2ba415(0xee)],_0x2eb2fc;var _0x325078=lodash_1[_0x2ba415(0xd9)][_0x2ba415(0xfb)](_0x2eb2fc);return _0x325078[_0x2ba415(0xef)]=_0x2eb2fc[_0x2ba415(0xee)],_0x325078['codeUri']=path[_0x2ba415(0xf6)](_0x2a6738,_0x27f2b1,_0x2eb2fc[_0x2ba415(0xf8)]),logger_1['default'][_0x2ba415(0xe5)](stdout_formatter_1['default'][_0x2ba415(0xda)][_0x2ba415(0xe2)](_0x2ba415(0xdb),_0x325078[_0x2ba415(0xee)])),_0x325078;}exports[a11_0xdd68f8(0xf7)]=updateCodeUriWithBuildPath;
'use strict';var a11_0x41e6=['resolve','isCustomContainerRuntime','lodash','hasOwnProperty','DEFAULT_NAS_PATH_SUFFIX','DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX','cwd','artifacts','7761DcxKsc','1062977NtujrL','runtime','codeUri','205769AmSBHQ','./component/stdout-formatter','getRootBaseDir','tmp','3GkwgbY','defineProperty','stdoutFormatter','68EthHcW','pathExistsSync','2rXHAlp','info','__esModule','cloneDeep','639480CvPXlm','../common/logger','join','273982tXpxRa','detectNasBaseDir','3wOKVQa','default','create','indexOf','substring','call','1221607qXVssG','name','__importDefault','./utils/runtime','updateCodeUriWithBuildPath','using','build\x20codeUri','__setModuleDefault','fs-extra','2108251ZYJfVi','path'];var a11_0x47c339=a11_0x4037;(function(_0x123ca4,_0x3a1833){var _0x574def=a11_0x4037;while(!![]){try{var _0x5aba79=-parseInt(_0x574def(0x146))*parseInt(_0x574def(0x142))+parseInt(_0x574def(0x152))*parseInt(_0x574def(0x154))+parseInt(_0x574def(0x16d))*-parseInt(_0x574def(0x149))+-parseInt(_0x574def(0x14f))*parseInt(_0x574def(0x14b))+parseInt(_0x574def(0x15a))+-parseInt(_0x574def(0x16e))+parseInt(_0x574def(0x163));if(_0x5aba79===_0x3a1833)break;else _0x123ca4['push'](_0x123ca4['shift']());}catch(_0xbd7b26){_0x123ca4['push'](_0x123ca4['shift']());}}}(a11_0x41e6,0xa24ec));var __createBinding=this&&this['__createBinding']||(Object['create']?function(_0x349a8b,_0x2a33d8,_0x2c1ebc,_0x2c09d8){var _0x37e8f5=a11_0x4037;if(_0x2c09d8===undefined)_0x2c09d8=_0x2c1ebc;Object[_0x37e8f5(0x147)](_0x349a8b,_0x2c09d8,{'enumerable':!![],'get':function(){return _0x2a33d8[_0x2c1ebc];}});}:function(_0x6e0e29,_0x4fd8de,_0x412275,_0x515b05){if(_0x515b05===undefined)_0x515b05=_0x412275;_0x6e0e29[_0x515b05]=_0x4fd8de[_0x412275];}),__setModuleDefault=this&&this[a11_0x47c339(0x161)]||(Object[a11_0x47c339(0x156)]?function(_0x14c158,_0x2a9748){Object['defineProperty'](_0x14c158,'default',{'enumerable':!![],'value':_0x2a9748});}:function(_0x24d453,_0x308779){_0x24d453['default']=_0x308779;}),__importStar=this&&this['__importStar']||function(_0x243ede){var _0x5b5b5d=a11_0x47c339;if(_0x243ede&&_0x243ede[_0x5b5b5d(0x14d)])return _0x243ede;var _0x1b075d={};if(_0x243ede!=null){for(var _0x348857 in _0x243ede)if(_0x348857!==_0x5b5b5d(0x155)&&Object[_0x5b5b5d(0x168)][_0x5b5b5d(0x159)](_0x243ede,_0x348857))__createBinding(_0x1b075d,_0x243ede,_0x348857);}return __setModuleDefault(_0x1b075d,_0x243ede),_0x1b075d;},__importDefault=this&&this[a11_0x47c339(0x15c)]||function(_0x60dee3){var _0x3e76ba=a11_0x47c339;return _0x60dee3&&_0x60dee3[_0x3e76ba(0x14d)]?_0x60dee3:{'default':_0x60dee3};};Object['defineProperty'](exports,a11_0x47c339(0x14d),{'value':!![]}),exports[a11_0x47c339(0x15e)]=exports['detectTmpDir']=exports[a11_0x47c339(0x153)]=exports[a11_0x47c339(0x144)]=exports[a11_0x47c339(0x169)]=exports[a11_0x47c339(0x16a)]=void 0x0;var path=__importStar(require(a11_0x47c339(0x164))),fs=__importStar(require(a11_0x47c339(0x162))),logger_1=__importDefault(require(a11_0x47c339(0x150))),lodash_1=__importDefault(require(a11_0x47c339(0x167))),runtime_1=require(a11_0x47c339(0x15d)),stdout_formatter_1=__importDefault(require(a11_0x47c339(0x143)));exports[a11_0x47c339(0x16a)]=path['join']('.s','build',a11_0x47c339(0x16c)),exports[a11_0x47c339(0x169)]=path[a11_0x47c339(0x151)]('.s','nas');var DEFAULT_LOCAL_TMP_PATH_SUFFIX=path[a11_0x47c339(0x151)]('.s',a11_0x47c339(0x145),'local');function getRootBaseDir(_0x4dd9fa){var _0x24fb60=a11_0x47c339,_0x178cde=_0x4dd9fa['indexOf'](exports[_0x24fb60(0x16a)]);if(_0x178cde!==-0x1)return _0x4dd9fa[_0x24fb60(0x158)](0x0,_0x178cde);return _0x4dd9fa;}exports[a11_0x47c339(0x144)]=getRootBaseDir;function detectNasBaseDir(_0x56d46b){var _0x1dc84e=getBaseDir(_0x56d46b);return path['join'](_0x1dc84e,exports['DEFAULT_NAS_PATH_SUFFIX']);}exports[a11_0x47c339(0x153)]=detectNasBaseDir;function getBaseDir(_0x46ff50){var _0x4aecc7=a11_0x47c339,_0xb59f43=_0x46ff50[_0x4aecc7(0x157)](exports[_0x4aecc7(0x16a)]);if(_0xb59f43!==-0x1){var _0x37e9dc=_0x46ff50['substring'](0x0,_0xb59f43);if(!_0x37e9dc)return process[_0x4aecc7(0x16b)]();return _0x37e9dc;}return path[_0x4aecc7(0x165)](path['dirname'](_0x46ff50));}function a11_0x4037(_0x483fe9,_0x5c506a){return a11_0x4037=function(_0x41e600,_0x403719){_0x41e600=_0x41e600-0x141;var _0x10f936=a11_0x41e6[_0x41e600];return _0x10f936;},a11_0x4037(_0x483fe9,_0x5c506a);}function detectTmpDir(_0x2b1ba1,_0x3c5bc0){if(_0x3c5bc0)return _0x3c5bc0;var _0x20a57b=getBaseDir(_0x2b1ba1);return path['join'](_0x20a57b,DEFAULT_LOCAL_TMP_PATH_SUFFIX);}exports['detectTmpDir']=detectTmpDir;function updateCodeUriWithBuildPath(_0x388e06,_0x316395,_0x5a27be){var _0x2a6427=a11_0x47c339,_0x1141c2=path[_0x2a6427(0x151)](_0x388e06,exports[_0x2a6427(0x16a)]);if(!fs[_0x2a6427(0x14a)](_0x1141c2)||fs['lstatSync'](_0x1141c2)['isFile']()||runtime_1[_0x2a6427(0x166)](_0x316395[_0x2a6427(0x16f)]))return _0x316395;var _0x33084d=lodash_1[_0x2a6427(0x155)][_0x2a6427(0x14e)](_0x316395);return _0x33084d[_0x2a6427(0x141)]=path[_0x2a6427(0x151)](_0x1141c2,_0x5a27be,_0x316395[_0x2a6427(0x15b)]),logger_1[_0x2a6427(0x155)][_0x2a6427(0x14c)](stdout_formatter_1[_0x2a6427(0x155)][_0x2a6427(0x148)][_0x2a6427(0x15f)](_0x2a6427(0x160),_0x33084d[_0x2a6427(0x141)])),_0x33084d;}exports['updateCodeUriWithBuildPath']=updateCodeUriWithBuildPath;
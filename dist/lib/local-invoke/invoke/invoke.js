'use strict';var a32_0x7d10=['rimraf','../../utils/runtime','create','temp-dir','__importStar','unzippedCodeDir','dockerUser','env','131266HcRWqT','containerName','resolveTmpDirToMount','1156791lPfuuA','clean\x20tmp\x20code\x20dir\x20','debugPort','isDockerToolBoxAndEnsureDockerVersion','next','__spreadArrays','nasConfig','727164dSLVwI','__importDefault','defineProperty','value','resolvePasswdMount','done','155785mTUKKI','isFalseValue','.jar','join','resolveNasConfigToMounts','tmpDir','__esModule','802457QPDZkU','sent','resolveRuntimeToDockerImage','ops','extract-zip','trys','.war','triggerConfig','afterInvoke','writeDebugIdeConfigForVscode','default','docker\x20mounts:\x20','../../docker/docker-opts','return','label','image','init','../../../common/logger','runtime','pullFcImageIfNeed','baseDir','call','debuggerPath','../../devs','showDebugIdeTips','pop','codeUri','Source','__setModuleDefault','passwdMount','nasBaseDir','../../docker/docker','sessionId','mounts','prototype','tmpDirMount','../../utils/utils','length','debuggerMount','creds','nasMounts','DEFAULT_NAS_PATH_SUFFIX','cleanUnzippedCodeDir','11MKGtyh','serviceName','log','setDebugIdeConfig','Generator\x20is\x20already\x20executing.','path','sync','customContainerConfig','resolve','throw','compact','toLowerCase','vscode','iterator','DISABLE_BIND_MOUNT_TMP_DIR','fs-extra','882296kDEPVU','functionConfig','transformMountsForToolbox','resolveDebuggerPathToMount','lodash','stringify','1187199fhGVGT','31aIpGHF','inited','name','resolveCodeUriToMount','debugIde','push','debugArgs','codeMount','imageName','debug','endsWith','1ssflNe','functionName','generateRamdomContainerName','showDebugIdeTipsForVscode','ensureDir'];var a32_0x4ba213=a32_0x4a6d;(function(_0x2c5015,_0x4c57ec){var _0x57266a=a32_0x4a6d;while(!![]){try{var _0x16fcde=-parseInt(_0x57266a(0x16c))*-parseInt(_0x57266a(0x15c))+parseInt(_0x57266a(0x150))+parseInt(_0x57266a(0x180))+parseInt(_0x57266a(0x14a))+-parseInt(_0x57266a(0x179))*-parseInt(_0x57266a(0x13a))+-parseInt(_0x57266a(0x173))+parseInt(_0x57266a(0x151))*-parseInt(_0x57266a(0x169));if(_0x16fcde===_0x4c57ec)break;else _0x2c5015['push'](_0x2c5015['shift']());}catch(_0x27ff26){_0x2c5015['push'](_0x2c5015['shift']());}}}(a32_0x7d10,0xe6f30));var __createBinding=this&&this['__createBinding']||(Object[a32_0x4ba213(0x163)]?function(_0x2e63db,_0x1f09eb,_0x524d50,_0x2b5811){if(_0x2b5811===undefined)_0x2b5811=_0x524d50;Object['defineProperty'](_0x2e63db,_0x2b5811,{'enumerable':!![],'get':function(){return _0x1f09eb[_0x524d50];}});}:function(_0x589359,_0xb29ab2,_0x290e7b,_0x4bf834){if(_0x4bf834===undefined)_0x4bf834=_0x290e7b;_0x589359[_0x4bf834]=_0xb29ab2[_0x290e7b];}),__setModuleDefault=this&&this[a32_0x4ba213(0x12b)]||(Object[a32_0x4ba213(0x163)]?function(_0x47481e,_0x481e74){var _0x49e2d1=a32_0x4ba213;Object['defineProperty'](_0x47481e,_0x49e2d1(0x119),{'enumerable':!![],'value':_0x481e74});}:function(_0x5c4778,_0x5ce17c){var _0x50812a=a32_0x4ba213;_0x5c4778[_0x50812a(0x119)]=_0x5ce17c;}),__importStar=this&&this[a32_0x4ba213(0x165)]||function(_0x18f34c){var _0x2bd2cd=a32_0x4ba213;if(_0x18f34c&&_0x18f34c[_0x2bd2cd(0x17f)])return _0x18f34c;var _0x288f67={};if(_0x18f34c!=null){for(var _0x1b1e94 in _0x18f34c)if(_0x1b1e94!==_0x2bd2cd(0x119)&&Object['hasOwnProperty'][_0x2bd2cd(0x124)](_0x18f34c,_0x1b1e94))__createBinding(_0x288f67,_0x18f34c,_0x1b1e94);}return __setModuleDefault(_0x288f67,_0x18f34c),_0x288f67;},__awaiter=this&&this['__awaiter']||function(_0x8d527f,_0x22c968,_0x39e296,_0x136ecb){function _0x526595(_0x36b982){return _0x36b982 instanceof _0x39e296?_0x36b982:new _0x39e296(function(_0x5f4070){_0x5f4070(_0x36b982);});}return new(_0x39e296||(_0x39e296=Promise))(function(_0x10ee77,_0x222161){function _0x37902e(_0x11bb43){var _0x3af8b3=a32_0x4a6d;try{_0x45366a(_0x136ecb[_0x3af8b3(0x170)](_0x11bb43));}catch(_0x44edeb){_0x222161(_0x44edeb);}}function _0x4dcc51(_0x450649){var _0x7b98d5=a32_0x4a6d;try{_0x45366a(_0x136ecb[_0x7b98d5(0x143)](_0x450649));}catch(_0x32f776){_0x222161(_0x32f776);}}function _0x45366a(_0x73869f){var _0x24c589=a32_0x4a6d;_0x73869f[_0x24c589(0x178)]?_0x10ee77(_0x73869f['value']):_0x526595(_0x73869f[_0x24c589(0x176)])['then'](_0x37902e,_0x4dcc51);}_0x45366a((_0x136ecb=_0x136ecb['apply'](_0x8d527f,_0x22c968||[]))['next']());});},__generator=this&&this['__generator']||function(_0x429690,_0x39179d){var _0x32ea49=a32_0x4ba213,_0x27626d={'label':0x0,'sent':function(){if(_0x5591eb[0x0]&0x1)throw _0x5591eb[0x1];return _0x5591eb[0x1];},'trys':[],'ops':[]},_0x123f69,_0x58927d,_0x5591eb,_0x232972;return _0x232972={'next':_0x44cd4d(0x0),'throw':_0x44cd4d(0x1),'return':_0x44cd4d(0x2)},typeof Symbol==='function'&&(_0x232972[Symbol[_0x32ea49(0x147)]]=function(){return this;}),_0x232972;function _0x44cd4d(_0xac5503){return function(_0x3dbbdf){return _0x53e4fb([_0xac5503,_0x3dbbdf]);};}function _0x53e4fb(_0x750581){var _0x4f8ad0=_0x32ea49;if(_0x123f69)throw new TypeError(_0x4f8ad0(0x13e));while(_0x27626d)try{if(_0x123f69=0x1,_0x58927d&&(_0x5591eb=_0x750581[0x0]&0x2?_0x58927d[_0x4f8ad0(0x11c)]:_0x750581[0x0]?_0x58927d[_0x4f8ad0(0x143)]||((_0x5591eb=_0x58927d[_0x4f8ad0(0x11c)])&&_0x5591eb[_0x4f8ad0(0x124)](_0x58927d),0x0):_0x58927d[_0x4f8ad0(0x170)])&&!(_0x5591eb=_0x5591eb[_0x4f8ad0(0x124)](_0x58927d,_0x750581[0x1]))['done'])return _0x5591eb;if(_0x58927d=0x0,_0x5591eb)_0x750581=[_0x750581[0x0]&0x2,_0x5591eb[_0x4f8ad0(0x176)]];switch(_0x750581[0x0]){case 0x0:case 0x1:_0x5591eb=_0x750581;break;case 0x4:_0x27626d[_0x4f8ad0(0x11d)]++;return{'value':_0x750581[0x1],'done':![]};case 0x5:_0x27626d['label']++,_0x58927d=_0x750581[0x1],_0x750581=[0x0];continue;case 0x7:_0x750581=_0x27626d[_0x4f8ad0(0x112)][_0x4f8ad0(0x128)](),_0x27626d[_0x4f8ad0(0x114)]['pop']();continue;default:if(!(_0x5591eb=_0x27626d['trys'],_0x5591eb=_0x5591eb[_0x4f8ad0(0x134)]>0x0&&_0x5591eb[_0x5591eb[_0x4f8ad0(0x134)]-0x1])&&(_0x750581[0x0]===0x6||_0x750581[0x0]===0x2)){_0x27626d=0x0;continue;}if(_0x750581[0x0]===0x3&&(!_0x5591eb||_0x750581[0x1]>_0x5591eb[0x0]&&_0x750581[0x1]<_0x5591eb[0x3])){_0x27626d[_0x4f8ad0(0x11d)]=_0x750581[0x1];break;}if(_0x750581[0x0]===0x6&&_0x27626d[_0x4f8ad0(0x11d)]<_0x5591eb[0x1]){_0x27626d[_0x4f8ad0(0x11d)]=_0x5591eb[0x1],_0x5591eb=_0x750581;break;}if(_0x5591eb&&_0x27626d[_0x4f8ad0(0x11d)]<_0x5591eb[0x2]){_0x27626d[_0x4f8ad0(0x11d)]=_0x5591eb[0x2],_0x27626d[_0x4f8ad0(0x112)][_0x4f8ad0(0x156)](_0x750581);break;}if(_0x5591eb[0x2])_0x27626d[_0x4f8ad0(0x112)]['pop']();_0x27626d['trys'][_0x4f8ad0(0x128)]();continue;}_0x750581=_0x39179d[_0x4f8ad0(0x124)](_0x429690,_0x27626d);}catch(_0x449426){_0x750581=[0x6,_0x449426],_0x58927d=0x0;}finally{_0x123f69=_0x5591eb=0x0;}if(_0x750581[0x0]&0x5)throw _0x750581[0x1];return{'value':_0x750581[0x0]?_0x750581[0x1]:void 0x0,'done':!![]};}},__spreadArrays=this&&this[a32_0x4ba213(0x171)]||function(){var _0x40249f=a32_0x4ba213;for(var _0x55c7d5=0x0,_0x4764fd=0x0,_0x3a9ba6=arguments[_0x40249f(0x134)];_0x4764fd<_0x3a9ba6;_0x4764fd++)_0x55c7d5+=arguments[_0x4764fd][_0x40249f(0x134)];for(var _0x4424c6=Array(_0x55c7d5),_0x77f2d4=0x0,_0x4764fd=0x0;_0x4764fd<_0x3a9ba6;_0x4764fd++)for(var _0x354975=arguments[_0x4764fd],_0x3ca33a=0x0,_0x37f34a=_0x354975['length'];_0x3ca33a<_0x37f34a;_0x3ca33a++,_0x77f2d4++)_0x4424c6[_0x77f2d4]=_0x354975[_0x3ca33a];return _0x4424c6;},__importDefault=this&&this[a32_0x4ba213(0x174)]||function(_0x4155ce){var _0x45318f=a32_0x4ba213;return _0x4155ce&&_0x4155ce[_0x45318f(0x17f)]?_0x4155ce:{'default':_0x4155ce};};Object[a32_0x4ba213(0x175)](exports,'__esModule',{'value':!![]});var path=__importStar(require(a32_0x4ba213(0x13f))),_=__importStar(require(a32_0x4ba213(0x14e))),docker=__importStar(require(a32_0x4ba213(0x12e))),logger_1=__importDefault(require(a32_0x4ba213(0x120))),dockerOpts=__importStar(require(a32_0x4ba213(0x11b))),fs=__importStar(require(a32_0x4ba213(0x149))),uuid_1=require('uuid'),rimraf=__importStar(require(a32_0x4ba213(0x161))),extract_zip_1=__importDefault(require(a32_0x4ba213(0x113))),tmpDir=__importStar(require(a32_0x4ba213(0x164))),devs_1=require(a32_0x4ba213(0x126)),runtime_1=require(a32_0x4ba213(0x162)),docker_1=require(a32_0x4ba213(0x12e)),utils_1=require(a32_0x4ba213(0x133));function isZipArchive(_0x1ebcc8){var _0x3d1303=a32_0x4ba213;return _0x1ebcc8?_0x1ebcc8[_0x3d1303(0x15b)]('.zip')||_0x1ebcc8[_0x3d1303(0x15b)](_0x3d1303(0x17b))||_0x1ebcc8[_0x3d1303(0x15b)](_0x3d1303(0x115)):![];}function a32_0x4a6d(_0x217fa2,_0x98633b){return a32_0x4a6d=function(_0x7d10ba,_0x4a6d2d){_0x7d10ba=_0x7d10ba-0x110;var _0x53473b=a32_0x7d10[_0x7d10ba];return _0x53473b;},a32_0x4a6d(_0x217fa2,_0x98633b);}function processZipCodeIfNecessary(_0x154f3a){return __awaiter(this,void 0x0,void 0x0,function(){var _0x40bf20;return __generator(this,function(_0x48fa5a){var _0x551943=a32_0x4a6d;switch(_0x48fa5a[_0x551943(0x11d)]){case 0x0:if(!isZipArchive(_0x154f3a))return[0x2,null];_0x40bf20=path[_0x551943(0x17c)](tmpDir,uuid_1['v4']());return[0x4,fs[_0x551943(0x160)](_0x40bf20)];case 0x1:_0x48fa5a[_0x551943(0x110)](),logger_1[_0x551943(0x119)][_0x551943(0x13c)]('codeUri\x20is\x20a\x20zip\x20format,\x20will\x20unzipping\x20to\x20'+_0x40bf20);return[0x4,extract_zip_1[_0x551943(0x119)](_0x154f3a,{'dir':_0x40bf20})];case 0x2:_0x48fa5a['sent']();return[0x2,_0x40bf20];}});});}var Invoke=function(){var _0x16ec07=a32_0x4ba213;function _0x251c9f(_0x4ce85d,_0xebea14,_0x257f5a,_0x45c1de,_0x4e6822,_0xa53fa7,_0x1859ce,_0x5e8779,_0x25bb1f,_0x17b25a,_0x35365d,_0x6ac4b4,_0x3820ff,_0x3e51b8){var _0x50edc7=a32_0x4a6d;this['tunnelService']=_0x4ce85d,this[_0x50edc7(0x12f)]=_0xebea14,this[_0x50edc7(0x136)]=_0x257f5a,this['region']=_0x45c1de,this[_0x50edc7(0x13b)]=_0xa53fa7[_0x50edc7(0x153)],this['serviceConfig']=_0xa53fa7,this[_0x50edc7(0x15d)]=_0x1859ce[_0x50edc7(0x153)],this['functionConfig']=_0x1859ce,this[_0x50edc7(0x116)]=_0x5e8779,this[_0x50edc7(0x16e)]=_0x25bb1f,this['debugIde']=_0x17b25a,this['nasBaseDir']=_0x3e51b8,this[_0x50edc7(0x121)]=this[_0x50edc7(0x14b)][_0x50edc7(0x121)],this[_0x50edc7(0x123)]=_0x4e6822,this[_0x50edc7(0x129)]=this[_0x50edc7(0x14b)][_0x50edc7(0x129)]?path[_0x50edc7(0x142)](this[_0x50edc7(0x123)],this[_0x50edc7(0x14b)][_0x50edc7(0x129)]):null,this['tmpDir']=_0x35365d,this[_0x50edc7(0x125)]=_0x6ac4b4,this[_0x50edc7(0x157)]=_0x3820ff;}return _0x251c9f[_0x16ec07(0x131)][_0x16ec07(0x11f)]=function(){var _0x15d186;return __awaiter(this,void 0x0,void 0x0,function(){var _0x2af237,_0x208271,_0xe5082e,_0x1ec76e,_0x28e87a,_0x4da44b,_0x12b1ec,_0x6fa616,_0x3484e2,_0x4f09d6,_0x395fbe,_0xffff39;return __generator(this,function(_0xb24ba9){var _0x34021f=a32_0x4a6d;switch(_0xb24ba9[_0x34021f(0x11d)]){case 0x0:this[_0x34021f(0x172)]=(_0x15d186=this['serviceConfig'])===null||_0x15d186===void 0x0?void 0x0:_0x15d186[_0x34021f(0x172)],_0x2af237=this;return[0x4,dockerOpts['resolveDockerUser']({'nasConfig':this[_0x34021f(0x172)]})];case 0x1:_0x2af237[_0x34021f(0x167)]=_0xb24ba9['sent'](),_0x208271=this;return[0x4,docker[_0x34021f(0x17d)](this[_0x34021f(0x123)],this['serviceName'],this[_0x34021f(0x172)],this[_0x34021f(0x12d)]||path[_0x34021f(0x17c)](this['baseDir'],devs_1[_0x34021f(0x138)]))];case 0x2:_0x208271[_0x34021f(0x137)]=_0xb24ba9[_0x34021f(0x110)](),_0xe5082e=this;return[0x4,processZipCodeIfNecessary(this[_0x34021f(0x129)])];case 0x3:_0xe5082e[_0x34021f(0x166)]=_0xb24ba9[_0x34021f(0x110)](),_0x1ec76e=this;return[0x4,docker[_0x34021f(0x154)](this['unzippedCodeDir']||this[_0x34021f(0x129)])];case 0x4:_0x1ec76e[_0x34021f(0x158)]=_0xb24ba9[_0x34021f(0x110)](),_0x28e87a=this;if(!(!process['env'][_0x34021f(0x148)]||utils_1[_0x34021f(0x17a)](process[_0x34021f(0x168)][_0x34021f(0x148)])))return[0x3,0x6];return[0x4,docker[_0x34021f(0x16b)](this[_0x34021f(0x17e)])];case 0x5:_0x4da44b=_0xb24ba9[_0x34021f(0x110)]();return[0x3,0x7];case 0x6:_0x4da44b=null,_0xb24ba9[_0x34021f(0x11d)]=0x7;case 0x7:_0x28e87a[_0x34021f(0x132)]=_0x4da44b,_0x12b1ec=this;return[0x4,docker[_0x34021f(0x14d)](this[_0x34021f(0x125)])];case 0x8:_0x12b1ec['debuggerMount']=_0xb24ba9[_0x34021f(0x110)](),_0x6fa616=this;return[0x4,docker[_0x34021f(0x177)]()];case 0x9:_0x6fa616[_0x34021f(0x12c)]=_0xb24ba9[_0x34021f(0x110)](),_0x3484e2=_[_0x34021f(0x144)](__spreadArrays([this[_0x34021f(0x158)]],this[_0x34021f(0x137)],[this[_0x34021f(0x12c)]]));!_['isEmpty'](this['tmpDirMount'])&&_0x3484e2[_0x34021f(0x156)](this['tmpDirMount']);!_['isEmpty'](this[_0x34021f(0x135)])&&_0x3484e2['push'](this[_0x34021f(0x135)]);return[0x4,docker[_0x34021f(0x16f)]()];case 0xa:_0x4f09d6=_0xb24ba9['sent']();_0x4f09d6?this[_0x34021f(0x130)]=dockerOpts[_0x34021f(0x14c)](_0x3484e2):this['mounts']=_0x3484e2;logger_1[_0x34021f(0x119)][_0x34021f(0x15a)](_0x34021f(0x11a)+JSON[_0x34021f(0x14f)](this[_0x34021f(0x130)],null,0x4)),this[_0x34021f(0x16a)]=docker[_0x34021f(0x15e)](),_0x395fbe=runtime_1['isCustomContainerRuntime'](this[_0x34021f(0x121)]);if(!_0x395fbe)return[0x3,0xb];this[_0x34021f(0x159)]=this['functionConfig'][_0x34021f(0x141)][_0x34021f(0x11e)];return[0x3,0xd];case 0xb:_0xffff39=this;return[0x4,dockerOpts[_0x34021f(0x111)](this[_0x34021f(0x121)])];case 0xc:_0xffff39['imageName']=_0xb24ba9[_0x34021f(0x110)](),_0xb24ba9[_0x34021f(0x11d)]=0xd;case 0xd:return[0x4,docker[_0x34021f(0x122)](this[_0x34021f(0x159)])];case 0xe:_0xb24ba9[_0x34021f(0x110)](),this[_0x34021f(0x152)]=!![];return[0x2];}});});},_0x251c9f[_0x16ec07(0x131)]['beforeInvoke']=function(){return __awaiter(this,void 0x0,void 0x0,function(){return __generator(this,function(_0x50171d){return[0x2];});});},_0x251c9f[_0x16ec07(0x131)][_0x16ec07(0x127)]=function(){return __awaiter(this,void 0x0,void 0x0,function(){return __generator(this,function(_0x5961cd){var _0x42f83f=a32_0x4a6d;switch(_0x5961cd[_0x42f83f(0x11d)]){case 0x0:if(!(this[_0x42f83f(0x16e)]&&this[_0x42f83f(0x155)]))return[0x3,0x4];if(!(this[_0x42f83f(0x155)][_0x42f83f(0x145)]()===_0x42f83f(0x146)))return[0x3,0x2];return[0x4,docker[_0x42f83f(0x15f)](this[_0x42f83f(0x13b)],this[_0x42f83f(0x15d)],this[_0x42f83f(0x121)],this[_0x42f83f(0x158)][_0x42f83f(0x12a)],this[_0x42f83f(0x16e)])];case 0x1:_0x5961cd['sent']();return[0x3,0x4];case 0x2:if(!(this[_0x42f83f(0x155)][_0x42f83f(0x145)]()==='pycharm'))return[0x3,0x4];return[0x4,docker['showDebugIdeTipsForPycharm'](this['codeMount'][_0x42f83f(0x12a)],this['debugPort'])];case 0x3:_0x5961cd[_0x42f83f(0x110)](),_0x5961cd[_0x42f83f(0x11d)]=0x4;case 0x4:return[0x2];}});});},_0x251c9f[_0x16ec07(0x131)][_0x16ec07(0x13d)]=function(){return __awaiter(this,void 0x0,void 0x0,function(){return __generator(this,function(_0x445aba){var _0x2a3e4b=a32_0x4a6d;switch(_0x445aba[_0x2a3e4b(0x11d)]){case 0x0:if(!(this[_0x2a3e4b(0x16e)]&&this[_0x2a3e4b(0x155)]))return[0x3,0x2];if(!(this[_0x2a3e4b(0x155)][_0x2a3e4b(0x145)]()===_0x2a3e4b(0x146)))return[0x3,0x2];return[0x4,docker_1[_0x2a3e4b(0x118)](this[_0x2a3e4b(0x123)],this[_0x2a3e4b(0x13b)],this[_0x2a3e4b(0x15d)],this[_0x2a3e4b(0x121)],this[_0x2a3e4b(0x158)][_0x2a3e4b(0x12a)],this[_0x2a3e4b(0x16e)])];case 0x1:_0x445aba[_0x2a3e4b(0x110)](),_0x445aba['label']=0x2;case 0x2:return[0x2];}});});},_0x251c9f[_0x16ec07(0x131)][_0x16ec07(0x139)]=function(){var _0x446fb6=_0x16ec07;this[_0x446fb6(0x166)]&&(rimraf[_0x446fb6(0x140)](this[_0x446fb6(0x166)]),console['log'](_0x446fb6(0x16d)+this['unzippedCodeDir']+'\x20successfully'),this['unzippedCodeDir']=null);},_0x251c9f[_0x16ec07(0x131)][_0x16ec07(0x117)]=function(){return __awaiter(this,void 0x0,void 0x0,function(){return __generator(this,function(_0x444dd6){var _0x5b0f17=a32_0x4a6d;return this[_0x5b0f17(0x139)](),[0x2];});});},_0x251c9f;}();exports['default']=Invoke;
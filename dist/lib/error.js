'use strict';var a16_0x246e=['44971PmEkVt','16vNcnlY','34TSvWfV','error','Aliyun\x20ram\x20AttachPolicyToUser\x20--PolicyName\x20','includes','Via\x20the\x20link:\x20\x20https://shell.aliyun.com/\x20or\x20aliyun\x20cli','Forbbiden','data','printPermissionTip','61bsyNSq','\x20--PolicyType\x20\x22Custom\x22\x20--UserName\x20\x22YOUR_USER_NAME\x22\x0a','752221mcmSqx','7717mzsYPa','default','../common/logger','\x20--PolicyDocument\x20\x22','1420345ORHQwM','Allow','Forbidden.RAM','defineProperty','Message','message','7363KbWglt','throwProcessedFCPermissionError','generatePolicyName','1vuhZzV','throwProcessedPopPermissionError','(Note:\x20aliyun\x20cli\x20tool\x20needs\x20to\x20be\x20configured\x20with\x20credentials\x20that\x20have\x20related\x20RAM\x20permissions,\x20such\x20as\x20primary\x20account\x27s\x20AK)','\x0a2.\x20Attach\x20Policy\x20To\x20User','\x0aYou\x20can\x20run\x20the\x20following\x20commands\x20to\x20grant\x20permission\x20\x27','length','NoPermission','code','1566295nsWFRR','481495eLzXCz','exec','\x27\x20on\x20\x27','slice','__esModule','replace'];var a16_0x41135f=a16_0x361f;(function(_0x5d2fd6,_0x1bb955){var _0x58db6f=a16_0x361f;while(!![]){try{var _0x50963f=parseInt(_0x58db6f(0xc1))*-parseInt(_0x58db6f(0xb8))+parseInt(_0x58db6f(0xa0))*parseInt(_0x58db6f(0xab))+parseInt(_0x58db6f(0xc0))+-parseInt(_0x58db6f(0xb5))*parseInt(_0x58db6f(0xa8))+-parseInt(_0x58db6f(0xaa))+-parseInt(_0x58db6f(0x9e))*parseInt(_0x58db6f(0x9f))+parseInt(_0x58db6f(0xaf));if(_0x50963f===_0x1bb955)break;else _0x5d2fd6['push'](_0x5d2fd6['shift']());}catch(_0x1a5e45){_0x5d2fd6['push'](_0x5d2fd6['shift']());}}}(a16_0x246e,0xceb1f));var __spreadArrays=this&&this['__spreadArrays']||function(){var _0x36cf1a=a16_0x361f;for(var _0x5d7864=0x0,_0x29de50=0x0,_0x2042f4=arguments['length'];_0x29de50<_0x2042f4;_0x29de50++)_0x5d7864+=arguments[_0x29de50][_0x36cf1a(0xbd)];for(var _0x5201b0=Array(_0x5d7864),_0x1a47e6=0x0,_0x29de50=0x0;_0x29de50<_0x2042f4;_0x29de50++)for(var _0x2eae1e=arguments[_0x29de50],_0x107504=0x0,_0x19c5ce=_0x2eae1e['length'];_0x107504<_0x19c5ce;_0x107504++,_0x1a47e6++)_0x5201b0[_0x1a47e6]=_0x2eae1e[_0x107504];return _0x5201b0;},__importDefault=this&&this['__importDefault']||function(_0x5c369f){var _0x5a5333=a16_0x361f;return _0x5c369f&&_0x5c369f[_0x5a5333(0x9c)]?_0x5c369f:{'default':_0x5c369f};};Object[a16_0x41135f(0xb2)](exports,a16_0x41135f(0x9c),{'value':!![]}),exports[a16_0x41135f(0xb6)]=exports[a16_0x41135f(0xa7)]=exports[a16_0x41135f(0xb7)]=exports[a16_0x41135f(0xb9)]=void 0x0;var logger_1=__importDefault(require(a16_0x41135f(0xad)));function throwProcessedPopPermissionError(_0x3ccb38,_0x3f12e8){var _0x355a14=a16_0x41135f;if(!_0x3ccb38[_0x355a14(0xbf)]||!_0x3ccb38['url']||_0x3ccb38[_0x355a14(0xbf)]!==_0x355a14(0xbe)&&_0x3ccb38[_0x355a14(0xbf)]!==_0x355a14(0xb1)&&!_0x3ccb38['code'][_0x355a14(0xa3)](_0x355a14(0xa5)))throw _0x3ccb38;var _0x35e777=new RegExp(/https?:\/\/([a-zA-Z]*).(.*)aliyuncs.com/),_0x35ef7b=_0x35e777[_0x355a14(0xc2)](_0x3ccb38['url']);if(!_0x35ef7b)throw _0x3ccb38;var _0x2b24bd=_0x35ef7b[0x1];_0x3f12e8=_0x2b24bd+':'+_0x3f12e8;var _0x4ca9d7='*';if(_0x3ccb38['data']&&_0x3ccb38[_0x355a14(0xa6)][_0x355a14(0xb3)]){var _0x2915f8=new RegExp(/Resource: (.*) Action: (.*)/),_0x4e89d6=_0x2915f8['exec'](_0x3ccb38[_0x355a14(0xa6)][_0x355a14(0xb3)]);_0x4e89d6&&(_0x4ca9d7=_0x4e89d6[0x1],_0x3f12e8=_0x4e89d6[0x2]);}var _0x40eb40=generatePolicyName(_0x3f12e8);printPermissionTip(_0x40eb40,_0x3f12e8,_0x4ca9d7);throw _0x3ccb38;}function a16_0x361f(_0x551d9c,_0x1b6c68){return a16_0x361f=function(_0x246e45,_0x361f4a){_0x246e45=_0x246e45-0x9a;var _0x5e8e91=a16_0x246e[_0x246e45];return _0x5e8e91;},a16_0x361f(_0x551d9c,_0x1b6c68);}exports['throwProcessedPopPermissionError']=throwProcessedPopPermissionError;function generatePolicyName(_0xe1c7f9){var _0x1d7c5f=a16_0x41135f,_0x42cb41=[];for(var _0x221937=0x1;_0x221937<arguments['length'];_0x221937++){_0x42cb41[_0x221937-0x1]=arguments[_0x221937];}var _0x13505e=_0x42cb41&&_0x42cb41[_0x1d7c5f(0xbd)]?_0x42cb41['join']('-'):Math['random']()['toString'](0x24)[_0x1d7c5f(0x9b)](-0x8);return'fun-generated-'+_0xe1c7f9[_0x1d7c5f(0x9d)](/:/g,'-')+'-'+_0x13505e;}exports[a16_0x41135f(0xb7)]=generatePolicyName;function printPermissionTip(_0x3ccb33,_0x4b5b1b,_0x58a724){var _0x51d819=a16_0x41135f,_0x49fd59={'Version':'1','Statement':[{'Effect':_0x51d819(0xb0),'Action':[_0x4b5b1b],'Resource':[_0x58a724]}]};logger_1[_0x51d819(0xac)][_0x51d819(0xa1)](_0x51d819(0xbc)+_0x4b5b1b+_0x51d819(0x9a)+_0x58a724+'\x27\x20'),logger_1[_0x51d819(0xac)][_0x51d819(0xa1)](_0x51d819(0xa4)),logger_1['default'][_0x51d819(0xa1)](_0x51d819(0xba)),logger_1[_0x51d819(0xac)][_0x51d819(0xa1)]('\x0a1.\x20Create\x20Policy'),logger_1[_0x51d819(0xac)][_0x51d819(0xa1)]('Aliyun\x20ram\x20CreatePolicy\x20--PolicyName\x20'+_0x3ccb33+_0x51d819(0xae)+JSON['stringify'](_0x49fd59)[_0x51d819(0x9d)](/"/g,'\x5c\x22')+'\x22'),logger_1[_0x51d819(0xac)]['error'](_0x51d819(0xbb)),logger_1[_0x51d819(0xac)][_0x51d819(0xa1)](_0x51d819(0xa2)+_0x3ccb33+_0x51d819(0xa9));}exports['printPermissionTip']=printPermissionTip;function throwProcessedFCPermissionError(_0x550f82,_0x3a8ffb){var _0x3f30a9=a16_0x41135f,_0x351b87=[];for(var _0x40e9f7=0x2;_0x40e9f7<arguments['length'];_0x40e9f7++){_0x351b87[_0x40e9f7-0x2]=arguments[_0x40e9f7];}if(!_0x550f82[_0x3f30a9(0xbf)]||_0x550f82['code']!=='AccessDenied'||!_0x550f82[_0x3f30a9(0xb4)])throw _0x550f82;var _0x764338=new RegExp(/the caller is not authorized to perform '(.*)' on resource '(.*)'/),_0x3dc945=_0x764338[_0x3f30a9(0xc2)](_0x550f82[_0x3f30a9(0xb4)]);if(!_0x3dc945)throw _0x550f82;var _0x44480d=_0x3dc945[0x1],_0x4b5499=_0x3dc945[0x2],_0x33a5e2=generatePolicyName['apply'](void 0x0,__spreadArrays([_0x44480d,_0x3a8ffb],_0x351b87));printPermissionTip(_0x33a5e2,_0x44480d,_0x4b5499);throw _0x550f82;}exports[a16_0x41135f(0xb6)]=throwProcessedFCPermissionError;
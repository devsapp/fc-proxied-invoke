'use strict';var a2_0x2eeb=['359GTUEsg','homedir','__esModule','308292xXdPoG','locale','locales','451341nJUDdC','6IgkDRk','__importDefault','3JAzEYx','getProfileFile','I18n','18367XBYbiD','set-config.yml','getDefaultProfilePath','getConfig','21650tbhOzX','setLocale','150881nPumKz','683oYkfaI','default','423338DHBfbr','join'];function a2_0x3f05(_0x596540,_0x5709cc){return a2_0x3f05=function(_0x2eeb4a,_0x3f0596){_0x2eeb4a=_0x2eeb4a-0x1d0;var _0x37b482=a2_0x2eeb[_0x2eeb4a];return _0x37b482;},a2_0x3f05(_0x596540,_0x5709cc);}var a2_0x107442=a2_0x3f05;(function(_0x56d239,_0x43724a){var _0xc0c296=a2_0x3f05;while(!![]){try{var _0x3cc9ca=-parseInt(_0xc0c296(0x1e1))+-parseInt(_0xc0c296(0x1d7))+parseInt(_0xc0c296(0x1e4))+-parseInt(_0xc0c296(0x1d9))*parseInt(_0xc0c296(0x1d0))+parseInt(_0xc0c296(0x1dc))+parseInt(_0xc0c296(0x1d3))*-parseInt(_0xc0c296(0x1e5))+-parseInt(_0xc0c296(0x1da))*-parseInt(_0xc0c296(0x1de));if(_0x3cc9ca===_0x43724a)break;else _0x56d239['push'](_0x56d239['shift']());}catch(_0x4d9998){_0x56d239['push'](_0x56d239['shift']());}}}(a2_0x2eeb,0x37711));var __importDefault=this&&this[a2_0x107442(0x1e6)]||function(_0x192c88){var _0x2a3fb8=a2_0x107442;return _0x192c88&&_0x192c88[_0x2a3fb8(0x1e0)]?_0x192c88:{'default':_0x192c88};};Object['defineProperty'](exports,a2_0x107442(0x1e0),{'value':!![]}),exports['getDefaultProfilePath']=exports[a2_0x107442(0x1d1)]=exports[a2_0x107442(0x1d6)]=void 0x0;var os_1=__importDefault(require('os')),fs_1=__importDefault(require('fs')),path_1=__importDefault(require('path')),js_yaml_1=__importDefault(require('js-yaml')),i18n_1=require('i18n');function getConfig(_0x5131da){var _0x1f5284=getProfileFile();return _0x1f5284[_0x5131da];}exports[a2_0x107442(0x1d6)]=getConfig;function getProfileFile(){var _0x2d7749=a2_0x107442,_0x599b93={};try{var _0x39f101=getDefaultProfilePath();_0x599b93=js_yaml_1[_0x2d7749(0x1db)]['load'](fs_1['default']['readFileSync'](_0x39f101,'utf8'))||{};}catch(_0x46aade){console['log'](_0x46aade);}return _0x599b93;}exports[a2_0x107442(0x1d1)]=getProfileFile;function getDefaultProfilePath(){var _0x2186a3=a2_0x107442;return path_1[_0x2186a3(0x1db)][_0x2186a3(0x1dd)](os_1[_0x2186a3(0x1db)][_0x2186a3(0x1df)](),'.s',_0x2186a3(0x1d4));}exports[a2_0x107442(0x1d5)]=getDefaultProfilePath;var i18n=new i18n_1[(a2_0x107442(0x1d2))]({'locales':['en','zh'],'directory':path_1[a2_0x107442(0x1db)][a2_0x107442(0x1dd)](__dirname,'..','..',a2_0x107442(0x1e3))}),locale=getConfig(a2_0x107442(0x1e2));locale?i18n[a2_0x107442(0x1d8)](locale):i18n[a2_0x107442(0x1d8)]('en');exports[a2_0x107442(0x1db)]=i18n;
'use strict';var a0_0x532c=['comment.text','name','__esModule','push','Method','center','__doc','flags.isPublic','signatures[0].comment.shortText','auto','93749cGarYU','blue','PKG_NAME','defineProperty','doc','left','lib','1btaqyD','76037asJkKh','default','__getBasePath','615891nACsxE','dist','cyan','existsSync','inputs','__importDefault','toString','join','tty-table','151985VMYuAX','readFileSync','not\x20found\x20doc\x20content','456580lkRVNc','100%','116643GePTKR','doc.json','path','5mbMShy','forEach','basePath','542296MhqHwn','../pkg','1SHMYyJ','命令行调用示例','prototype'];var a0_0x927106=a0_0x2c3e;(function(_0x3cf68b,_0x16e94a){var _0x26f9fa=a0_0x2c3e;while(!![]){try{var _0x624f64=parseInt(_0x26f9fa(0x193))+parseInt(_0x26f9fa(0x195))+-parseInt(_0x26f9fa(0x190))*-parseInt(_0x26f9fa(0x183))+parseInt(_0x26f9fa(0x184))*parseInt(_0x26f9fa(0x19d))+parseInt(_0x26f9fa(0x198))*-parseInt(_0x26f9fa(0x17c))+parseInt(_0x26f9fa(0x187))+-parseInt(_0x26f9fa(0x19b));if(_0x624f64===_0x16e94a)break;else _0x3cf68b['push'](_0x3cf68b['shift']());}catch(_0x5265b0){_0x3cf68b['push'](_0x3cf68b['shift']());}}}(a0_0x532c,0x6324f));function a0_0x2c3e(_0xa7d621,_0x36ba66){return a0_0x2c3e=function(_0x532caa,_0x2c3e6f){_0x532caa=_0x532caa-0x177;var _0x21ffab=a0_0x532c[_0x532caa];return _0x21ffab;},a0_0x2c3e(_0xa7d621,_0x36ba66);}var __importDefault=this&&this[a0_0x927106(0x18c)]||function(_0x179313){var _0x4b51f8=a0_0x927106;return _0x179313&&_0x179313[_0x4b51f8(0x1a2)]?_0x179313:{'default':_0x179313};};Object[a0_0x927106(0x17f)](exports,a0_0x927106(0x1a2),{'value':!![]});var fs_1=__importDefault(require('fs')),path_1=__importDefault(require(a0_0x927106(0x197))),tty_table_1=__importDefault(require(a0_0x927106(0x18f))),lodash_get_1=__importDefault(require('lodash.get')),pkg_1=require(a0_0x927106(0x19c)),BaseComponent=function(){var _0x2532b0=a0_0x927106;function _0xac62d9(_0xbdf076){var _0x3ee292=a0_0x2c3e;this[_0x3ee292(0x18b)]=_0xbdf076,this[_0x3ee292(0x1a1)]=pkg_1[_0x3ee292(0x17e)];}return _0xac62d9[_0x2532b0(0x19f)][_0x2532b0(0x186)]=function(){var _0x4d2dea=_0x2532b0;if(this['basePath'])return this[_0x4d2dea(0x19a)];var _0x1d4440=path_1['default']['basename'](__dirname);return _0x1d4440!==_0x4d2dea(0x182)&&_0x1d4440!==_0x4d2dea(0x188)?this[_0x4d2dea(0x19a)]=path_1['default'][_0x4d2dea(0x18e)](__dirname,'..'):this['basePath']=__dirname,this[_0x4d2dea(0x19a)];},_0xac62d9[_0x2532b0(0x19f)][_0x2532b0(0x178)]=function(_0xe0ffe4){var _0x516ef4=_0x2532b0,_0x3a5085=this[_0x516ef4(0x186)](),_0x39abca=path_1[_0x516ef4(0x185)]['join'](_0x3a5085,'..',_0x516ef4(0x180),_0x516ef4(0x196));if(fs_1['default'][_0x516ef4(0x18a)](_0x39abca)){var _0x3e3e34=fs_1[_0x516ef4(0x185)][_0x516ef4(0x191)](_0x39abca)[_0x516ef4(0x18d)](),_0xf5b683=JSON['parse'](_0x3e3e34),_0x372245={'borderStyle':'solid','borderColor':_0x516ef4(0x17d),'headerAlign':_0x516ef4(0x177),'align':'left','color':'cyan','width':_0x516ef4(0x194)},_0x297562=[{'value':'方法','headerColor':'cyan','color':_0x516ef4(0x189),'align':_0x516ef4(0x181),'width':_0x516ef4(0x17b),'formatter':function(_0x118849){return _0x118849;}},{'value':'方法说明','headerColor':_0x516ef4(0x189),'color':'cyan','align':'left','width':_0x516ef4(0x17b),'formatter':function(_0x5266cd){return _0x5266cd;}},{'value':'入参示例','headerColor':_0x516ef4(0x189),'color':_0x516ef4(0x189),'align':_0x516ef4(0x181),'width':_0x516ef4(0x17b),'formatter':function(_0x207d54){return _0x207d54;}},{'value':_0x516ef4(0x19e),'headerColor':'cyan','color':'cyan','align':'left','width':_0x516ef4(0x17b),'formatter':function(_0x5e734a){return _0x5e734a;}}],_0x348d1b=[],_0xdd580=lodash_get_1[_0x516ef4(0x185)](_0xf5b683,'children[0].children',[])['filter'](function(_0x801607){var _0x5e9930=_0x516ef4;return _0x801607['kindString']===_0x5e9930(0x1a4)&&lodash_get_1[_0x5e9930(0x185)](_0x801607,_0x5e9930(0x179));}),_0x56c5fa=_0xe0ffe4?'s\x20'+_0xe0ffe4:'s\x20cli\x20'+this[_0x516ef4(0x1a1)];return _0xdd580[_0x516ef4(0x199)](function(_0x27c09e){var _0x22a82c=_0x516ef4,_0x366ce9=lodash_get_1[_0x22a82c(0x185)](_0x27c09e,'signatures[0].parameters[0]',{}),_0x52bcc3=lodash_get_1[_0x22a82c(0x185)](_0x366ce9,_0x22a82c(0x1a0),'');_0x348d1b[_0x22a82c(0x1a3)]([_0x27c09e[_0x22a82c(0x1a1)],lodash_get_1['default'](_0x27c09e,_0x22a82c(0x17a),''),_0x52bcc3,_0x56c5fa+'\x20'+_0x27c09e[_0x22a82c(0x1a1)]]);}),tty_table_1['default'](_0x297562,_0x348d1b,_0x372245)['render']();}else return _0x516ef4(0x192);},_0xac62d9;}();exports[a0_0x927106(0x185)]=BaseComponent;
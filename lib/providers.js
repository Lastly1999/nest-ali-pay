"use strict";
// nestjs 依赖的提供者文件
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAlipayManage = void 0;
const util_1 = require("./util");
const constants_1 = require("./constants");
function createAlipayManage(name) {
    return {
        provide: name || constants_1.ALI_PAY_MANAGER,
        useFactory: (options) => {
            const alipayManager = (0, util_1.loadPkg)('alipay-sdk', 'AliPayModule', () => require('alipay-sdk'));
            return new alipayManager(Object.assign({}, options));
        },
        inject: [constants_1.ALI_PAY_MODULE_OPTIONS],
    };
}
exports.createAlipayManage = createAlipayManage;

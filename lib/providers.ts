// nestjs 依赖的提供者文件

import {Provider} from "@nestjs/common";
import {loadPkg} from "./util";
import {AlipayModuleOptions} from "./interface";
import {ALI_PAY_MANAGER, ALI_PAY_MODULE_OPTIONS} from "./constants";

export function createAlipayManage(name?:string):Provider{
    return {
        provide: name || ALI_PAY_MANAGER,
        useFactory:(options:AlipayModuleOptions) => {
            const alipayManager = loadPkg('alipay-sdk','AliPayModule',() => require('alipay-sdk'))
            return new alipayManager({ ...options });
        },
        inject: [ALI_PAY_MODULE_OPTIONS],
    }
}
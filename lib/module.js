"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var AliPayModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliPayModule = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const providers_1 = require("./providers");
let AliPayModule = AliPayModule_1 = class AliPayModule {
    static registerAsync(options) {
        return {
            module: AliPayModule_1,
            imports: options.imports,
            providers: [...this.createAsyncProviders(options), ...(options.extraProviders || [])],
            exports: [(options === null || options === void 0 ? void 0 : options.name) || constants_1.ALI_PAY_MANAGER],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options), (0, providers_1.createAlipayManage)(options.name)];
        }
        if (options.useClass) {
            return [
                this.createAsyncOptionsProvider(options),
                {
                    provide: options.useClass,
                    useClass: options.useClass,
                },
                (0, providers_1.createAlipayManage)(options.name),
            ];
        }
        return [];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: constants_1.ALI_PAY_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: constants_1.ALI_PAY_MODULE_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return optionsFactory.createWeChatPayOptions(); }),
            inject: [(options === null || options === void 0 ? void 0 : options.useExisting) || (options === null || options === void 0 ? void 0 : options.useClass) || ''],
        };
    }
};
AliPayModule = AliPayModule_1 = __decorate([
    (0, common_1.Module)({})
], AliPayModule);
exports.AliPayModule = AliPayModule;

import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ALI_PAY_MANAGER, ALI_PAY_MODULE_OPTIONS } from './constants';
import {AlipayModuleOptions, AliPayModuleAsyncOptions, AliPayOptionsFactory} from './interface';
import { createAlipayManage } from './providers';

@Module({})
export class AliPayModule {
    static registerAsync(options: AliPayModuleAsyncOptions): DynamicModule {
        return {
            module: AliPayModule,
            imports: options.imports,
            providers: [...this.createAsyncProviders(options), ...(options.extraProviders || [])],
            exports: [options?.name || ALI_PAY_MANAGER],
        };
    }

    private static createAsyncProviders(options: AliPayModuleAsyncOptions): Provider[] {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options), createAlipayManage(options.name)];
        }
        if (options.useClass) {
            return [
                this.createAsyncOptionsProvider(options),
                {
                    provide: options.useClass,
                    useClass: options.useClass,
                },
                createAlipayManage(options.name),
            ];
        }
        return [];
    }

    private static createAsyncOptionsProvider(options: AliPayModuleAsyncOptions): Provider {
        if (options.useFactory) {
            return {
                provide: ALI_PAY_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: ALI_PAY_MODULE_OPTIONS,
            useFactory: async (optionsFactory: AliPayOptionsFactory) => optionsFactory.createWeChatPayOptions(),
            inject: [options?.useExisting || options?.useClass || ''],
        };
    }
}
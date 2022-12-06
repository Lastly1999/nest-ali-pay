<p align="center" style="display: flex;align-items: center">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
    <span style="margin-right: 10px">X</span>
    <img src="https://gw.alipayobjects.com/mdn/rms_50301b/afts/img/A*xx7OR4Uc9HsAAAAAAAAAAAAAARQnAQ">
</p>
<br/>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Alipay utilities module for [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ npm i --save nest-ali-pay
```

## 模块注册
```typescript
import { Module } from '@nestjs/common';
import { AliPayModule } from 'nest-ali-pay';

@Module({
    imports: [
        AliPayModule.registerAsync({
            useFactory: () => ({
                // 参考下方 SDK 配置
                appId: '2016123456789012',
                // 私钥
                privateKey: fs.readFileSync('./private-key.pem', 'ascii'),
                //可设置AES密钥，调用AES加解密相关接口时需要（可选）
                encryptKey: '请填写您的AES密钥，例如：aa4BtZ4tspm2wnXLb1ThQA',
            }),
        }),
    ],
})
export class AlipayPaymentModule {}
```
## 注入服务
```typescript
import { Inject, Injectable } from '@nestjs/common';
import AlipaySdk from 'alipay-sdk';
import { ALI_PAY_MANAGER } from 'nest-ali-pay';

@Injectable()
export class AlipayPaymentService {
    constructor(@Inject(ALI_PAY_MANAGER) private readonly aliPay: AlipaySdk) {}

    public payment() {
        this.aliPay.exec("")
    }
}
```
## License

Nest is [MIT licensed](LICENSE).
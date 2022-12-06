import {Logger} from "@nestjs/common"

const MISSING_REQUIRED_DEPENDENCY = (name: string, reason: string) =>
    `The "${name}" package is missing. Please, make sure to install this library ($ npm install ${name}) to take advantage of ${reason}.`;

const logger = new Logger("PackageLoader")

export function loadPkg(pkgName:string,context:string,loaderFn:Function){
    try{
        return loaderFn ? loaderFn():require(pkgName)
    }catch (e){
        logger.error(MISSING_REQUIRED_DEPENDENCY(pkgName,context))
        process.exit(1)
    }
}
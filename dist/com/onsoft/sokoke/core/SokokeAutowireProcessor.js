"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeLoggerProxy_1 = require("../logging/SokokeLoggerProxy");
const jec_commons_1 = require("jec-commons");
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
const Sokoke_1 = require("../inject/Sokoke");
const BeanFactory_1 = require("./BeanFactory");
const InjectionPointsFactory_1 = require("../core/InjectionPointsFactory");
const SokokeContextBuilder_1 = require("../builders/SokokeContextBuilder");
const BeanInjectionValidator_1 = require("../utils/validators/BeanInjectionValidator");
class SokokeAutowireProcessor {
    constructor() {
        this._beanFactory = null;
        this._injectPointFactory = null;
        this.initObj();
    }
    initObj() {
        SokokeLocaleManager_1.SokokeLocaleManager.getInstance();
        this._beanFactory = new BeanFactory_1.BeanFactory();
        this._injectPointFactory = new InjectionPointsFactory_1.InjectionPointsFactory();
    }
    processStart(watcher, sourcePath) {
        const sokoke = Sokoke_1.Sokoke.getInstance();
        const context = SokokeContextBuilder_1.SokokeContextBuilder.getInstance().build(watcher.getTarget(), watcher.getContainer().getLocale());
        sokoke.addContext(context);
        sokoke.setCurrentContext(context);
        SokokeLoggerProxy_1.SokokeLoggerProxy.getInstance().log(SokokeLocaleManager_1.SokokeLocaleManager.getInstance().get("process.start"), jec_commons_1.LogLevel.DEBUG);
    }
    process(file, watcher) {
        const decorators = file.decorators;
        const logger = SokokeLoggerProxy_1.SokokeLoggerProxy.getInstance();
        const i18n = SokokeLocaleManager_1.SokokeLocaleManager.getInstance();
        let len = decorators.length;
        let decorator = null;
        let classPath = null;
        let decoratorName = null;
        let fileName = file.name;
        let hasInjectionPoint = false;
        let bean = null;
        let injectPoints = null;
        while (len--) {
            decorator = decorators[len];
            classPath = decorator.classPath;
            decoratorName = decorator.name;
            if (classPath === SokokeAutowireProcessor.JDI_MASK) {
                if (decoratorName === SokokeAutowireProcessor.INJECTABLE_MASK) {
                    logger.log(i18n.get("bean.detected", fileName), jec_commons_1.LogLevel.DEBUG);
                    bean = this._beanFactory.create(file);
                }
                else if (decoratorName === SokokeAutowireProcessor.INJECT_MASK) {
                    hasInjectionPoint = true;
                }
            }
        }
        if (hasInjectionPoint) {
            logger.log(i18n.get("injection.detected", fileName), jec_commons_1.LogLevel.DEBUG);
            injectPoints = this._injectPointFactory.create(file, bean);
            BeanInjectionValidator_1.BeanInjectionValidator.getInstance().validate(bean, injectPoints);
        }
    }
    processComplete(watcher, sourcePath) {
        SokokeLoggerProxy_1.SokokeLoggerProxy.getInstance().log(SokokeLocaleManager_1.SokokeLocaleManager.getInstance().get("process.complete"), jec_commons_1.LogLevel.DEBUG);
    }
}
SokokeAutowireProcessor.JDI_MASK = "jec-jdi";
SokokeAutowireProcessor.INJECTABLE_MASK = "Injectable";
SokokeAutowireProcessor.INJECT_MASK = "Inject";
exports.SokokeAutowireProcessor = SokokeAutowireProcessor;

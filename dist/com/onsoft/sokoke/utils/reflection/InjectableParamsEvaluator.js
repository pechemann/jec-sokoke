"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BeanBuilder_1 = require("../../builders/BeanBuilder");
const jec_commons_1 = require("jec-commons");
const ScopeStrategy_1 = require("../../utils/ScopeStrategy");
const JdiRegExp_1 = require("./JdiRegExp");
const InjectionSanitizer_1 = require("./InjectionSanitizer");
const InjectionString_1 = require("./InjectionString");
class InjectableParamsEvaluator {
    constructor() { }
    getBeanClass(filePath) {
        const beanClass = jec_commons_1.GlobalClassLoader.getInstance().loadClass(filePath);
        return beanClass;
    }
    buildTypes(beanClass, beanType) {
        const types = new Set();
        types.add(beanClass);
        if (beanType)
            types.add(beanType);
        return types;
    }
    extractParams(rawParams, file) {
        const params = {};
        let found = null;
        JdiRegExp_1.JdiRegExp.PARAMS_MATCHER.lastIndex = 0;
        while ((found = JdiRegExp_1.JdiRegExp.PARAMS_MATCHER.exec(rawParams)) !== null) {
            switch (found[1]) {
                case InjectionString_1.InjectionString.NAME:
                    InjectionSanitizer_1.InjectionSanitizer.getInstance().sanitizeName(params, found[2]);
                    break;
                case InjectionString_1.InjectionString.TYPE:
                    InjectionSanitizer_1.InjectionSanitizer.getInstance().sanitizeType(params, found[2], file);
                    break;
                case InjectionString_1.InjectionString.SCOPE:
                    InjectionSanitizer_1.InjectionSanitizer.getInstance().sanitizeScope(params, found[2]);
                    break;
                case InjectionString_1.InjectionString.RETENTION:
                    console.log("retention detected", found[2]);
                    break;
                case InjectionString_1.InjectionString.QUALIFIER:
                    console.log("qualifier detected", found[2]);
                    break;
            }
        }
        return params;
    }
    resolveInjectableParams(file) {
        JdiRegExp_1.JdiRegExp.INJECTABLE_MATCHER.lastIndex = 0;
        const found = JdiRegExp_1.JdiRegExp.INJECTABLE_MATCHER.exec(file.content);
        const rawParams = found[1];
        const params = this.extractParams(rawParams, file);
        return params;
    }
    evaluate(file) {
        const params = this.resolveInjectableParams(file);
        const scope = ScopeStrategy_1.ScopeStrategy.getInstance().resolve(params.scope);
        const classPath = jec_commons_1.PathUtils.getInstance().buildFilePath(file.path, file.name);
        const beanClass = this.getBeanClass(classPath);
        const bean = BeanBuilder_1.BeanBuilder.getInstance()
            .clear()
            .name(params.name)
            .scope(scope)
            .types(this.buildTypes(beanClass, params.type))
            .beanClass(beanClass)
            .className(classPath)
            .build();
        return bean;
    }
}
exports.InjectableParamsEvaluator = InjectableParamsEvaluator;

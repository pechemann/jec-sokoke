"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
const jec_commons_1 = require("jec-commons");
const SokokeInjectionPoint_1 = require("../inject/SokokeInjectionPoint");
class InjectionPointBuilder {
    constructor() {
        this._bean = null;
        this._type = null;
        this._element = null;
        this._className = null;
        this._beanRef = null;
        this._qualifiers = null;
        let msg = null;
        let i18n = null;
        if (InjectionPointBuilder._locked || InjectionPointBuilder.INSTANCE) {
            i18n = SokokeLocaleManager_1.SokokeLocaleManager.getInstance();
            if (i18n.isInitialized()) {
                msg = i18n.get("errors.singleton", "InjectionPointBuilder");
            }
            else {
                msg = "You cannot create a InjectionPointBuilder instance; " +
                    "use getInstance() instead.";
            }
            throw new jec_commons_1.SingletonError(msg);
        }
        InjectionPointBuilder._locked = true;
    }
    static getInstance() {
        if (InjectionPointBuilder.INSTANCE === null) {
            InjectionPointBuilder._locked = false;
            InjectionPointBuilder.INSTANCE = new InjectionPointBuilder();
        }
        return InjectionPointBuilder.INSTANCE;
    }
    bean(bean) {
        this._bean = bean;
        return this;
    }
    type(type) {
        this._type = type;
        return this;
    }
    element(element) {
        this._element = element;
        return this;
    }
    className(className) {
        this._className = className;
        return this;
    }
    ref(beanRef) {
        this._beanRef = beanRef;
        return this;
    }
    qualifiers(qualifiers) {
        this._qualifiers = qualifiers;
        return this;
    }
    clear() {
        this._bean = null;
        this._type = null;
        this._element = null;
        this._className = null;
        this._beanRef = null;
        this._qualifiers = null;
        return this;
    }
    build() {
        let injectionPoint = new SokokeInjectionPoint_1.SokokeInjectionPoint(this._bean, this._type, this._element, this._className, this._beanRef, this._qualifiers);
        return injectionPoint;
    }
}
InjectionPointBuilder._locked = true;
InjectionPointBuilder.INSTANCE = null;
exports.InjectionPointBuilder = InjectionPointBuilder;

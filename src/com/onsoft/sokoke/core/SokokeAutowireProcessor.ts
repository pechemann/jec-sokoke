//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2018 Pascal ECHEMANN.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import {SokokeLoggerProxy} from "../logging/SokokeLoggerProxy";
import {LoggerProxy, FilePreProcessor, FileProperties, DecoratorProperties,
        Locale,
        LogLevel} from "jec-commons";
import {LocaleManager} from "jec-commons-node";
import {SokokeLocaleManager} from "../i18n/SokokeLocaleManager";
import {SokokeError} from "../exceptions/SokokeError";
import * as path from "path";
import {Sokoke} from "../inject/Sokoke";
import {BeanFactory} from "./BeanFactory";
import {InjectionPointFactory} from "../core/InjectionPointFactory";

/**
 * The <code>SokokeAutowireProcessor</code> class allows to find all Sokoke  
 * resources of an <code>EjpContainer</code> instance.
 */
export class SokokeAutowireProcessor implements FilePreProcessor {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SokokeAutowireProcessor</code> instance.
   */
  constructor() {
    this.initObj();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The mask used to detect the <code>jec-jdi</code> imports in a file.
   */
  private static readonly JDI_MASK:string = "jec-jdi";

  /**
   * The mask used to detect the <code>@Injectable</code> decorator in a file.
   * 
   */
  private static readonly INJECTABLE_MASK:string = "Injectable";

  /**
   * The mask used to detect the <code>@Inject</code> decorator in a file.
   * 
   */
  private static readonly INJECT_MASK:string = "Inject";
  
  /**
   * The reference to the <code>BeanFactory</code> instance used by this
   * processor to initialize beans.
   */
  private _beanFactory:BeanFactory = null;

  /**
   * The reference to the <code>InjectionPointFactory</code> instance used by 
   * this processor to initialize injection points.
   */
  private _injectPointFactory:InjectionPointFactory = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////
  
  /**
   * Initialize this object.
   */
  private initObj():void {
    SokokeLocaleManager.getInstance();
    this._beanFactory = new BeanFactory();
    this._injectPointFactory = new InjectionPointFactory();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public processStart(watcher:any, sourcePath:string):void {
    let locale:Locale = watcher.getContainer().getLocale();
    let localeString:string = locale.toString();
    let sokokeLocalesPath:string = path.join(
      process.cwd(), "node_modules/jec-sokoke/public/locales/"
    );
    let cfg:any = {
      directory: sokokeLocalesPath
    };
    SokokeLocaleManager.getInstance().init(localeString, cfg);
    SokokeLoggerProxy.getInstance().log(
      SokokeLocaleManager.getInstance().get("process.start")
    );
    Sokoke.getInstance();
  }

  /**
   * @inheritDoc
   */
  public process(file:FileProperties, watcher:any):void {
    let decorators:DecoratorProperties[] = file.decorators;
    let len:number = decorators.length;
    let decorator:DecoratorProperties = null;
    let classPath:string = null;
    let decoratorName:string = null;
    let logger:LoggerProxy = SokokeLoggerProxy.getInstance();
    let i18n:LocaleManager = SokokeLocaleManager.getInstance();
    let fileName:string = file.name;
    let hasInjectionPoint:boolean = false;
    while(len--) {
      decorator = decorators[len];
      classPath = decorator.classPath;
      decoratorName = decorator.name;
      if(classPath === SokokeAutowireProcessor.JDI_MASK) {
        if(decoratorName === SokokeAutowireProcessor.INJECTABLE_MASK) {
          logger.log(i18n.get("bean.detected", fileName), LogLevel.DEBUG);
          this._beanFactory.addBeanArchive(file);
        } else if(decoratorName === SokokeAutowireProcessor.INJECT_MASK) {
          hasInjectionPoint = true;
        }
      }
    }
    if(hasInjectionPoint) {
      logger.log(
        i18n.get("injection.detected", fileName),
        LogLevel.DEBUG
      );
      this._injectPointFactory.addFileContext(file);
    }
  }

  /**
   * @inheritDoc
   */
  public processComplete(watcher:any, sourcePath:string) {
    SokokeLoggerProxy.getInstance().log(
      SokokeLocaleManager.getInstance().get("process.complete")
    );
  }
}
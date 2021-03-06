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

import {Decorator, LogLevel} from "jec-commons";
import {InjectableParams} from "jec-jdi";
import {SokokeLoggerProxy} from "../../logging/SokokeLoggerProxy";
import {SokokeLocaleManager} from "../../i18n/SokokeLocaleManager";

/**
 * The <code>InjectableDecorator</code> class defines the <code>Decorator</code>  
 * implementation for the JDI <code>@Injectable</code> decorator.
 */
export class InjectableDecorator implements Decorator {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>InjectableDecorator</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public decorate(target:any, params:InjectableParams):any {
    SokokeLoggerProxy.getInstance().log(
      SokokeLocaleManager.getInstance().get(
        "bean.instantiated", target.name, params.scope
      ),
      LogLevel.DEBUG
    );
    return target;
  }
}

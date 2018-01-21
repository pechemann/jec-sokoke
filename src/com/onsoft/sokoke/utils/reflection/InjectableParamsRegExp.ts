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

import {Bean, Scope, InjectableParams, ScopeType} from "jec-jdi";
import {BeanBuilder} from "../../builders/BeanBuilder";
import {FileProperties, UrlStringsEnum} from "jec-commons";
import {ScopeStrategy} from "../../utils/ScopeStrategy";
import * as path from "path";
import {InjectableParamsString} from "./InjectableParamsString";

/**
 * The <code>InjectableParamsRegExp</code> static class provides functionalities
 * for working with regular expressions during bean archives evaluation.  
 */
export class InjectableParamsRegExp {

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>RegExp</code> object that will be used to find injectable
   * parameters declaration for the specified bean archive.
   */
  public static readonly INJECTABLE_MATCHER:RegExp =
                 /(?:jec_jdi_\d+\.Injectable\(\{{1})((\s*?.*?)*?)(?:\}{1}\))/gm;

  /**
   * The <code>RegExp</code> object that will be used to find injectable
   * parameters for the specified bean archive.
   */
  public static readonly PARAMS_MATCHER:RegExp =
                       /(name|type|scope|retention|qualifier)(?:\s*:\s*)(.*)/gm;

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and return a dynamic regex to retreive the import statement for the
   * specified import reference.
   * 
   * @param {string} impRef the compiled reference to the import statement.
   * @return {RegExp} the dynamicly created <code>RegExp</code> object.
   */
  public static getTypeMatcher(impRef:string):RegExp {
    let pattern:string = `(?:const ${impRef} = require\\(\\\")(.*)(?:\\\"\\);)`;
    let matcher:RegExp = new RegExp(pattern);
    return matcher;
  }
}
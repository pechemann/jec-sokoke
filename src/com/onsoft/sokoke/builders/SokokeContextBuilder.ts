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

import {Locale} from "jec-commons";
import {SokokeContext} from "../core/SokokeContext";
import {SokokeContextImpl} from "../core/SokokeContextImpl";
import {SingletonErrorFactory} from "../utils/SingletonErrorFactory";

/**
 * The <code>SokokeContextBuilder</code> singleton allows to build new 
 * <code>SokokeContext</code> objects from the specified parameters.
 */
export class SokokeContextBuilder {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SokokeContextBuilder</code> instance.
   */
  constructor() {
    if(SokokeContextBuilder._locked || SokokeContextBuilder.INSTANCE) {
      new SingletonErrorFactory().throw(SokokeContextBuilder);
    }
    SokokeContextBuilder._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>SokokeContextBuilder</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>SokokeContextBuilder</code> singleton instance reference.
   */
  private static INSTANCE:SokokeContextBuilder = null;

  /**
   * Returns a reference to the <code>SokokeContextBuilder</code> singleton.
   *
   * @return {SokokeContextBuilder} a reference to the 
   *                             <code>SokokeContextBuilder</code> singleton.
   */
  public static getInstance():SokokeContextBuilder {
    if(SokokeContextBuilder.INSTANCE === null) {
      SokokeContextBuilder._locked = false;
      SokokeContextBuilder.INSTANCE = new SokokeContextBuilder();
    }
    return SokokeContextBuilder.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns a new <code>SokokeContext</code> object, built from the specified
   * parameters.
   * 
   * @param {string} domainPath the path to the directory where the domain
   *                            associated whith the new context is deployed.
   * @param {Locale} locale the locale associated whith the context.
   * @return {SokokeContext} the new <code>SokokeContext</code> object, built 
   *                         from the specified parameters.
   */
  public build(domainPath:string, locale:Locale):SokokeContext {
    const context:SokokeContext = new SokokeContextImpl(domainPath, locale);
    return context;
  }
}
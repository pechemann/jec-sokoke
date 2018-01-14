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
import {InjectionPoint, Bean} from "jec-jdi";
import {Member, Parameter} from "jec-commons";

/**
 * The <code>SokokeInjectionPoint</code> class is the implementation of the
 * <code>InjectionPoint</code> for the Sokoke framework.
 */
export class SokokeInjectionPoint implements InjectionPoint {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SokokeInjectionPoint</code> instance.
   * 
   * @param {Bean} bean the <code>Bean</code> object associated with this
   *                    <code>SokokeInjectionPoint</code> instance.
   * @param {any} type the type of the <code>Bean</code> object associatedwith 
   *                   this <code>SokokeInjectionPoint</code> instance.
   * @param {Member|Parameter} element the type of element associated with this
   *                                   <code>SokokeInjectionPoint</code>
   *                                   instance.
   */
  constructor(bean:Bean, type:any, element:Member|Parameter) {
    this.initObj(bean, type, element);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>Bean</code> object associated with this
   * <code>SokokeInjectionPoint</code> instance.
   */
  private _bean:Bean = null;

  /**
   * The type of the <code>Bean</code> object associatedwith this
   * <code>SokokeInjectionPoint</code> instance.
   */
  private _type:any = null;

  /**
   * The type of element associated with this <code>SokokeInjectionPoint</code>
   * instance.
   */
  private _element:Member|Parameter = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {Bean} bean the <code>Bean</code> object associated with this
   *                    <code>SokokeInjectionPoint</code> instance.
   * @param {any} type the type of the <code>Bean</code> object associatedwith 
   *                   this <code>SokokeInjectionPoint</code> instance.
   * @param {Member|Parameter} element the type of element associated with this
   *                                   <code>SokokeInjectionPoint</code>
   *                                   instance.
   */
  private initObj(bean:Bean, type:any, element:Member|Parameter):void {
    this._bean = bean;
    this._type = type;
    this._element = element;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getBean():Bean {
    return this._bean;
  }

  /**
   * @inheritDoc
   */
  public getType():any {
    return this._type;
  }

  /**
   * @inheritDoc
   */
  public getElement():Member|Parameter {
    return this._element;
  }
}
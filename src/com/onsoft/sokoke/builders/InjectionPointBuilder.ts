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

import {InjectionPoint, Bean} from "jec-jdi";
import {Member, Parameter} from "jec-commons";
import {SokokeInjectionPoint} from "../inject/SokokeInjectionPoint";
import {SingletonErrorFactory} from "../utils/SingletonErrorFactory";
import {SokokeContext} from "../core/SokokeContext";
import {Sokoke} from "../inject/Sokoke";
import {SokokeMetadataInjector} from "../metadata/SokokeMetadataInjector";

/**
 * The <code>InjectionPointBuilder</code> singleton allows to build new  
 * <code>InjectionPoint</code> objects from the specified parameters.
 */
export class InjectionPointBuilder {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>InjectionPointBuilder</code> instance.
   */
  constructor() {
    if(InjectionPointBuilder._locked || InjectionPointBuilder.INSTANCE) {
      new SingletonErrorFactory().throw(InjectionPointBuilder);
    }
    InjectionPointBuilder._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>InjectionPointBuilder</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>InjectionPointBuilder</code> singleton instance reference.
   */
  private static INSTANCE:InjectionPointBuilder = null;

  /**
   * Returns a reference to the <code>InjectionPointBuilder</code> singleton.
   *
   * @return {InjectionPointBuilder} a reference to the
   *                               <code>InjectionPointBuilder</code> singleton.
   */
  public static getInstance():InjectionPointBuilder {
    if(InjectionPointBuilder.INSTANCE === null) {
      InjectionPointBuilder._locked = false;
      InjectionPointBuilder.INSTANCE = new InjectionPointBuilder();
    }
    return InjectionPointBuilder.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The type of the <code>Bean</code> object associated with the new
   * <code>InjectionPoint</code> object.
   */
  private _type:any = null;

  /**
   * The type of element associated with the new <code>InjectionPoint</code>
   * object.
   */
  private _element:Member|Parameter = null;

  /**
   * The class name of the <code>Bean</code> object associated with the new
   * <code>InjectionPoint</code> object.
   */
  private _className:string = null;
  
  /**
   * The reference to the name of the <code>Bean</code> object associated with 
   * the new <code>SokokeInjectionPoint</code> instance.
   */
  private _beanRef:string = null;

  /**
   * The list of qualifiers associated with the new
   * <code>SokokeInjectionPoint</code> instance.
   */
  private _qualifiers:Array<string> = null;

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Sets the type of the <code>Bean</code> object associated with the new
   * <code>InjectionPoint</code> object.
   * 
   * @param {any} type the type of the <code>Bean</code> object associated with 
   *                   the new <code>InjectionPoint</code> object.
   * @return {InjectionPointBuilder} the reference to this
   *                                 <code>InjectionPointBuilder</code> object.
   */
  public type(type:any):InjectionPointBuilder {
    this._type = type;
    return this;
  }

  /**
   * Sets the element associated with the new <code>InjectionPoint</code>
   * object.
   * 
   * @param {Member|Parameter} element the element associated with the new
   *                                   <code>InjectionPoint</code> object.
   * @return {InjectionPointBuilder} the reference to this
   *                                 <code>InjectionPointBuilder</code> object.
   */
  public element(element:Member|Parameter):InjectionPointBuilder {
    this._element = element;
    return this;
  }

  /**
   * Sets the class name of the new <code>InjectionPoint</code> object.
   * 
   * @param {string} className the class name of the new 
   *                           <code>InjectionPoint</code> object.
   * @return {InjectionPointBuilder} the reference to this 
   *                                 <code>InjectionPointBuilder</code> object.
   */
  public className(className:string):InjectionPointBuilder {
    this._className = className;
    return this;
  }

  /**
   * Sets the reference to the name of the <code>Bean</code> object associated  
   * with the new <code>SokokeInjectionPoint</code> instance.
   * 
   * @param {string} beanRef the name of the <code>Bean</code> object associated
   *                         with the new <code>InjectionPoint</code> object.
   * @return {InjectionPointBuilder} the reference to this 
   *                                 <code>InjectionPointBuilder</code> object.
   */
  public ref(beanRef:string):InjectionPointBuilder {
    this._beanRef = beanRef;
    return this;
  }

  /**
   * Sets the qualifiers for the new <code>InjectionPoint</code> object.
   * 
   * @param {string} qualifiers the qualifiers for the new 
   *                            <code>InjectionPoint</code> object.
   * @return {InjectionPointBuilder} the reference to this 
   *                                 <code>InjectionPointBuilder</code> object.
   */
  public qualifiers(qualifiers:Array<string>):InjectionPointBuilder {
    this._qualifiers = qualifiers;
    return this;
  }

  /**
   * Resets the builder to its initial, empty state.
   * 
   * @return {InjectionPointBuilder} the reference to this
   *                                 <code>InjectionPointBuilder</code> object.
   */
  public clear():InjectionPointBuilder {
    this._type = null;
    this._element = null;
    this._className = null;
    this._beanRef = null;
    this._qualifiers = null;
    return this;
  }

  /**
   * Returns a new <code>InjectionPoint</code> object, built from the specified
   * properties.
   * 
   * @return {InjectionPoint} the new <code>InjectionPoint</code> object, built
   *                          from the specified properties.
   */
  public build():InjectionPoint {
    const context:SokokeContext =
                           (Sokoke.getInstance() as Sokoke).getCurrentContext();
    const injectionPoint:InjectionPoint = new SokokeInjectionPoint(
      this._type, this._element, this._className, this._beanRef,
      this._qualifiers
    );
    SokokeMetadataInjector.getInstance().injectContext(injectionPoint, context);
    return injectionPoint;
  }
}
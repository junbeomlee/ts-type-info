﻿import {TypePropertyDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./../base/BaseDefinitionBinder";
import {BasePropertyBinder} from "./../base/BasePropertyBinder";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class TypePropertyBinder implements IBaseBinder {
    constructor(
        private baseDefinitionBinder: BaseDefinitionBinder,
        private basePropertyBinder: BasePropertyBinder
    ) {
    }

    bind(def: TypePropertyDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.basePropertyBinder.bind(def);
    }
}

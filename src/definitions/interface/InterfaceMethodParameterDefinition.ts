﻿import {INode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {InterfaceMethodDefinition} from "./InterfaceMethodDefinition";

export class InterfaceMethodParameterDefinition extends BaseParameterDefinition<InterfaceMethodDefinition> {
    constructor(mainFactory: MainFactory, node: INode, parent: InterfaceMethodDefinition) {
        super(mainFactory, node, parent, DefinitionType.InterfaceMethodParameter);
    }
}
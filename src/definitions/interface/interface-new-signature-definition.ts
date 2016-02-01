﻿import * as ts from "typescript";
import {IParentedDefinition} from "./../base";
import {IParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition, IReturnTypedDefinition} from "./../function";
import {TypeExpression} from "./../../expressions";
import {InterfaceNewSignatureParameterDefinition} from "./interface-new-signature-parameter-definition";
import {InterfaceDefinition} from "./interface-definition";
import {applyMixins, TypeChecker} from "./../../utils";

export class InterfaceNewSignatureDefinition
    implements IParameteredDefinition<InterfaceNewSignatureParameterDefinition>, IReturnTypedDefinition, IParentedDefinition<InterfaceDefinition> {

    constructor(typeChecker: TypeChecker, signature: ts.Signature, parent: InterfaceDefinition) {
        this.fillParametersBySignature(typeChecker, signature, this, InterfaceNewSignatureParameterDefinition);
        this.fillReturnTypeExpressionBySignature(typeChecker, signature);
        this.parent = parent;
    }

    // ParentedDefinition
    parent: InterfaceDefinition;
    // ParameteredDefinition
    parameters: InterfaceNewSignatureParameterDefinition[];
    fillParametersBySymbol: (
        typeChecker: TypeChecker,
        symbol: ts.Symbol,
        parent: this,
        parameterDefinition: typeof InterfaceNewSignatureParameterDefinition) => void;
    fillParametersBySignature: (
        typeChecker: TypeChecker,
        signature: ts.Signature,
        parent: this,
        parameterDefinition: typeof InterfaceNewSignatureParameterDefinition) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillReturnTypeExpressionBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
}

applyMixins(InterfaceNewSignatureDefinition, [ParameteredDefinition, ReturnTypedDefinition]);

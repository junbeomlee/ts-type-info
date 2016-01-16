import * as ts from "typescript";
import {TypeExpression} from "./../../expressions";
import {TypeChecker} from "./../../utils";

export interface ITypeExpressionedDefinition {
    fillTypeExpression(typeChecker: TypeChecker, symbol: ts.Symbol): void;
    typeExpression: TypeExpression;
}

export abstract class TypeExpressionedDefinition implements ITypeExpressionedDefinition {
    typeExpression: TypeExpression;

    fillTypeExpression(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.typeExpression = typeChecker.getTypeExpressionOfSymbol(symbol);
    }
}
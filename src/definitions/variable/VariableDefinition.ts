﻿import {MainFactory} from "./../../factories";
import {applyMixins} from "./../../utils";
import {VariableWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {WriteOptions} from "./../../WriteOptions";
import {AmbientableDefinition, NamedDefinition, TypeExpressionedDefinition, ExportableDefinition,
    DefaultExpressionedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {ExpressionDefinition, TypeExpressionDefinition} from "./../expression";
import {VariableDeclarationType} from "./VariableDeclarationType";

export class VariableDefinition extends BaseDefinition
                                implements NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition, AmbientableDefinition {
    declarationType: VariableDeclarationType;

    constructor() {
        super(DefinitionType.Variable);
    }

    write(writeOptions?: WriteOptions) {
        const writer = MainFactory.createWriter(writeOptions);
        const variableWriter = new VariableWriter(writer);
        variableWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }

    // NamedDefinition
    name: string;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // TypeExpressionedDefinition
    typeExpression: TypeExpressionDefinition;
    setTypeExpression: (text: string) => any;
    // DefaultExpressionedDefinition
    defaultExpression: ExpressionDefinition;
    setDefaultExpression: (text: string) => any;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

applyMixins(VariableDefinition, BaseDefinition, [NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition, AmbientableDefinition]);

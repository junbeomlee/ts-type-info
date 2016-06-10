import {StructureFactory} from "./../../factories";
import {ObjectPropertyStructure} from "./../../structures";
import {applyMixins, DefinitionUtils} from "./../../utils";
import {TypeDefinition, ExpressionDefinition} from "./../expression";
import {ObjectPropertyDefinition} from "./../general/ObjectPropertyDefinition";
import {NamedDefinition} from "./NamedDefinition";
import {TypedDefinition} from "./TypedDefinition";
import {DefaultExpressionedDefinition} from "./DefaultExpressionedDefinition";
import {BaseDefinition} from "./BaseDefinition";
import {DefinitionType} from "./DefinitionType";

export interface BaseParameterDefinitionConstructor<ParameterType> {
    new(): ParameterType;
}

export abstract class BaseParameterDefinition extends BaseDefinition implements NamedDefinition, TypedDefinition, DefaultExpressionedDefinition {
    isOptional: boolean;
    isRestParameter: boolean;
    destructuringProperties: ObjectPropertyDefinition[] = [];

    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    addDestructuringProperties(...properties: ObjectPropertyStructure[]) {
        const factory = new StructureFactory();
        this.destructuringProperties.push(...properties.map(p => factory.getObjectProperty(p)));
        return this as any; // todo: type this in TypeScript 2.0
    }

    getDestructuringProperty(nameOrSearchFunction: string | ((property: ObjectPropertyDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.destructuringProperties, nameOrSearchFunction);
    }

    // NamedDefinition
    name: string;
    // TypedDefinition
    type: TypeDefinition;
    setType: (text: string) => any;
    // DefaultExpressionedDefinition
    defaultExpression: ExpressionDefinition;
    setDefaultExpression: (text: string) => any;
}

applyMixins(BaseParameterDefinition, BaseDefinition, [NamedDefinition, TypedDefinition, DefaultExpressionedDefinition]);

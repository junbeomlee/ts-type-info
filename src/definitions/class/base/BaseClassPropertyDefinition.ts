import * as typeConstants from "./../../../typeConstants";
import {applyMixins} from "./../../../utils";
import {DecoratorStructure} from "./../../../structures";
import {DecoratableDefinition, BaseObjectPropertyDefinition, NodedDefinition, JsDocedDefinition} from "./../../base";
import {DecoratorDefinition} from "./../../general";
import {Scope} from "./../Scope";
import {ScopedDefinition} from "./ScopedDefinition";

export class BaseClassPropertyDefinition
        extends BaseObjectPropertyDefinition
        implements DecoratableDefinition, ScopedDefinition, NodedDefinition, JsDocedDefinition {
    // DecoratableDefinition
    decorators: DecoratorDefinition[];
    addDecorator: (structure: DecoratorStructure) => DecoratorDefinition;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => (DecoratorDefinition | null);
    // ScopeDefinition
    scope: Scope;
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
    // JsDocedDefinition
    jsDocText: string;
}

applyMixins(BaseClassPropertyDefinition, BaseObjectPropertyDefinition, [DecoratableDefinition, ScopedDefinition, NodedDefinition, JsDocedDefinition]);

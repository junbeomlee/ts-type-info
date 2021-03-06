import {AsyncableStructure, DecoratableStructure, BaseFunctionStructure, FunctionBodyWriteableStructure} from "./../../base";
import {BaseClassMethodParameterStructure} from "./BaseClassMethodParameterStructure";
import {ScopedStructure} from "./ScopedStructure";

export interface BaseClassMethodStructure<ParameterType extends BaseClassMethodParameterStructure>
    extends BaseFunctionStructure<ParameterType>, AsyncableStructure, DecoratableStructure, ScopedStructure, FunctionBodyWriteableStructure {
}

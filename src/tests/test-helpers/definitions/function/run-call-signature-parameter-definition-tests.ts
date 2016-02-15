﻿import {CallSignatureParameterTestStructure} from "./../../test-structures";
import {CallSignatureParameterDefinition} from "./../../../../definitions";
import {runBaseParameterDefinitionTests} from "./../base";

export function runCallSignatureParameterDefinitionTests(definition: CallSignatureParameterDefinition, structure: CallSignatureParameterTestStructure) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}

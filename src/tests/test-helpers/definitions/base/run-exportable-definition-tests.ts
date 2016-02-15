﻿import * as assert from "assert";
import {IExportableDefinition} from "./../../../../definitions";
import {ExportableTestStructure} from "./../../test-structures";

export function runExportableDefinitionTests(definition: IExportableDefinition, structure: ExportableTestStructure) {
    it(`should ${structure.isExported ? "be" : "not be"} exported.`, () => {
        assert.equal(definition.isExported, structure.isExported || false);
    });

    it(`should ${structure.isNamedExportOfFile ? "be" : "not be"} a named export of the file`, () => {
        assert.equal(definition.isNamedExportOfFile, structure.isNamedExportOfFile || false);
    });

    it(`should ${structure.isDefaultExportOfFile ? "be" : "not be"} a default export of the file`, () => {
        assert.equal(definition.isDefaultExportOfFile, structure.isDefaultExportOfFile || false);
    });
}

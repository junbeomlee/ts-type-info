﻿import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTestsForNonNamed} from "./../../testHelpers";

describe("type node noded tests", () => {
    const code = `var test: string;`;

    const def = getInfoFromString(code, {
        includeTsNodes: true
    });

    runNodedDefinitionTestsForNonNamed(def.variables[0].type.node!);
});

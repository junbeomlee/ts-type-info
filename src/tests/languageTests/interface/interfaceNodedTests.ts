﻿import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTests} from "./../../testHelpers";

describe("interface noded tests", () => {
    const code = `
interface MyInterface {
    myMethod(): string;
}
`;

    const def = getInfoFromString(code, {
        includeCompilerNodes: true
    });

    runNodedDefinitionTests(def.interfaces[0]);
    runNodedDefinitionTests(def.interfaces[0].methods[0]);
});
﻿import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("union type tests", () => {
    const code = `
class MyClass {
    prop: MyClass | MyOtherClass<string>;
}

class MyOtherClass<T> {
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClass",
            properties: [{
                name: "prop",
                type: {
                    text: "MyClass | MyOtherClass<string>",
                    unionTypes: [{
                        text: "MyClass",
                        definitions: [{
                            name: "MyClass"
                        }]
                    }, {
                        text: "MyOtherClass<string>",
                        typeArguments: [{
                            text: "string"
                        }],
                        definitions: [{
                            name: "MyOtherClass"
                        }]
                    }]
                }
            }]
        }, {
            name: "MyOtherClass",
            typeParameters: [{
                name: "T"
            }]
        }]
    });
});

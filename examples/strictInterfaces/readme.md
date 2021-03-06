﻿# Strict Interfaces

## Input

```typescript
interface Person {
    firstName: string;
    lastName: string;
    address?: Address;
}

interface Address {
    firstLine: string;
    secondLine?: string;
    city: string;
}
```

## Code

```typescript
import {getInfoFromFiles} from "ts-type-info";

const fileName = "input.ts";
const info = getInfoFromFiles([fileName]);
const file = info.getFile(fileName);

file.interfaces.forEach(interfaceDef => {
    info.renameDefinitionAs(interfaceDef, interfaceDef.name + "Strict");

    interfaceDef.properties.forEach(property => {
        property.isOptional = false;
    });
});

const output = file.write();
```

## Output

```typescript
interface PersonStrict {
    firstName: string;
    lastName: string;
    address: AddressStrict;
}

interface AddressStrict {
    firstLine: string;
    secondLine: string;
    city: string;
}
```

﻿import {FileDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";

export function getRenameInfosFromReExports(opts: { exportedRenameInfos: RenameInfo[]; searchingModuleSpecifier: string; file: FileDefinition; }) {
    const {exportedRenameInfos, searchingModuleSpecifier, file} = opts;
    const matchingReExports = file.reExports.filter(e => e.moduleSpecifier === searchingModuleSpecifier);
    const validExportedRenameInfos = exportedRenameInfos.filter(i => !i.isRootDefaultExportOfFile());
    const renameInfos: RenameInfo[] = [];

    matchingReExports.forEach(reExportDef => {
        if (reExportDef.namedExports.length > 0) {
            reExportDef.namedExports.forEach(namedReExport => {
                validExportedRenameInfos.forEach(renameInfo => {
                    const partName = namedReExport.definitions.length > 0 ? namedReExport.definitions[0].name : namedReExport.exportName;

                    if (this.exportDef.name === partName) {
                        const hasAlias = partName !== namedReExport.exportName;

                        if (!hasAlias || hasAlias && renameInfo.hasNamespaces()) {
                            renameInfos.push(renameInfo.createWithNewFirstNamespace(namedReExport.exportName));
                        }
                    }
                });
            });
        }
        else {
            renameInfos.push(...exportedRenameInfos);
        }
    });

    return renameInfos;
}
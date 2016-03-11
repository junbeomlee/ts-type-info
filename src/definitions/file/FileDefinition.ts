import CodeBlockWriter from "code-block-writer";
import {applyMixins, ArrayExt, Logger} from "./../../utils";
import {MainFactory} from "./../../factories";
import {ISourceFile, INode} from "./../../wrappers";
import {Expression} from "./../../expressions";
import {ExportableDefinitions, NodeDefinitions} from "./../../definitions";
import {FileWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {writeDefinition} from "./../../writeDefinition";
import {IModuledDefinition, ModuledDefinition, BaseDefinition, DefinitionType} from "./../base";
import {NamespaceDefinition} from "./../namespace";
import {ClassDefinition} from "./../class";
import {InterfaceDefinition} from "./../interface";
import {EnumDefinition} from "./../enum";
import {FunctionDefinition} from "./../function";
import {VariableDefinition} from "./../variable";
import {TypeAliasDefinition} from "./../general";
import {ReExportDefinition} from "./ReExportDefinition";
import {ImportDefinition} from "./ImportDefinition";

export class FileDefinition extends BaseDefinition implements IModuledDefinition {
    fileName: string;
    imports = new ArrayExt<ImportDefinition>();
    reExports = new ArrayExt<ReExportDefinition>();
    defaultExport: { expression: Expression; definitions: ArrayExt<ExportableDefinitions>; };

    constructor(mainFactory: MainFactory, sourceFile: ISourceFile) {
        super(DefinitionType.File);
        this.fileName = sourceFile.getFileName();
        this.fillMembersByNode(mainFactory, sourceFile.getNode(), def => {
            if (def.isImportDefinition()) {
                def.parent = this;
                this.imports.push(def);
            }
            else if (def.isReExportDefinition()) {
                def.parent = this;
                this.reExports.push(def);
            }
            else {
                Logger.warn(`Not implemented definition: ${def.name}`);
            }
        });
        this.fillDefaultExport(mainFactory, sourceFile);
    }

    getExports(): ExportableDefinitions[] {
        const exports = ModuledDefinition.prototype.getExports.call(this) as ExportableDefinitions[];

        this.reExports.forEach(reExport => exports.push(...reExport.getExports()));

        return exports;
    }

    write() {
        const writer = new CodeBlockWriter();
        const fileWriter = new FileWriter(writer, WriteFlags.Default);
        fileWriter.write(this);
        return writer.toString();
    }

    writeExportsAsDefinitionFile(options: { imports: { defaultImport: string; moduleSpecifier: string }[]}) {
        console.warn("writeExportsAsDefinitionFile(...) is not supported. It has not been tested.");

        const writer = new CodeBlockWriter();

        if (options && options.imports) {
            // todo: should use an ImportWriter to write this
            options.imports.forEach(importStructure => {
                writer.writeLine(`import ${importStructure.defaultImport} from "${importStructure.moduleSpecifier}";`);
            });

            writer.newLine();
        }

        this.getExports().forEach((exportDef) => {
            writeDefinition(exportDef, writer, WriteFlags.HideFunctionBodies | WriteFlags.HideExpressions | WriteFlags.HidePrivateMembers | WriteFlags.HideProtectedMembers);
            writer.newLine();
        });

        return writer.toString();
    }

    private fillDefaultExport(mainFactory: MainFactory, sourceFile: ISourceFile) {
        const symbol = sourceFile.getDefaultExportSymbol();

        if (symbol != null) {
            const defsOrExpression = mainFactory.getDefinitionsOrExpressionFromExportSymbol(symbol);
            this.defaultExport = {
                definitions: new ArrayExt<ExportableDefinitions>(...defsOrExpression.definitions as ExportableDefinitions[]),
                expression: defsOrExpression.expression
            };
        }
    }

    // ModuledDefinition
    namespaces: ArrayExt<NamespaceDefinition>;
    classes: ArrayExt<ClassDefinition>;
    interfaces: ArrayExt<InterfaceDefinition>;
    enums: ArrayExt<EnumDefinition>;
    functions: ArrayExt<FunctionDefinition>;
    variables: ArrayExt<VariableDefinition>;
    typeAliases: ArrayExt<TypeAliasDefinition>;
    fillMembersByNode: (mainFactory: MainFactory, node: INode, handleCustomDefinition?: (def: NodeDefinitions) => void) => void;
}

applyMixins(FileDefinition, [ModuledDefinition]);
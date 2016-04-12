﻿import {StructureCallSignatureParameterBinder, StructureClassBinder, StructureClassConstructorBinder, StructureClassConstructorParameterBinder, StructureClassMethodBinder,
    StructureClassMethodParameterBinder, StructureClassPropertyBinder, StructureClassStaticMethodBinder, StructureClassStaticMethodParameterBinder, StructureClassStaticPropertyBinder,
    StructureDecoratorBinder, StructureEnumBinder, StructureEnumMemberBinder, StructureExpressionBinder, StructureFileBinder, StructureFunctionBinder,
    StructureFunctionParameterBinder, StructureImportBinder, StructureInterfaceBinder, StructureInterfaceMethodBinder, StructureInterfaceMethodParameterBinder,
    StructureInterfaceNewSignatureParameterBinder, StructureInterfaceNewSignatureBinder, StructureInterfacePropertyBinder, StructureNamespaceBinder, StructureReExportBinder,
    StructureTypeAliasBinder, StructureTypeParameterBinder, StructureVariableBinder} from "./../binders";
import {BaseDefinition, CallSignatureParameterDefinition, ClassDefinition, ClassConstructorDefinition, ClassConstructorParameterDefinition, ClassMethodDefinition,
    ClassMethodParameterDefinition, ClassPropertyDefinition, ClassStaticMethodDefinition, ClassStaticMethodParameterDefinition, ClassStaticPropertyDefinition, DecoratorDefinition,
    EnumDefinition, EnumMemberDefinition, ExpressionDefinition, FileDefinition, FunctionDefinition, FunctionParameterDefinition, ImportDefinition, ImportPartDefinition,
    InterfaceDefinition, InterfaceMethodDefinition, InterfaceMethodParameterDefinition, InterfaceNewSignatureDefinition, InterfaceNewSignatureParameterDefinition,
    InterfacePropertyDefinition, NamespaceDefinition, ReExportDefinition, ReExportPartDefinition, TypeAliasDefinition, TypeExpressionDefinition, TypeParameterDefinition,
    VariableDefinition} from "./../definitions";
import {CallSignatureParameterStructure, ClassStructure, ClassConstructorStructure, ClassConstructorParameterStructure, ClassMethodStructure, ClassMethodParameterStructure,
    ClassPropertyStructure, ClassStaticMethodStructure, ClassStaticMethodParameterStructure, ClassStaticPropertyStructure, DecoratorStructure, EnumStructure,
    EnumMemberStructure, FileStructure, FunctionStructure, FunctionParameterStructure, ImportStructure, InterfaceStructure, InterfaceMethodStructure,
    InterfaceMethodParameterStructure, InterfaceNewSignatureParameterStructure, InterfaceNewSignatureStructure, InterfacePropertyStructure, NamespaceStructure,
    ReExportStructure, TypeAliasStructure, TypeParameterStructure, VariableStructure} from "./../structures";

function bindToDefinition<DefType extends BaseDefinition>(binder: { bind(def: DefType): void; }, def: DefType) {
    binder.bind(def);
    return def;
}

export class StructureFactory {
    getCallSignatureParameter(structure: CallSignatureParameterStructure) {
        return bindToDefinition(new StructureCallSignatureParameterBinder(structure), new CallSignatureParameterDefinition());
    }

    getClass(structure: ClassStructure) {
        return bindToDefinition(new StructureClassBinder(this, structure), new ClassDefinition());
    }

    getClassConstructor(structure: ClassConstructorStructure) {
        return bindToDefinition(new StructureClassConstructorBinder(this, structure), new ClassConstructorDefinition());
    }

    getClassConstructorParameter(structure: ClassConstructorParameterStructure) {
        return bindToDefinition(new StructureClassConstructorParameterBinder(structure), new ClassConstructorParameterDefinition());
    }

    getClassMethod(structure: ClassMethodStructure) {
        return bindToDefinition(new StructureClassMethodBinder(this, structure), new ClassMethodDefinition());
    }

    getClassMethodParameter(structure: ClassMethodParameterStructure) {
        return bindToDefinition(new StructureClassMethodParameterBinder(structure), new ClassMethodParameterDefinition());
    }

    getClassProperty(structure: ClassPropertyStructure) {
        return bindToDefinition(new StructureClassPropertyBinder(structure), new ClassPropertyDefinition());
    }

    getClassStaticMethod(structure: ClassStaticMethodStructure) {
        return bindToDefinition(new StructureClassStaticMethodBinder(this, structure), new ClassStaticMethodDefinition());
    }

    getClassStaticMethodParameter(structure: ClassStaticMethodParameterStructure) {
        return bindToDefinition(new StructureClassStaticMethodParameterBinder(structure), new ClassStaticMethodParameterDefinition());
    }

    getClassStaticProperty(structure: ClassStaticPropertyStructure) {
        return bindToDefinition(new StructureClassStaticPropertyBinder(structure), new ClassStaticPropertyDefinition());
    }

    getDecorator(structure: DecoratorStructure) {
        return bindToDefinition(new StructureDecoratorBinder(structure), new DecoratorDefinition());
    }

    getEnum(structure: EnumStructure) {
        return bindToDefinition(new StructureEnumBinder(this, structure), new EnumDefinition());
    }

    getEnumMember(structure: EnumMemberStructure) {
        return bindToDefinition(new StructureEnumMemberBinder(structure), new EnumMemberDefinition());
    }

    getExpressionFromText(text: string) {
        if (typeof text === "string" && text.length > 0) {
            return bindToDefinition(new StructureExpressionBinder(text), new ExpressionDefinition());
        }
        else {
            return null;
        }
    }

    getFile(structure: FileStructure) {
        return bindToDefinition(new StructureFileBinder(this, structure), new FileDefinition());
    }

    getFunction(structure: FunctionStructure) {
        return bindToDefinition(new StructureFunctionBinder(this, structure), new FunctionDefinition());
    }

    getFunctionParameter(structure: FunctionParameterStructure) {
        return bindToDefinition(new StructureFunctionParameterBinder(structure), new FunctionParameterDefinition());
    }

    getImport(structure: ImportStructure) {
        return bindToDefinition(new StructureImportBinder(this, structure), new ImportDefinition());
    }

    getImportPart(importName: string) {
        const def = new ImportPartDefinition();
        def.importName = importName;
        def.definitions = [];
        def.expression = null;
        return def;
    }

    getReExport(structure: ReExportStructure) {
        return bindToDefinition(new StructureReExportBinder(this, structure), new ReExportDefinition());
    }

    getReExportPart(exportName: string) {
        const def = new ReExportPartDefinition();
        def.exportName = exportName;
        def.definitions = [];
        def.expression = null;
        return def;
    }

    getInterface(structure: InterfaceStructure) {
        return bindToDefinition(new StructureInterfaceBinder(this, structure), new InterfaceDefinition());
    }

    getInterfaceMethod(structure: InterfaceMethodStructure) {
        return bindToDefinition(new StructureInterfaceMethodBinder(this, structure), new InterfaceMethodDefinition());
    }

    getInterfaceNewSignature(structure: InterfaceNewSignatureStructure) {
        return bindToDefinition(new StructureInterfaceNewSignatureBinder(this, structure), new InterfaceNewSignatureDefinition());
    }

    getInterfaceProperty(structure: InterfacePropertyStructure) {
        return bindToDefinition(new StructureInterfacePropertyBinder(structure), new InterfacePropertyDefinition());
    }

    getInterfaceMethodParameter(structure: InterfaceMethodParameterStructure) {
        return bindToDefinition(new StructureInterfaceMethodParameterBinder(structure), new InterfaceMethodParameterDefinition());
    }

    getInterfaceNewSignatureParameter(structure: InterfaceNewSignatureParameterStructure) {
        return bindToDefinition(new StructureInterfaceNewSignatureParameterBinder(structure), new InterfaceNewSignatureParameterDefinition());
    }

    getNamespace(structure: NamespaceStructure) {
        return bindToDefinition(new StructureNamespaceBinder(this, structure), new NamespaceDefinition());
    }

    getTypeAlias(structure: TypeAliasStructure) {
        return bindToDefinition(new StructureTypeAliasBinder(this, structure), new TypeAliasDefinition());
    }

    getTypeExpressionFromText(text: string) {
        if (typeof text === "string" && text.length > 0) {
            return bindToDefinition<TypeExpressionDefinition>(new StructureExpressionBinder(text), new TypeExpressionDefinition());
        }
        else {
            return null;
        }
    }

    getTypeParameter(structure: TypeParameterStructure) {
        return bindToDefinition(new StructureTypeParameterBinder(this, structure), new TypeParameterDefinition());
    }

    getVariable(structure: VariableStructure) {
        return bindToDefinition(new StructureVariableBinder(structure), new VariableDefinition());
    }
}
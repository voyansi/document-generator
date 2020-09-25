# Document Generator

_automatically generate Google Documents based on templates and modules_

![](/docs/example.png)

### Goals

1. Quickly create documents with increased accuracy
2. Decentralize authoring and avoid monolithic templates
3. Have more fun

### Setup

_install Document Generator_

### Templates

_document generator uses Templates to define the sections of a document_

- templates must start with the name **<template:**

![](/docs/template-example.png)

- create named sections in your template with the **{sectionName}** syntax:

![](/docs/template-example-outline.png)

### Modules

_document generator uses Modules to define the content of a document's sections_

- modules must start with the name **<module:**

![](/docs/module-example.png)

- create named sections in your module with the **{sectionName}** syntax:

![](/docs/module-example-outline.png)

### Example

_Let's use Document Generator to create a proposal! The tool will allow us to select a template, select a module for each section of the template, and fill out necessary information as defined in each module..._

![](/docs/generate.gif)

### Caveats

_the Google Documents API is still under development and has a few caveats..._

- Document Generator is only able to copy over **inline** images!

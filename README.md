# @freshworks/ember-codemods

![npm (scoped)](https://img.shields.io/npm/v/@freshworks/ember-codemods)
![](https://github.com/freshdesk/ember-freshdesk-codemods/workflows/Node%20CI/badge.svg)


A collection of codemods by Freshworks.

## Usage

To run a specific codemod from this project, you would run the following:

```
npx @freshworks/ember-codemods <TRANSFORM NAME> path/of/files/ or/some**/*glob.js

# or

yarn global add @freshworks/ember-codemods
ember-codemods <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Transforms

<!--TRANSFORMS_START-->
* [mocha-to-qunit](transforms/mocha-to-qunit/README.md)
<!--TRANSFORMS_END-->

## Contributing

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`

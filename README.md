# @1024pix/ember-codemods

A collection of codemods by 1024pix.

## Usage

To run a specific codemod from this project, you would run the following:

```
npx @1024pix/ember-codemods <TRANSFORM NAME> path/of/files/ or/some**/*glob.js

# or

npm i -g @1024pix/ember-codemods
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
* `npm i`

### Running tests

* `npm test`

### Update Documentation

* `npm update-docs`

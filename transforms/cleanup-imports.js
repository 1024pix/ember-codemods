function removeUnusedImportSpecifiers(j, root) {
  root.find(j.ImportSpecifier)
    .filter((path) => {
      let importName = (path.node.local || path.node.imported).name;
      let identifierPresent = root.find(j.Identifier, {
          name: importName
        })
        .filter((path) => {
          return (path.name !== 'local' && path.name !== 'imported')
        })

      return (identifierPresent.length === 0);
    }).remove();
}

function cleanupBlankImports(j, root) {
  root.find(j.ImportDeclaration)
    .filter((path) => (path.get().value.specifiers.length === 0))
    .remove();
}

function removeDuplicateImports(j, root) {
  let existingList = [];
  root.find(j.ImportSpecifier)
    .filter((path) => {
      let name = path.node.imported.name;
      if(!existingList.includes(name)) {
        existingList.push(path.node.imported.name);
        return false;
      } else {
        // Captured as duplicate import
        return true;
      }
    }).remove();
}

function setupHooksForTest(setupTestTypes, j, root) {
  setupTestTypes.forEach(function(name) {
    root.find(j.FunctionExpression)
      .filter((path) => j(path).find(j.Identifier, { name }).length !== 0)
      .forEach((path) => transformHooks(path, name, j, root));
  });
}

function setupCallbackHooks(hooks, name = 'module', j, root) {
  root.find(j.CallExpression, { callee: { name }})
    .filter((path) => {
      let hasHooks = hooks.some((hookName) => {
        return !(findIdentifier(path, hookName, j, root).length === 0);
      });
      return hasHooks;
    })
    .forEach((path) => {
      j(path).find(j.ExpressionStatement)
        .filter((path) => {
          return hooks.some((hookName) => {
            return !(findIdentifier(path, hookName, j, root).length === 0);
          });
        })
        .forEach(({node}) => {
          let callee = node.expression.callee;
          let name = callee.name;
          if (name !== 'module') {
            callee.name = `hooks.${name}`;
          }
        });
    })
    .filter((path) => {
      let actualPath = path.node.arguments[1];
      let isNestedModule = findIdentifier(actualPath, name, j, root).length === 0;
      return isNestedModule
    })
    .forEach((path) => {
      return path.node.arguments[1].params = ['hooks'];
    });
}

function findIdentifier(path, name, j, root) {
  return j(path).find(j.Identifier, { name });
}

function transformHooks(path, name, j, root) {
  path.node.params = ['hooks'];

  let hasHooks = j(path).find(j.VariableDeclaration)
    .filter((path) => j(path).find(j.Identifier, { name }).length !== 0);

  let hasHooksAssignment = j(path).find(j.AssignmentExpression)
    .filter((path) => j(path).find(j.Identifier, { name }).length !== 0);

  if (hasHooks.length > 0) {
    hasHooks.replaceWith((path) => `${name}(hooks);`);
  } else if (hasHooksAssignment.length > 0) {
    hasHooksAssignment.replaceWith((path) => `${name}(hooks)`);

    j(path).find(j.VariableDeclarator, { id: { name: 'hooks' }})
      .remove();
  } else {
    j(path).find(j.Identifier, { name })
      .closest(j.Expression)
      .replaceWith((path) => `${name}(hooks)`);
  }
}

function cleanupImports(j, root) {
  removeUnusedImportSpecifiers(j, root);
  cleanupBlankImports(j, root);
  removeDuplicateImports(j, root);
}

function removeChaiImports(j, root) {
  root.find(j.ImportDeclaration, { source: { value: 'chai'} })
    .remove();
}

module.exports = {
  cleanupImports,
  cleanupBlankImports,
  removeUnusedImportSpecifiers,
  removeDuplicateImports,
  setupHooksForTest,
  setupCallbackHooks,
  removeChaiImports,
}

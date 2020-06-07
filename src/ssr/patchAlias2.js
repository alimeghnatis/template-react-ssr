const moduleAlias = require('module-alias')

// Or multiple aliases
moduleAlias.addAliases({
  //'apollo-client':'@apollo/client'
})

//console.log('OK => Alias PATCHED')

export default 'patched'

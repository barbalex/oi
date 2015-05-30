'use strict'

var os = require('os'),
  manifestText

module.exports = function () {
  manifestText = 'CACHE MANIFEST' + os.EOL
  manifestText += '#' + Date.now() + os.EOL + os.EOL
  manifestText += 'CACHE:' + os.EOL
  manifestText += 'index.html' + os.EOL
  manifestText += 'images/favicon.ico' + os.EOL
  manifestText += 'src/oi_built.js' + os.EOL
  manifestText += 'style/jstree.css' + os.EOL
  manifestText += 'style/oi_built.css' + os.EOL + os.EOL
  manifestText += 'NETWORK:' + os.EOL
  manifestText += '*'

  return manifestText
}

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var os         = require('os'),
    manifestText;

module.exports = function () {
    manifestText  = 'CACHE MANIFEST'     + os.EOL + os.EOL;
    manifestText += '#' + Date.now()     + os.EOL + os.EOL;
    manifestText += 'index.html'         + os.EOL;
    manifestText += 'style/jstree.css'   + os.EOL;
    manifestText += 'style/oi_built.css' + os.EOL;
    manifestText += 'images/favicon.ico' + os.EOL;
    manifestText += 'src/oi_built.js'    + os.EOL + os.EOL;
    manifestText += 'NETWORK:'           + os.EOL;
    manifestText += '*'                  + os.EOL;

    return manifestText;
};
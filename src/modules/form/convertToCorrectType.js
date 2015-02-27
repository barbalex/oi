/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true, white: true*/
'use strict';

var myTypeOf = require('./myTypeOf');

module.exports = function (feldWert) {
    var type = myTypeOf(feldWert);

    if (type === 'boolean') { return Boolean(feldWert); }
    if (type === 'float')   { return parseFloat(feldWert); }
    if (type === 'integer') { return parseInt(feldWert, 10); }
    if (type === 'number')  { return parseInt(feldWert, 10); }
    if (type === 'object')  { return JSON.parse(feldWert); }

    return feldWert;
};
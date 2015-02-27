// Hilfsfunktion, die typeof ersetzt und ergänzt
// typeof gibt bei input-Feldern immer String zurück!

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true, white: true*/
'use strict';

module.exports = function (wert) {
    /* Quelle: http://stackoverflow.com/questions/4456336/finding-variable-type-in-javascript
    funktioniert aber nicht für '2010'
    
    var objectType = Object.prototype.toString.call(wert);

    switch (objectType) {
    case '[object Array]':
        return 'array';
    case '[object String]':
        return 'string';
    case '[object Number]':
        return 'number';
    case '[object Boolean]':
        return 'boolean';
    default:
        return 'string';
    }*/

    // Quelle: https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator
    // funktioniert aber nicht für '2010'
    //return ({}).toString.call(wert).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

    if (typeof wert === 'boolean')   { return 'boolean'; }
    if (typeof wert === 'number')    { return 'number'; }
    /*if (parseInt(wert, 10) && parseFloat(wert) && parseInt(wert, 10) !== parseFloat(wert) && parseInt(wert, 10) == wert) { return 'float'; }
    // verhindern, dass führende Nullen abgeschnitten werden
    if ((parseInt(wert, 10) == wert && wert.toString().length === Math.ceil(parseInt(wert, 10) / 10)) || wert == '0') { return 'integer'; }*/
    if (parseInt(wert, 10) == wert || wert == '0') { return 'number'; }
    if (typeof wert === 'object')    { return 'object'; }
    if (typeof wert === 'string')    { return 'string'; }
    if (wert === undefined)          { return 'undefined'; }
    if (typeof wert === 'function')  { return 'function'; }
};
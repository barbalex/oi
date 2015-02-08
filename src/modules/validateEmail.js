/*
 * prüft, ob ein String eine email-Adressen sein könnte
 * Quelle: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

module.exports = function (string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(string);
};
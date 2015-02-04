/*
* generiert eine uuid
* Quelle: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
*/

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
           .toString(16)
           .substring(1);
}

module.exports = function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};
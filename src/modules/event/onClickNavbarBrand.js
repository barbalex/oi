// klickt man in der Mobilansicht des Menus auf den Titel, soll es schliessen

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $ = require('jquery');

module.exports = function () {
    // verhindern, dass die Seite neu lädt
    event.preventDefault();
    $('.navbar').find('.navbar-collapse').collapse('hide');
};
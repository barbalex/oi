// wählt man in der Mobilansicht einen Menu-Eintrag, soll das Menu schliessen

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $ = require('jquery');

module.exports = function () {
    if ($(event.target).is('a')) {
        $(this).collapse('hide');
    }
};
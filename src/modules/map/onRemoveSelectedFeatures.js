// when features are changed

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus */
'use strict';

var toggleEditButtons = require('./toggleEditButtons'),
    styleRed          = require('./styleRed');

module.exports = function (event) {
    var feature = event.element;

    console.log('feature removed from select interaction');

    // set different style
    feature.setStyle(styleRed());

    toggleEditButtons();
};
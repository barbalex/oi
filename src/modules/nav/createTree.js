/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                   = require('jquery'),
    jstree              = require('jstree'),
    generateDataForTree = require('./generateDataForTree');

module.exports = function () {
    $('#navContent').jstree({
        'plugins': ['wholerow', 'state'],
        'core': {
            'data': generateDataForTree(),
            'themes': {
                'responsive': true,
                'icons':      false,
                'dots':       true
            },
            'check_callback': true,
            'multiple':       false
        }
    });
};
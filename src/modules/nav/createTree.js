/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                   = require('jquery'),
    jstree              = require('jstree'),
    generateDataForTree = require('./generateDataForTree'),
    initiateForm        = require('../form/initiateForm');

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
    }).on('ready.jstree', function (e, data) {
        // scrollbars aktualisieren
        $('.scrollbar').perfectScrollbar('update');
    }).on('create_node.jstree', function (e, data) {
        $('#navContent').jstree().select_node(data.node);
    }).on('select_node.jstree', function (e, data) {
        initiateForm(data.node.id);
    });
};
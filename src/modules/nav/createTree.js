/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                    = require('jquery'),
    jstree               = require('jstree'),
    generateDataForTree  = require('./generateDataForTree'),
    initiateForm         = require('../form/initiateForm'),
    treeContextmenuItems = require('./treeContextmenuItems');

module.exports = function () {
    var treeData = generateDataForTree();

    $('#navContent').jstree({
        'plugins': ['wholerow', 'state', 'contextmenu'],
        'core': {
            'data': treeData,
            'themes': {
                'responsive': true,
                'icons':      false,
                'dots':       false
            },
            'check_callback': true,
            'multiple':       false
        },
        'contextmenu': {
            'items': function ($node) {
                return treeContextmenuItems($node);
            }
        }
    }).on('ready.jstree', function (e, data) {
        // scrollbars aktualisieren
        $('.scrollbar').perfectScrollbar('update');
    }).on('create_node.jstree', function (e, data) {
        $('#navContent').jstree().select_node(data.node);
    }).on('select_node.jstree', function (e, data) {
        if (data.node.data.type === 'object') {
            initiateForm(data.node.id);
        }
    }).on('delete_node.jstree', function (e, data) {
        console.log('node was deleted, id: ', data.node.id);
    });
};
/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                              = require('jquery'),
    _                              = require('underscore'),
    createNewObjectFromObjectId    = require('../createNewObjectFromObjectId'),
    createNewObjectFromHierarchyId = require('../createNewObjectFromHierarchyId');

module.exports = function ($node) {
    var tree = $('#navContent').jstree(true);
    return {
        'neu': {
            'label': 'neu',
            'action': function () {
                switch ($node.data.type) {
                case 'object':
                    createNewObjectFromObjectId($node.id);
                    break;
                case 'hierarchy':
                    createNewObjectFromHierarchyId($node.data.id, $node.parent);
                    break;
                }
            },
            'icon': 'fa fa-plus'
        },
        'loeschen': {
            'label': 'löschen',
            'action': function () {
                tree.delete_node($node);
            },
            'icon': 'fa fa-close'
        }
    };
};
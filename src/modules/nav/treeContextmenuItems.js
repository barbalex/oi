/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                            = require('jquery'),
    createNewObjectFromObject    = require('../createNewObjectFromObject'),
    createNewObjectFromHierarchy = require('../createNewObjectFromHierarchy'),
    deleteObjectAndChildren      = require('../deleteObjectAndChildren');

module.exports = function ($node) {
    return {
        'neu': {
            'label': 'neu',
            'action': function () {
                switch ($node.data.type) {
                case 'object':
                    createNewObjectFromObject($node.id);
                    break;
                case 'hierarchy':
                    createNewObjectFromHierarchy($node.data.id, $node.parent);
                    break;
                }
            },
            'icon': 'fa fa-plus'
        },
        'loeschen': {
            'label': 'löschen',
            'action': function () {
                deleteObjectAndChildren($node);
            },
            'icon': 'fa fa-close'
        }
    };
};
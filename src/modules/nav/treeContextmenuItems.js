/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _ = require('underscore');

module.exports = function ($node) {
    var tree = $('#navContent').jstree(true);
    return {
        'neu': {
            'label': 'neu',
            'action': function (obj) {
                console.log('$node: ', $node);
                $node = tree.create_node($node);
                tree.edit($node);
            }
        },
        'loeschen': {
            'label': 'löschen',
            'action': function (obj) {
                tree.delete_node($node);
            }
        }
    };
};
/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                            = require('jquery'),
    createNewObjectFromObject    = require('../createNewObjectFromObject'),
    createNewObjectFromHierarchy = require('../createNewObjectFromHierarchy');

module.exports = function () {
    var tree = $('#navContent').jstree(true),
        node = tree.get_selected(true)[0],
        type = node.data.type,
        id   = node.data.type === 'object' ? node.id : node.data.id,
        parentId;

    switch (type) {
    case 'object':
        createNewObjectFromObject(id);
        break;
    case 'hierarchy':
        parentId = tree.get_selected(true)[0].parent;
        createNewObjectFromHierarchy(id, parentId);
        break;
    }
};
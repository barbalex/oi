/*
 * gets a node from the tree
 * deletes the node's object, all child objects
 * from db, model and tree
 * also removes child hierarchies in tree
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                         = require('jquery'),
    _                         = require('underscore'),
    PouchDB                   = require('pouchdb'),
    db                        = new PouchDB('oi'),
    deleteObjectFromModelById = require('./deleteObjectFromModelById'),
    getObjectWithId           = require('./getObjectWithId');

module.exports = function ($node) {
    var objectId = $node.id,
        object,
        nodeChildren = [],
        tree = $('#navContent').jstree(true);

    // remove all children objects and nodes
    // reverse direction of children_d to delete from bottom to top
    $node.children_d.reverse();
    // children in anderen Array kopieren, sonst wird nur der erste verarbeitet
    nodeChildren = _.union($node.children_d);

    _.each(nodeChildren, function (childNodeId) {
        var nodeJson = tree.get_node('#' + childNodeId);

        if (nodeJson && nodeJson.data && nodeJson.data.type && nodeJson.data.type === 'object') {
            // delete object from db and model
            db.remove(getObjectWithId(nodeJson.id));
            deleteObjectFromModelById(nodeJson.id);
        }
        // delete node (hierarchies and objects)
        tree.delete_node('#' + childNodeId);
    });

    // get object
    object = getObjectWithId(objectId);
    if (object) {
        // delete object in db
        db.remove(object).then(function () {
            // delete model
            window.oi.objects = _.without(window.oi.objects, object);
            // delete node
            tree.delete_node('#' + objectId);
        }).catch(function (error) {
            console.log('The object was not deleted. Error: ', error);
        });
    } else {
        console.log('error: the object was not deleted. It was not found in the model');
    }
};
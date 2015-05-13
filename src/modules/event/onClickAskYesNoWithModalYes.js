/*
 * gets a node from the tree
 * deletes the node's object, all child objects
 * from localDb, model and tree
 * also removes child hierarchies in tree
 * selects the parent node
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                     = require('jquery'),
    _                     = require('underscore'),
    dateformat            = require('dateformat'),
    PouchDB               = require('pouchdb'),
    deleteObjectFromModel = require('../deleteObjectFromModel'),
    getObject             = require('../getObject'),
    objectWithoutUiState  = require('../objectWithoutUiState');

module.exports = function ($node) {
    var $body           = $('body'),
        nodeChildren    = _.union($node.children_d.reverse()),
        tree            = $('#navContent').jstree(true),
        objectsToDelete = [],
        objectId        = $node.id,
        localDbName     = 'project_' + getObject(objectId).projId,
        localDb         = new PouchDB(localDbName),
        object,
        parentNodeId,
        lastEdited  = {};

    // event-listeners entfernen
    $body
        .off('click', '#askYesNoWithModalNo')
        .off('click', '#askYesNoWithModalYes');

    // weiter machen
    // remove all children objects and nodes
    _.each(nodeChildren, function (childNodeId) {
        var nodeJson = tree.get_node('#' + childNodeId);

        if (nodeJson && nodeJson.data && nodeJson.data.type && nodeJson.data.type === 'object') {
            // delete object from localDb and model
            localDb.remove(getObject(nodeJson.id));
            deleteObjectFromModel(nodeJson.id);
        }
        // delete node (hierarchies and objects)
        tree.delete_node('#' + childNodeId);
    });

    // get object
    if (objectsToDelete.length > 0) {
        object = getObject(objectId);
        if (object) {
            // delete object in localDb
            // add _deleted: true instead of remove object
            // to keep other info because is needed to evaluate deleted objects in syncing db's
            object._deleted = true;
            // add databaseId so syncing db can tell if change happened in other db
            // build lastEdited
            lastEdited.date     = dateformat(new Date(), 'isoDateTime');
            lastEdited.user     = window.oi.me.name;
            lastEdited.database = window.oi.databaseId;
            object.lastEdited   = lastEdited;
            // put object
            localDb.put(objectWithoutUiState(object)).then(function () {
            //localDb.remove(object).then(function () {
                // delete model
                window.oi.objects = _.without(window.oi.objects, object);
                // delete node
                parentNodeId = $('#navContent').jstree(true).get_selected(true)[0].parent;
                tree.delete_node('#' + objectId);
                // parent node selektieren
                if (parentNodeId) {
                    tree.select_node('#' + parentNodeId);
                }
            }).catch(function (error) {
                console.log('The object was not deleted. Error: ', error);
            });
        } else {
            console.log('error: the object was not deleted. It was not found in the model');
        }
    }
};
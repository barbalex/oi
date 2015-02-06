/*
 * gets a node from the tree
 * deletes the node's object, all child objects
 * from db, model and tree
 * also removes child hierarchies in tree
 * selects the parent node
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                         = require('jquery'),
    _                         = require('underscore'),
    PouchDB                   = require('pouchdb'),
    db                        = new PouchDB('oi'),
    deleteObjectFromModelById = require('./deleteObjectFromModelById'),
    getObjectWithId           = require('./getObjectWithId'),
    askYesNoWithModal         = require('./askYesNoWithModal'),
    tellWithModal             = require('./tellWithModal');

module.exports = function ($node) {
    var objectId = $node.id,
        object,
        // reverse direction of children_d to delete from bottom to top
        // children in anderen Array kopieren, sonst wird nur der erste verarbeitet
        nodeChildren = _.union($node.children_d.reverse()),
        tree = $('#navContent').jstree(true),
        parentNodeId,
        objectsToDelete = [],
        childrenToDelete;

    // ermitteln, wieviele Objekte betroffen werden
    childrenToDelete = _.map(nodeChildren, function (child) {
        if (child.data && child.data.type && child.data.type === 'object') {
            return child.id;
        }
    });
    if ($node && $node.data && $node.data.type && $node.data.type === 'object') {
        objectsToDelete.push($node.id);
    }

    // wenn keine Objekte betroffen sind: mitteilen und aussteigen
    if (objectsToDelete.length === 0 && childrenToDelete.length === 0) {
        tellWithModal('uups', 'es gibt keine Objekte, die gelöscht werden könnten');
        return;
    }

    // wenn Objekte betroffen sind: mitteilen und event-listeners einrichten
    askYesNoWithModal('sicher?', 'es werden ' + objectsToDelete.length + ' Objekte direkt und ' + childrenToDelete.length + ' hierarchisch tiefer liegende Objekte gelöscht', 'ja, löschen', 'nein, abbrechen');

    $('body').on('click', '#askYesNoWithModalYes', function (e) {
        // event-listeners entfernen
        $('body').off('click', '#askYesNoWithModalNo');
        $('body').off('click', '#askYesNoWithModalYes');

        // weiter machen
        // remove all children objects and nodes
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
        if (objectsToDelete.length > 0) {
            object = getObjectWithId(objectId);
            if (object) {
                // delete object in db
                db.remove(object).then(function () {
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
    });

    $('body').on('click', '#askYesNoWithModalNo', function (e) {
        // event-listeners entfernen
        $('body').off('click', '#askYesNoWithModalNo');
        $('body').off('click', '#askYesNoWithModalYes');
        return;
    });
};
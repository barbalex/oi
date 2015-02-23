/*
 * passt model und wenn nötig die ui an,
 * wenn in einer anderen DB ein object verändert wurde
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                        = require('jquery'),
    _                        = require('underscore'),
    initiateForm             = require('./form/initiateForm'),
    getLabelForObject        = require('./nav/getLabelForObject'),
    createTree               = require('./nav/createTree'),
    createTreeNodeObject     = require('./nav/createTreeNodeObject'),
    createTreeNodeRootObject = require('./nav/createTreeNodeRootObject');

function refreshTree(doc) {
    var correspondingHierarchy,
        tree = $('#navContent').jstree();

    correspondingHierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
        return hierarchy._id === doc.hId;
    });
    if (doc.data && correspondingHierarchy && correspondingHierarchy.nameField) {
        tree.rename_node('#' + doc._id, getLabelForObject(doc, correspondingHierarchy));
    }
}

function addNodeToTree(doc) {
    var correspondingHierarchy,
        tree = $('#navContent').jstree(),
        node;

    node = doc.parent === null ? createTreeNodeRootObject(doc) : createTreeNodeObject(doc);

    correspondingHierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
        return hierarchy._id === doc.hId;
    });
    // find hierarchy-node of doc
    // create new node
    if (doc.data && correspondingHierarchy && correspondingHierarchy.nameField) {
        tree.create_node('#' + doc.parent + doc.hId, node);
    }
}

module.exports = function (doc) {
    var modelObject,
        tree       = $('#navContent').jstree(),
        activeNode = tree.get_selected(true)[0],
        activeId   = null;

    if (activeNode) {
        activeId = activeNode.data.type === 'object' ? activeNode.id : activeNode.data.id;
    }

    console.log('handleExternalObjectChanges: doc: ', doc);

    // only use changes from different databases
    if (doc.lastEdited) {
        if (!doc.lastEdited.database || doc.lastEdited.database !== window.oi.databaseId) {
            // update model of object
            modelObject = _.find(window.oi.objects, function (object) {
                return object._id === doc._id;
            });

            // nur weiterfahren, wenn ein model gefunden wurde
            if (modelObject) {
                // TODO: check if doc was deleted

                // replace existing object with new one
                window.oi.objects[window.oi.objects.indexOf(modelObject)] = doc;

                // refresh form if this object is shown
                // cant update only changed field because it is unknown (?)
                if (activeId && activeId === doc._id) {
                    initiateForm(doc._id, 'object');
                }
                // refresh tree
                refreshTree(doc);
            } else {
                // TODO: das Objekt wurde neu erfasst

                console.log('pushing new doc to model: ', doc);

                window.oi.objects.push(doc);
                addNodeToTree(doc);
            }
        }
    }
};
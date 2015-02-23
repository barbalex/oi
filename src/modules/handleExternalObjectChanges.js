/*
 * passt model und wenn nötig die ui an,
 * wenn in einer anderen DB ein object verändert wurde
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                 = require('jquery'),
    _                 = require('underscore'),
    initiateForm      = require('./form/initiateForm'),
    getLabelForObject = require('./nav/getLabelForObject');

module.exports = function (doc) {
    var modelObject,
        correspondingHierarchy,
        $formContent = $('#formContent'),
        tree         = $('#navContent').jstree(),
        activeNode   = tree.get_selected(true)[0],
        activeId     = null;

    if (activeNode) {
        activeId = activeNode.data.type === 'object' ? activeNode.id : activeNode.data.id;
    }

    // only use changes on docs with this user
    // TODO: is given if listens only do project-db's
    if (doc.users && doc.users.indexOf(window.oi.me.name) > -1) {
        // only use changes from different databases
        if (doc.lastEdited && doc.lastEdited.database && doc.lastEdited.database !== window.oi.databaseId) {
            // update model of object
            modelObject = _.find(window.oi.objects, function (object) {
                return object._id === doc._id;
            });

            // nur weiterfahren, wenn ein model gefunden wurde
            if (modelObject) {
                // replace existing object with new one
                window.oi.objects[window.oi.objects.indexOf(modelObject)] = doc;

                // refresh form if this object is shown
                // cant update only changed field because it is unknown (?)
                if (activeId && activeId === doc._id) {
                    initiateForm(doc._id, 'object');
                }
                // refresh tree
                correspondingHierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
                    return hierarchy._id === doc.hId;
                });
                if (doc.data && correspondingHierarchy && correspondingHierarchy.nameField) {
                    tree.rename_node('#' + doc._id, getLabelForObject(doc, correspondingHierarchy));
                }
            }
        }
    }
};
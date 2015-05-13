/*
 * gets a node from the tree
 * deletes the node's object, all child objects
 * from localDb, model and tree
 * also removes child hierarchies in tree
 * selects the parent node
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                           = require('jquery'),
    _                           = require('underscore'),
    dateformat                  = require('dateformat'),
    PouchDB                     = require('pouchdb'),
    deleteObjectFromModel       = require('./deleteObjectFromModel'),
    getObject                   = require('./getObject'),
    askYesNoWithModal           = require('./askYesNoWithModal'),
    tellWithModal               = require('./tellWithModal'),
    objectWithoutUiState        = require('./objectWithoutUiState'),
    onClickAskYesNoWithModalYes = require('./event/onClickAskYesNoWithModalYes');

module.exports = function ($node) {
    var // reverse direction of children_d to delete from bottom to top
        // children in anderen Array kopieren, sonst wird nur der erste verarbeitet
        nodeChildren    = _.union($node.children_d.reverse()),
        objectsToDelete = [],
        childrenToDelete,
        $body           = $('body');

    // ermitteln, wieviele child-Objekte betroffen werden
    childrenToDelete = _.map(nodeChildren, function (child) {
        if (child.data && child.data.type && child.data.type === 'object') {
            return child.id;
        }
    });
    // wird ein Objekt direkt gelöscht?
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

    $body.on('click', '#askYesNoWithModalYes', function () {
        onClickAskYesNoWithModalYes($node);
    });

    $('body').on('click', '#askYesNoWithModalNo', function () {
        // event-listeners entfernen
        $('body').off('click', '#askYesNoWithModalNo');
        $('body').off('click', '#askYesNoWithModalYes');
    });
};
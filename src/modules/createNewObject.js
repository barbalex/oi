/*
 * erhält eine Hierarchie
 * und ein Objekt: Dasjenige, von dem aus ein neues erstellt werden soll - es hat also denselben:
 * - type
 * - parent
 * - projId
 * - users
 * erstellt ein neues Objekt dieser Hierarchie und den gemeinsamen Daten von object
 * (objekt kann auch einfach eine Hüllen sein, mit der diese Eigenschaften übergeben werden,
 * z.B. wenn das neue Objekt von der Hierarchie aus geschaffen wird)
 * fügt es zum Model
 * fügt es NICHT in die DB: es wird erst beim Speichern einer Eingabe in ein Feld in die DB geschrieben!
 * fügt es in den tree
 * retourniert es
 */

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true, white: true*/
'use strict';

var _                    = require('underscore'),
    $                    = require('jquery'),
    dateformat           = require('dateformat'),
    PouchDB              = require('pouchdb'),
    db                   = new PouchDB('oi'),
    guid                 = require('./guid'),
    createTreeNodeObject = require('./nav/createTreeNodeObject'),
    createChildHierarchiesOfObject = require('./nav/createChildHierarchiesOfObject');

module.exports = function (object, hierarchy) {
    var newObject,
        parentNode,
        newObjectNode,
        childHierarchies;

    newObject                     = {};
    newObject._id                 = guid();
    newObject.hId                 = hierarchy._id;
    newObject.type                = 'object';
    newObject.parent              = object.parent;
    // wenn ein neues Projekt erfasst wird, muss eine neue projId vergeben werden
    newObject.projId              = object.parent ? object.projId : guid();
    newObject.users               = object.users;
    newObject.lastEdited          = {};
    newObject.lastEdited.date     = dateformat(new Date(), 'isoDateTime');
    // TODO: get real user
    newObject.lastEdited.user     = 'z@z.ch';
    newObject.lastEdited.database = window.oi.databaseId;
    newObject.data                = {};
    if (hierarchy.fields) {
        _.each(hierarchy.fields, function (field) {
            if (field.label) {
                newObject.data[field.label] = null;
            }
        });
    }

    // ergänze model
    window.oi.objects.push(newObject);

    // aktualisiere id in UI
    $('#formContent').data('id', newObject._id);

    // füge dem node der hierarchy einen neuen node für newObject hinzu
    parentNode    = newObject.parent ? '#' + newObject.parent + newObject.hId : '#';
    newObjectNode = createTreeNodeObject(newObject);
    $('#navContent').jstree().deselect_all();
    $('#navContent').jstree().create_node(parentNode, newObjectNode);

    console.log('newObject: ', newObject);

    // ergänze child hierarchies
    childHierarchies = createChildHierarchiesOfObject(newObject);

    console.log('childHierarchies: ', childHierarchies);
    console.log('newObject._id: ', newObject._id);

    _.each(childHierarchies, function (childHierarchy) {
        $('#navContent').jstree().create_node('#' + newObject._id, childHierarchy);
    });

    return newObject;
};
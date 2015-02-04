/*
 * erhält eine Hierarchie
 * und ein Objekt: Dasjenige, von dem aus ein neues erstellt werden soll - es hat also denselben:
 * - type
 * - parent
 * - projId
 * - users
 * erstellt ein neues Objekt dieser Hierarchie und den gemeinsamen Daten von object
 * fügt es zum Model
 * fügt es in die DB
 * fügt es in den tree
 * retourniert es
 */

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true, white: true*/
'use strict';

var _           = require('underscore'),
    dateformat  = require('dateformat'),
    PouchDB     = require('pouchdb'),
    db          = new PouchDB('oi');

module.exports = function (object, hierarchy) {
    var newObject                 = {};
    newObject.hId                 = hierarchy._id;
    newObject.type                = object.type;
    newObject.parent              = object.parent;
    newObject.projId              = object.projId;
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
    db.post(newObject, function (err, response) {
        if (err) { return console.log('error when posting new Object to the database: ', err); }
        newObject._id  = response.id;
        newObject._rev = response.rev;

        console.log('newObject created: ', newObject);

        window.oi.objects.push(newObject);
        // füge dem node der hierarchy einen neuen node für newObject hinzu
        
    });
    return newObject;
};
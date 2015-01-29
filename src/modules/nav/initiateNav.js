/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $          = require('jquery'),
    _          = require('underscore'),
    PouchDB    = require('pouchdb'),
    db         = new PouchDB('oi'),
    sync       = require('../syncPouch'),
    async      = require('async'),
    createTree = require('./createTree');

// TODO: auf den aktuellen Benutzer einschränken
function mapHierarchies(doc) {
    if (doc.type === 'hierarchy') {
        emit(doc._id);
    }
}

// TODO: auf den aktuellen Benutzer einschränken
function mapObjects(doc) {
    if (doc.type === 'object') {
        emit(doc._id);
    }
}

module.exports = function () {

    // NUR FÜR ENTWICKLUNG
    // zuerst db komprimieren - sonst sind komische Daten drin
    db.compact();

    sync();

    async.parallel({
        hierarchies: function (callback) {
            // TODO: auf den aktuellen Benutzer einschränken
            db.query({map: mapHierarchies}, {reduce: false, include_docs: true}, function (err, response) {
                var hierarchies = _.map(response.rows, function (row) {
                    return row.doc;
                });
                callback(null, hierarchies);
            });
        },
        objects: function (callback) {
            // TODO: auf den aktuellen Benutzer einschränken
            db.query({map: mapObjects}, {reduce: false, include_docs: true}, function (err, response) {
                var objects = _.map(response.rows, function (row) {
                    return row.doc;
                });
                callback(null, objects);
            });
        }
    }, function (err, results) {
        if (err) { return console.log('error: ', err); }
        // results equals to: { hierarchies: hierarchies, objects: objects }

        // create globals for data
        window.oi.hierarchies = results.hierarchies;
        window.oi.objects     = results.objects;

        createTree();
    });
};
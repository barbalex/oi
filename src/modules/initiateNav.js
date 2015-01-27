/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _       = require('underscore'),
    PouchDB = require('pouchdb'),
    db      = new PouchDB('oi'),
    sync    = require('./syncPouch');

function mapHierarchies(doc) {
    if (doc.type === 'hierarchy') {
        emit(doc._id);
    }
}

module.exports = function () {

    sync();

    db.query({map: mapHierarchies}, {reduce: false, include_docs: true}, function (err, response) {
        if (err) { return console.log('error: ', err); }
        var hierarchies = _.map(response.rows, function (row) {
            return row.doc;
        });
        console.log('hierarchies: ', hierarchies);
        _.each(hierarchies, function (hierarchy) {

        });
    });

};
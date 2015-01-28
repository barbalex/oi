/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _       = require('underscore'),
    PouchDB = require('pouchdb'),
    db      = new PouchDB('oi'),
    sync    = require('./syncPouch'),
    hierarchies,
    number;

function mapHierarchies(doc) {
    if (doc.type === 'hierarchy') {
        emit(doc._id);
    }
}

function getHierarchyOfLevel(level) {
    return 
}

module.exports = function () {

    sync();

    db.query({map: mapHierarchies}, {reduce: false, include_docs: true}, function (err, response) {
        if (err) { return console.log('error: ', err); }
        var hierarchiesLevel0,
            html;

        hierarchies = _.map(response.rows, function (row) {
            return row.doc;
        });

        console.log('hierarchies: ', hierarchies);
        // level 0 holen
        hierarchiesLevel0 = _.filter(hierarchies, function (hierarchy) {
            return hierarchy.level === 0;
        });

        // navContent beginnen
        // panel group beginnen
        html = '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';

        _.each(hierarchiesLevel0, function (hierarchy) {
            // panel beginnen
            html += '<div class="panel panel-default">';
            // panel heading beginnen
            html += '<div class="panel-heading" role="tablist" id="heading' + hierarchy.hTypeUid + '"><h4 class="panel-title">';
            html += '<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + hierarchy.hTypeUid + '" aria-expanded="true" aria-controls="collapse' + hierarchy.hTypeUid + '">';
            html += hierarchy.name;
            // panel heading abschliessen
            html += '</a></h4></div>';

            // collapse beginnen
            html += '<div id="collapse' + hierarchy.hTypeUid + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + hierarchy.hTypeUid + '">';

            html += '<ul class="list-group">';

            // get objects of level 1


            // get chidren
            html += '<li class="list-group-item">list group item 1</li>';
            html += '<li class="list-group-item">list group item 2</li>';

            // collapse abschliessen
            html += '</ul></div>';

            // panel abschliessen
            html += '</div>';
        });

        // collapsilbe group abschliessen
        html += '</div>';

        // collapsible group initiieren
        $('#navContent').html(html).collapse();
    });

};
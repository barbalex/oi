/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $       = require('jquery'),
    _       = require('underscore'),
    PouchDB = require('pouchdb'),
    db      = new PouchDB('oi'),
    input   = require('../../templates/input');

module.exports = function (_id) {

    var html = '';

    console.log('_id: ', _id);

    db.get(_id, function (err, object) {
        if (err) { console.log('error: ', err); }
        //console.log('object: ', object);
        $('#formContent').html(JSON.stringify(object));
        console.log('object.hId: ', object.hId);
        // get metainformation about fields
        db.get(object.hId, function (err, hierarchy) {
            if (err) { console.log('error: ', err); }
            console.log('hierarchy: ', hierarchy);
            _.each(hierarchy.fields, function (field) {
                var templateObject = {};
                templateObject.objectId = object._id;
                templateObject.label = field.label;
                templateObject.type = field.type;
                templateObject.value = object.data[field.label] || null;
                html += input(templateObject);
            });

            //html += '</form>';

            $('#formContent').html(html);
        });
    });
};
/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $       = require('jquery'),
    _       = require('underscore'),
    jstree  = require('jstree'),
    PouchDB = require('pouchdb'),
    db      = new PouchDB('oi');

module.exports = function (object, property) {
    // das Element liess sich auf keine andere Art holen!
    var domElem = $('#formContent').find('#' + object._id + property)[0];

    if (domElem) {
        Object.defineProperty(object.data, property, {
            get: function () {
                return domElem.value;
            },
            set: function (newValue) {
                domElem.value = newValue;
                // write to pouch
                db.put(object, function (err, response) {
                    if (err) { return console.log('error: ', err); }
                    // update rev in object
                    object._rev = response.rev;
                    // if field is nameField, update name in tree
                    var correspondingHierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
                        return hierarchy._id == object.hId;
                    });
                    if (object.data && correspondingHierarchy && correspondingHierarchy.nameField && correspondingHierarchy.nameField === property) {
                        $('#navContent').jstree().rename_node('#' + object._id, '<strong>' + newValue + '</strong>');
                    }
                });
            },
            configurable: true
        });
        domElem.onchange = function () {
            object.data[property] = domElem.value;
        };
    }
};
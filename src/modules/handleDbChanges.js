/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $               = require('jquery'),
    _               = require('underscore'),
    initiateForm    = require('./form/initiateForm');

module.exports = function (change) {
    var modelObject,
        correspondingHierarchy;

    switch (change.doc.type) {
    case 'object':
        // update model of object
        modelObject = _.find(window.oi.objects, function (object) {
            return object._id === change.id;
        });
        if (modelObject) {
            _.each(modelObject, function (value, key) {
                delete modelObject[key];
            });
            _.extend(modelObject, change.doc);
            // refresh form if this object is shown
            if ($('#formContent').html() !== "" && $('#formContent').data('id') === change.doc._id) {
                initiateForm(change.doc._id);
            }
            // refresh tree
            correspondingHierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
                return hierarchy._id === change.doc.hId;
            });
            if (change.doc.data && correspondingHierarchy && correspondingHierarchy.nameField) {
                $('#navContent').jstree().rename_node('#' + change.doc._id, '<strong>' + change.doc.data[correspondingHierarchy.nameField] + '</strong>');
            }
        }
        break;
    case 'hierarchy':
        modelObject = _.find(window.oi.hierarchies, function (hierarchy) {
            return hierarchy._id === change.id;
        });
        // TODO: update model of hierarchy
        break;
    }
};
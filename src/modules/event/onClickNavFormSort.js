/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $             = require('jquery'),
    _             = require('underscore'),
    getObject     = require('../getObject'),
    saveHierarchy = require('../form/saveHierarchy');

module.exports = function () {
    event.preventDefault();
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $('#formContent').sortable('destroy');
    } else {
        $(this).addClass('active');
        $('#formContent').sortable({
            axis:        'y',
            containment: '#formContent',
            items:       '.form-group',
            scroll:      true,
            update: function (event, ui) {
                var objectId,
                    object,
                    correspondingHierarchy;

                // get hierarchy of object
                objectId = $(ui.item.context).find('[data-object]').data('object')._id;

                object = getObject(objectId);

                if (!object)     { return; }
                if (!object.hId) { return; }

                correspondingHierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
                    return hierarchy._id === object.hId;
                });

                // loop through each js-form-group
                $(ui.item.context).siblings('.js-form-group').each(function (index) {
                    var fieldLabel,
                        field;

                    // get field label
                    fieldLabel = $(this).find('[data-object]').data('object').label;

                    // hierarchy.fields.order = index
                    field = _.find(correspondingHierarchy.fields, function (field) {
                        return field.label === fieldLabel;
                    });
                    if (field) {
                        // update model
                        field.order = index;
                    }

                });
                // update hierarchy in db
                saveHierarchy(correspondingHierarchy);
            }
        });
    }
};
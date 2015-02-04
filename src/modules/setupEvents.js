/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                    = require('jquery'),
    _                    = require('underscore'),
    initiateForm         = require('./form/initiateForm'),
    fitTextareaToContent = require('./form/fitTextareaToContent'),
    getValueAfterChange  = require('./form/getValueAfterChange'),
    saveObjectValue      = require('./form/saveObjectValue'),
    getObjectWithId      = require('./getObjectWithId'),
    getHierarchyOfObject = require('./getHierarchyOfObject'),
    createNewObjectOfHierarchy = require('./createNewObjectOfHierarchy');

module.exports = function () {
    $('#nav')
        .on('scroll', function () {
            $('#navSeparator').css('height', $('#navContent').height() + 40);
        });

    $('#navContent')
        .on('activate_node.jstree', function (e, data) {
            initiateForm(data.node.id);
        });

    $('#form')
        .on('scroll', function () {
            $('#formSeparator').css('height', $('#formContent').height() + 40);
        })
        .on('click', '#formNew', function () {
            var id,
                object,
                hierarchy,
                newObject;

            // get id of doc
            id = $('#formContent').data('id');

            // get object of id
            object = getObjectWithId(id);
            if (object && object.hId) {
                // get metadata for doc
                hierarchy = getHierarchyOfObject(object);
                newObject = createNewObjectOfHierarchy(object, hierarchy);
                initiateForm(newObject._id);
            } else {
                console.log('error: no hierarchy found for object with id = ' + id);
            }
        })
        .on('click', '#formDelete', function () {
            console.log('delete form');
        });

    $('#formContent')
        .on('keyup focus', 'textarea', fitTextareaToContent)
        .on('change', 'input, textarea, select', function () {
            var value = getValueAfterChange(this),
                $that = $(this),
                _id   = $that.data('object')._id,
                field = $that.data('object').label;

            saveObjectValue(_id, field, value);
        });

    // wählt man in der Mobilansicht ein Menu, soll das Menu schliessen
    $('body').on('click.nav', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a')) {
            $(this).collapse('hide');
        }
    });

    //man soll auch auf den Titel klicken können und das Menü schliesst
    $('body').on('click.nav', '.navbar-brand', function () {
        $('.navbar .navbar-collapse').collapse('hide');
    });

};
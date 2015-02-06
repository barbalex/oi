/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                            = require('jquery'),
    _                            = require('underscore'),
    fitTextareaToContent         = require('./form/fitTextareaToContent'),
    getValueAfterChange          = require('./form/getValueAfterChange'),
    saveObjectValue              = require('./form/saveObjectValue'),
    createNewObjectFromObject    = require('./createNewObjectFromObject'),
    createNewObjectFromHierarchy = require('./createNewObjectFromHierarchy'),
    deleteObjectAndChildren      = require('./deleteObjectAndChildren');

module.exports = function () {
    $('#nav')
        .on('scroll', function () {
            $('#navSeparator').css('height', $('#navContent').height() + 40);
        });

    $('#form')
        .on('scroll', function () {
            $('#formSeparator').css('height', $('#formContent').height() + 40);
        })
        .on('click', '#formNew', function () {
            var node = $('#navContent').jstree(true).get_selected(true)[0],
                type = node.data.type,
                id   = node.data.type === 'object' ? node.id : node.data.id,
                parentId;

            switch (type) {
            case 'object':
                createNewObjectFromObject(id);
                break;
            case 'hierarchy':
                parentId = $('#navContent').jstree(true).get_selected(true)[0].parent;
                createNewObjectFromHierarchy(id, parentId);
                break;
            }
        })
        .on('click', '#formDelete', function () {
            var node = $('#navContent').jstree(true).get_selected(true)[0];
            deleteObjectAndChildren(node);
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
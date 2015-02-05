/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                              = require('jquery'),
    _                              = require('underscore'),
    fitTextareaToContent           = require('./form/fitTextareaToContent'),
    getValueAfterChange            = require('./form/getValueAfterChange'),
    saveObjectValue                = require('./form/saveObjectValue'),
    createNewObjectFromObjectId    = require('./createNewObjectFromObjectId'),
    createNewObjectFromHierarchyId = require('./createNewObjectFromHierarchyId'),
    deleteObjectFromTreeNode       = require('./deleteObjectFromTreeNode');

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
            var $formContent = $('#formContent'),
                id   = $formContent.data('id'),
                type = $formContent.data('type'),
                parentOfSelectedNode,
                parentId;

            console.log('formNew, id: ', id);
            console.log('formNew, type: ', type);

            switch (type) {
            case 'object':
                createNewObjectFromObjectId(id);
                break;
            case 'hierarchy':
                parentId = $('#navContent').jstree(true).get_selected(true)[0].parent;
                createNewObjectFromHierarchyId(id, parentId);
                break;
            }
        })
        .on('click', '#formDelete', function () {
            var id   = $('#formContent').data('id'),
                node = $('#navContent').jstree(true).get_node('#' + id);
            deleteObjectFromTreeNode(node);
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
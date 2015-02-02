/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                    = require('jquery'),
    _                    = require('underscore'),
    initiateForm         = require('./form/initiateForm'),
    fitTextareaToContent = require('./form/fitTextareaToContent'),
    getValueAfterChange  = require('./form/getValueAfterChange'),
    saveObjectValue      = require('./form/saveObjectValue');

module.exports = function () {

    $('#navContent')
        .on('activate_node.jstree', function (e, data) {
            initiateForm(data.node.id);
        });

    $('#formContent')
        .on('keyup focus', 'textarea', fitTextareaToContent)
        .on('change', 'input, textarea, select', function () {
            var value = getValueAfterChange(this),
                $that = $(this),
                _id   = $that.data('object')._id,
                field = $that.data('object').label;

            //console.log('on change: typeof this.value: ', typeof this.value);
            //console.log('on change: typeof $(this).val(): ', typeof $(this).val());
            //console.log('on change: value: ', value);
            //console.log('on change: typeof value: ', typeof value);

            saveObjectValue(_id, field, value);
        });

    $(document).on('click.nav', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a')) {
            $(this).collapse('hide');
        }
    });

    //man soll auch auf den Titel klicken können und das Menü schliesst
    $(document).on('click.nav', '.navbar-brand', function () {
        $('.navbar .navbar-collapse').collapse('hide');
    });

};
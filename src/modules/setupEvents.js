/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $ = require('jquery');

module.exports = function () {

    $('#navContent')
        .on('activate_node.jstree', function (e, data) {
            console.log('data.node.id: ', data.node.id);
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
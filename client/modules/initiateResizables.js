/*jslint node: true, browser: true, nomen: true, todo: true */
/*global app, me, $*/
'use strict';

var alsoResizeReverse = require('./alsoResizeReverse');

module.exports = function () {
    // add plugin to resize folowing tab
    alsoResizeReverse();

    $('#nav').resizable({
        handles: 'e',
        alsoResizeReverse: '#form'
    });

    $('#form').resizable({
        handles: 'e',
        alsoResizeReverse: '#map'
    });

    $('#map').resizable({
        handles: 'e',
        alsoResizeReverse: '#utils'
    });

    var showTab = function (tab) {
        $('.tab').each(function () {
            if ($(this).attr('id') === tab) {
                if ($(this).is(':visible')) {
                    // navbar: Menu deaktivieren
                    // keine Ahnung, wieso das Bootstrap nicht selber macht
                    $('#' + tab + 'Menu').removeClass('active');
                    // Seite ausblenden
                    $(this).hide();
                } else {
                    $('#' + tab + 'Menu').addClass('active');
                    // Seite ausblenden
                    $(this).show();
                }
            }
        });
    };

    $('.nav').on('click', 'li', function () {
        var id = $(this).attr('id'),
            tab = id.substring(0, id.length - 4);

        showTab(tab);
    });
};

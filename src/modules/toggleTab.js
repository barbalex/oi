/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $           = require('jquery'),
    initiateMap = require('./map/initiateMap');

module.exports = function (tab, show) {
    $('.js-tab').each(function () {
        if ($(this).attr('id') === tab) {
            if ($(this).is(':visible') && !show) {
                // navbar: Menu deaktivieren
                $('#' + tab + 'Menu').removeClass('active');
                // Seite ausblenden
                $(this).hide();
            } else {
                $('#' + tab + 'Menu').addClass('active');
                // Seite ausblenden
                $(this).show();
                if (tab === 'map') {
                    initiateMap();
                    $('#utils').show();
                    $('#utilsMenu').addClass('active');
                }
            }
        }
    });
};

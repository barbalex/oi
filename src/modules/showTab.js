/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $ = require('jquery');

module.exports = function (tab) {
    
    console.log('showTab');

    $('.tab').each(function () {
        if ($(this).attr('id') === tab) {
            if ($(this).is(':visible')) {
                // navbar: Menu deaktivieren
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

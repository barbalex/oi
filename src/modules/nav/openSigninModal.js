/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $ = require('jquery');

module.exports = function () {
    // Werte im Modal zurücksetzen, falls es schon mal offen war
    $('#signinWithModal').find('input').each(function (index, element) {
        if (this.type === 'checkbox') {
            $(this).val(this.id === 'signinWithModalRemember');
        } else {
            $(this).val('');
        }
    });
    // modal öffnen
    // so, dass der Benutzer nicht daran vorbeikommt
    $('#signinWithModal')
        .modal({backdrop: 'static', keyboard: false})
        .find('.well').validator({
            errors: {
                delay: 1000,
                match: 'stimmt nicht überein'
            }
        });
};
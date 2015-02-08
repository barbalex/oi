/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $ = require('jquery');

module.exports = function () {
    // modal öffnen
    // so, dass der Benutzer nicht daran vorbeikommt
    $('#signinWithModal').modal({backdrop: 'static', keyboard: false});
    $('#signinWithModal').find('.well').validator({
        errors: {
            delay: 1000,
            match: 'stimmt nicht überein'
        }
    });
};
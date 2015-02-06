/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _ = require('underscore');

module.exports = function (title, text, yesButtonText, noButtonText) {
    var $modal = $('#askYesNoWithModal'),
        options;

    title = title || '';
    text  = text  || '';
    yesButtonText = yesButtonText || 'ja';
    noButtonText  = noButtonText  || 'abbrechen';

    options = {
        keyboard: true
    };

    $modal.find('.modal-title').html(title);
    $modal.find('.modal-body').find('p').html(text);
    $modal.find('#askYesNoWithModalYes').html(yesButtonText);
    $modal.find('#askYesNoWithModalNo').html(noButtonText);

    $modal.modal(options);
};
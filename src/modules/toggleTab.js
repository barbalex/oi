/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $              = require('jquery'),
    showTab        = require('./showTab'),
    hideTab        = require('./hideTab'),
    setWidthOfTabs = require('./setWidthOfTabs');

module.exports = function (tab) {
    $('.js-tab').each(function () {
        if ($(this).attr('id') === tab) {
            if ($(this).is(':visible')) {
                hideTab(tab, true);
            } else {
                showTab(tab, true);
            }
        }
    });
    //setTimeout(function () {
        setWidthOfTabs();
    //}, 500);
};

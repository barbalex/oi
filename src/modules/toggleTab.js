/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $              = require('jquery'),
    showTab        = require('./showTab'),
    hideTab        = require('./hideTab'),
    setWidthOfTabs = require('./setWidthOfTabs');

module.exports = function (tab, show) {
    $('.js-tab').each(function () {
        if ($(this).attr('id') === tab) {
            if ($(this).is(':visible') && !show) {
                hideTab(tab, false);
            } else {
                showTab(tab, false);
            }
        }
    });
    setWidthOfTabs();
};

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus */
/*global app, me, $*/
'use strict';

var _ = require('underscore');

module.exports = function () {
    var widths = [],
        parentWidth = $('#content').width(),
        tabsTotalWidth = 0,
        totalWidthNew = 0;

    console.log('setWidthOfTabs');

    $('.tab:visible').each(function () {
        var width       = $(this).width(),
            widthObject = {};

        widthObject.id  = $(this).attr('id');
        widthObject.width = width;

        widths.push(widthObject);

        tabsTotalWidth += width;
    });

    widths.reverse();

    _.each(widths, function (widthObject, index) {
        var widthAfter = (parentWidth - tabsTotalWidth) * (widthObject.width / tabsTotalWidth) + widthObject.width;

        if (index === widths.length -1) {
            // den letzten Tab aufrunden, damit kein einzelner Pixel unbenutzt bleibt
            widthAfter = parentWidth - totalWidthNew;
        } else {
            widthAfter = Math.floor(widthAfter);
            totalWidthNew += Math.floor(widthAfter);
        }
        //widthAfter = widthAfter;

        $('#' + widthObject.id).css('width', widthAfter);
    });
};

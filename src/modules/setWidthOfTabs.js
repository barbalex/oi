/*jslint node: true, browser: true, nomen: true, todo: true, plusplus*/
'use strict';

var _                             = require('underscore'),
    $                             = require('jquery'),
    setWidthOfTabsWithoutPrevious = require('./setWidthOfTabsWithoutPrevious'),
    setVisibilityOfTabSeparators  = require('./setVisibilityOfTabSeparators'),
    positionFormBtngroup          = require('./form/positionFormBtngroup'),
    refreshMap                    = require('./map/refreshMap');

module.exports = function () {
    var previousConfig,
        nowName     = 'c',
        windowWidth = $(window).width(),
        $nav        = $('#nav'),
        $form       = $('#form'),
        $map        = $('#map'),
        $utils      = $('#utils'),
        possibleKey,
        useKey;

    if (window.oi.previousTabConfig && window.oi.previousTabConfig['w' + windowWidth]) {
        nowName = $nav.is(':visible')   ? nowName + '1' : nowName + '0';
        nowName = $form.is(':visible')  ? nowName + '1' : nowName + '0';
        nowName = $map.is(':visible')   ? nowName + '1' : nowName + '0';
        nowName = $utils.is(':visible') ? nowName + '1' : nowName + '0';

        previousConfig = window.oi.previousTabConfig['w' + windowWidth][nowName];

        if (previousConfig) {
            $nav.width(previousConfig.nav);
            $form.width(previousConfig.form);
            $map.width(previousConfig.map);
            $utils.width(previousConfig.utils);
            refreshMap();
            positionFormBtngroup();
            setVisibilityOfTabSeparators();
        } else {
            setWidthOfTabsWithoutPrevious();
        }
    } else {
        setWidthOfTabsWithoutPrevious();
    }
    
};

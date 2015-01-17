/*jslint node: true, browser: true, nomen: true, todo: true */
/*global app, me, $*/
'use strict';

module.exports = function () {
    // add plugin to resize folowing tab
    $.ui.plugin.add("resizable", "alsoResizeReverse", {

        start: function (event, ui) {

            var self = $(this).data("ui-resizable"), o = self.options,

                _store = function (exp) {
                    $(exp).each(function () {
                        $(this).data("ui-resizable-alsoresize-reverse", {
                            width:  parseInt($(this).width(), 10),
                            height: parseInt($(this).height(), 10),
                            left:   parseInt($(this).css('left'), 10),
                            top:    parseInt($(this).css('top'), 10)
                        });
                    });
                };

            if (typeof (o.alsoResizeReverse) == 'object' && !o.alsoResizeReverse.parentNode) {
                if (o.alsoResizeReverse.length) {
                    o.alsoResize = o.alsoResizeReverse[0];
                    _store(o.alsoResizeReverse);
                } else {
                    $.each(o.alsoResizeReverse, function (exp, c) {
                        _store(exp);
                    });
                }
            } else {
                _store(o.alsoResizeReverse);
            }
        },

        resize: function (event, ui) {
            var self  = $(this).data("ui-resizable"),
                o     = self.options,
                os    = self.originalSize,
                op    = self.originalPosition,
                delta = {
                    height: (self.size.height - os.height) || 0,
                    width:  (self.size.width - os.width)   || 0,
                    top:    (self.position.top - op.top)   || 0,
                    left:   (self.position.left - op.left) || 0
                },

                _alsoResizeReverse = function (exp, c) {
                    $(exp).each(function () {
                        var el    = $(this),
                            start = $(this).data("ui-resizable-alsoresize-reverse"),
                            style = {},
                            // andere Werte ausschalten, weil das diese Werte teilweise beeinflusste!
                            css   = c && c.length ? c : ['width'/*, 'height', 'top', 'left'*/];

                        $.each(css || ['width'/*, 'height', 'top', 'left'*/], function (i, prop) {
                            var sum  = (start[prop] || 0) - (delta[prop] || 0); // subtracting instead of adding

                            if (sum && sum >= 0) {
                                style[prop] = sum || null;
                            }
                        });

                        el.css(style);
                    });
                };

            if (typeof (o.alsoResizeReverse) == 'object' && !o.alsoResizeReverse.nodeType) {
                $.each(o.alsoResizeReverse, function (exp, c) {
                    _alsoResizeReverse(exp, c);
                });
            } else {
                _alsoResizeReverse(o.alsoResizeReverse);
            }
        },

        stop: function (event, ui) {
            var self = $(this).data("ui-resizable");

            $(this).removeData("ui-resizable-alsoresize-reverse");
        }
    });
};

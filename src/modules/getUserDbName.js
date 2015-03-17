/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

module.exports = function () {
    return 'user_' + window.oi.me.name.toLowerCase().replace('@', '_at_').replace('.', '_p_');
};
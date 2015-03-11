/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

module.exports = function () {
    return 'user_' + window.oi.me.name.replace('@', '__at__').replace('.', '__p__');
};
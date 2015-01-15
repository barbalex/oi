var PageView = require('./base');
var templates = require('../templates');


module.exports = PageView.extend({
    pageTitle: 'ortinfo',
    template: templates.pages.home
});

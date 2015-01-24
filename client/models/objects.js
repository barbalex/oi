var Collection = require('ampersand-rest-collection');
var Object = require('./object');


module.exports = Collection.extend({
    model: Object,
    url: '/api/objects'
});

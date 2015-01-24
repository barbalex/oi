var Collection = require('ampersand-rest-collection');
var Hierarchy  = require('./hierarchy');

module.exports = Collection.extend({
    model: Hierarchy,
    url: '/api/hierarchies'
});

var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
    props: {
        id:       'any',
        type:     ['string', true, 'hierarchy'],
        hTypeUid: ['string', true, ''],
        level:    ['number', true, 0],
        name:     ['string', true, '']
    }
});

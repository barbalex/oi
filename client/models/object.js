var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
        id: 'any',
        type: ['string', true, 'object'],
        parent: ['string', true, ''],
        users: ['number', true, 5],
        editedBy: 'any',
        data: 'any'
    },
    session: {
        selected: ['boolean', true, false]
    }
});

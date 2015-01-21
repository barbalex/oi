var _ = require('underscore');

var people = [
    {
        id: 1,
        firstName: 'Henrik',
        lastName: 'Joreteg',
        coolnessFactor: 11
    },
    {
        id: 2,
        firstName: 'Bob',
        lastName: 'Saget',
        coolnessFactor: 2
    },
    {
        id: 3,
        firstName: 'Larry',
        lastName: 'King',
        coolnessFactor: 4
    },
    {
        id: 4,
        firstName: 'Diana',
        lastName: 'Ross',
        coolnessFactor: 6
    },
    {
        id: 5,
        firstName: 'Crazy',
        lastName: 'Dave',
        coolnessFactor: 8
    },
    {
        id: 6,
        firstName: 'Larry',
        lastName: 'Johannson',
        coolnessFactor: 4
    }
];

var hierarchies = [
    {
        id: 'xy',
        type: 'hierarchy',
        users: ['z@z.ch'],
        editedBy: [
            {date: 'xx', user: 'z@z.ch'}
        ],
        levels: [
            {
                level: 0,
                name: 'Projekt',
                fields: [
                    {
                        name: 'Field1',
                        type: 'text',
                        valueList: [],
                        order: 1,
                        dataType: 'text',
                        standardValue: ''
                    },
                    {
                        name: 'Field2',
                        type: 'text',
                        valueList: [],
                        order: 1,
                        dataType: 'text',
                        standardValue: ''
                    }
                ]
            }
        ]
    }
];

var objects = [
    {
        id: 'o1',
        type: 'object',
        level: 0,                                                               // das muss ein Projekt sein
        parent: null,
        name: "apflora",
        users: [],
        editedBy: [{date: "xx", user: "xx"}],
        data: {                                                                // jetzt die fields, wie in hierarchy definiert
            field1: "",
            field2: ""
        }
    }
];

var id = 7;

function get(id) {
    return _.findWhere(people, {id: parseInt(id + '', 10)});
}

exports.name = 'fake_api';
exports.version = '0.0.0';
exports.register = function (plugin, options, next) {
    plugin.route({
        method: 'GET',
        path: '/api/people',
        handler: function (request, reply) {
            reply(people);
        }
    });

    plugin.route({
        method: 'POST',
        path: '/api/people',
        handler: function (request, reply) {
            var person = request.payload;
            person.id = id++;
            people.push(person);
            reply(person).code(201);
        }
    });

    plugin.route({
        method: 'GET',
        path: '/api/people/{id}',
        handler: function (request, reply) {
            var found = get(request.params.id);
            reply(found).code(found ? 200 : 404);
        }
    });

    plugin.route({
        method: 'DELETE',
        path: '/api/people/{id}',
        handler: function (request, reply) {
            var found = get(request.params.id);
            if (found) people = _.without(people, found);
            reply(found).code(found ? 200 : 404);
        }
    });

    plugin.route({
        method: 'PUT',
        path: '/api/people/{id}',
        handler: function (request, reply) {
            var found = get(request.params.id);
            if (found) _.extend(found, request.payload);
            reply(found).code(found ? 200 : 404);
        }
    });

    next();
};

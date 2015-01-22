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
        id: 'h1',
        type: 'hierarchy',
        hTypeUid: 'xyz',  // documents saved get this uid. App can look up leven and structure of the document
        level: 0,         // no order yet (to be saved later for user, not for the project)
        name: 'apflora.ch',
        users: ['z@z.ch'],
        editedBy: [
            {date: 'xx', user: 'z@z.ch'}  // history of changes
        ],
        fields: [
            {
                name: 'Bemerkungen zum Projekt',
                type: 'text',
                valueList: [],
                order: 1,          // user with rights can drag and drop to change order of fields
                dataType: 'text',
                standardValue: ''
            }
        ],
        children: [
            {
                level: 1,
                order: 1,           // user with rights can drag and drop to change order of hierarchies
                name: 'Programm',
                users: ['z@z.ch'],  // if not set is inherited from higher level
                editedBy: [
                    {date: 'xx', user: 'z@z.ch'}
                ],
                fields: [
                    {
                        name: 'Art',
                        type: 'select',
                        // valueList can be imported by user
                        // big lists arent too bad: data is accessed locally and hopefully cached
                        valueList: [{value: 100, label: 'Abies alba Mill. (Weiss-Tanne)'}, {value: 150, label: 'Abutilon theophrasti Medik.'}],
                        order: 1,
                        dataType: '',
                        standardValue: ''
                    },
                    {
                        name: 'Aktionsplan',
                        type: 'optionsgroup',
                        valueList: [{value: null, label: '(kein Eintrag)'}, {value: 1, label: 'keiner'}, {value: 4, label: 'erstellt'}],
                        order: 2,
                        dataType: '',
                        standardValue: ''
                    }
                ],
                children: [
                    {
                        level: 2,
                        order: 1,
                        name: 'Populationen',
                        users: ['z@z.ch'],
                        editedBy: [
                            {date: 'xx', user: 'z@z.ch'}
                        ],
                        fields: [
                            {
                                name: 'Name',
                                type: 'text',
                                valueList: [],
                                order: 1,
                                dataType: 'text',
                                standardValue: ''
                            },
                            {
                                name: 'Status',
                                type: 'optionsgroup',
                                valueList: [{value: 1, label: 'ursprünglich, aktuell'}, {value: 3, label: 'angesiedelt, aktuell'}],
                                order: 2,
                                dataType: '',
                                standardValue: ''
                            }
                        ],
                        children: [
                            {
                                level: 3,
                                order: 1,
                                name: 'Teilpopulationen',
                                users: ['z@z.ch'],
                                editedBy: [
                                    {date: 'xx', user: 'z@z.ch'}
                                ],
                                fields: [
                                    {
                                        name: 'Nr',
                                        type: 'number',
                                        valueList: [],
                                        order: 1,
                                        dataType: '',
                                        standardValue: ''
                                    },
                                    {
                                        name: 'Flurname',
                                        type: 'text',
                                        valueList: [],
                                        order: 2,
                                        dataType: 'text',
                                        standardValue: ''
                                    }
                                ],
                                children: [
                                    {
                                        level: 4,
                                        order: 1,
                                        name: 'Massnahmen',
                                        users: ['z@z.ch'],
                                        editedBy: [
                                            {date: 'xx', user: 'z@z.ch'}
                                        ],
                                        fields: []
                                    },
                                    {
                                        level: 4,
                                        order: 2,
                                        name: 'Feldkontrollen',
                                        users: ['z@z.ch'],
                                        editedBy: [
                                            {date: 'xx', user: 'z@z.ch'}
                                        ],
                                        fields: []
                                    },
                                    {
                                        level: 4,
                                        order: 3,
                                        name: 'Teilpopulations-Berichte',
                                        users: ['z@z.ch'],
                                        editedBy: [
                                            {date: 'xx', user: 'z@z.ch'}
                                        ],
                                        fields: []
                                    }
                                ]
                            },
                            {
                                level: 3,
                                order: 2,
                                name: 'Populations-Berichte',
                                users: ['z@z.ch'],
                                editedBy: [
                                    {date: 'xx', user: 'z@z.ch'}
                                ],
                                fields: [
                                    {
                                        name: 'Jahr',
                                        type: 'number',
                                        valueList: [],
                                        order: 1,
                                        dataType: '',
                                        standardValue: ''
                                    },
                                    {
                                        name: 'Entwicklung',
                                        type: 'optionsgroup',
                                        valueList: [{value: 1, label: 'zunehmend'}, {value: 3, label: 'abnehmend'}],
                                        order: 2,
                                        dataType: '',
                                        standardValue: ''
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        level: 2,
                        order: 2,
                        name: 'AP-Berichte',
                        users: ['z@z.ch'],
                        editedBy: [
                            {date: 'xx', user: 'z@z.ch'}
                        ],
                        fields: [
                            {
                                name: 'Jahr',
                                type: 'number',
                                valueList: [],
                                order: 1,
                                dataType: '',
                                standardValue: ''
                            },
                            {
                                name: 'Situation',
                                type: 'text',
                                valueList: [],
                                order: 2,
                                dataType: 'text',
                                standardValue: ''
                            }
                        ]
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
        hTypeUid: 'xyz',
        parent: null,                           // das muss ein Projekt sein
        name: "apflora",
        users: [],
        editedBy: [{date: "xx", user: "xx"}],
        data: {                                 // jetzt die fields, wie in hierarchy definiert
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

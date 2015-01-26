/*jslint node: true, browser: true, nomen: true, todo: true */
/*global app, me, $*/
'use strict';

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

var hierarchiesTest = [
    {
        id: 1,
        type: 'hierarchy',
        hTypeUid: 'h0',
        level: 0,
        name: 'apflora.ch'
    },
    {
        id: 2,
        type: 'hierarchy',
        hTypeUid: 'h1',
        level: 0,
        name: 'name2'
    }
];

var hierarchies = [
    {
        id: 'h0',
        type: 'hierarchy',
        hTypeUid: 'h0',  // documents saved get this uid. App can look up leven and structure of the document
        level: 0,         // no order yet (to be saved later for user, not for the project)
        name: 'apflora.ch',
        users: ['z@z.ch'],
        editedBy: [
            {date: 'xx', user: 'z@z.ch'}  // history of changes
        ],
        fields: [
            {
                name: 'Bemerkungen',
                type: 'text',
                valueList: [],
                order: 1,          // user with rights can drag and drop to change order of fields
                dataType: 'text',
                standardValue: ''
            }
        ],
        children: [
            {
                hTypeUid: 'h11',
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
                        hTypeUid: 'h21',
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
                                hTypeUid: 'h31',
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
                                        hTypeUid: 'h41',
                                        level: 4,
                                        order: 1,
                                        name: 'Massnahmen',
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
                                                name: 'Typ',
                                                type: 'optionsgroup',
                                                valueList: [{value: 1, label: 'spezial'}, {value: 2, label: 'Ansiedlung: Ansaat'}],
                                                order: 1,
                                                dataType: '',
                                                standardValue: ''
                                            }
                                        ]
                                    },
                                    {
                                        hTypeUid: 'h42',
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
                                        hTypeUid: 'h43',
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
                                hTypeUid: 'h32',
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
                        hTypeUid: 'h22',
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
        id:       'o1',
        type:     'object',
        hTypeUid: 'h0',                                   // app can check meta information here
        parent:   null,                                   // must be top hierarchy
        users:    ['z@z.ch'],                             // gets inherited from project
        editedBy: [{date: '02.01.2015', user: 'z@z.ch'}],
        data: {                                 // jetzt die fields, wie in hierarchy definiert
            Bemerkungen: "Artförderprojekt der FNS Kt. Zürich"
        }
    },
    {
        id:       'o2',
        type:     'object',
        hTypeUid: 'h11',
        parent:   'o1',
        users:    ['z@z.ch'],
        editedBy: [{date: '02.01.2015', user: 'z@z.ch'}],
        data: {
            Art: 100,
            Aktionsplan: 4
        }
    },
    {
        id:       'o3',
        type:     'object',
        hTypeUid: 'h21',
        parent:   'o2',
        users:    ['z@z.ch'],
        editedBy: [{date: '02.01.2015', user: 'z@z.ch'}],
        data: {
            Name: 'Niederhasli, Mettmenhaslisee',
            Status: 3
        }
    },
    {
        id:       'o4',
        type:     'object',
        hTypeUid: 'h22',
        parent:   'o2',
        users:    ['z@z.ch'],
        editedBy: [{date: '02.01.2015', user: 'z@z.ch'}],
        data: {
            Jahr: 2014,
            Situation: 'Im Jahr 2014 fanden 3 Anpflanzungen bzw. Populationsstärkungen (Zürich, Seeholzriet, reg. Torfstich Mitte; Zürich, Seeholzriet, Torfstich E Schwarzerle; Zürich, Hänsiried, Parz. 1790 N) in 2 Populationen statt.'
        }
    },
    {
        id:       'o5',
        type:     'object',
        hTypeUid: 'h31',
        parent:   'o3',
        users:    ['z@z.ch'],
        editedBy: [{date: '02.01.2015', user: 'z@z.ch'}],
        data: {
            Nr: 1,
            Flurname: 'Mettmenhaslisee'
        }
    },
    {
        id:       'o6',
        type:     'object',
        hTypeUid: 'h32',
        parent:   'o3',
        users:    ['z@z.ch'],
        editedBy: [{date: '02.01.2015', user: 'z@z.ch'}],
        data: {
            Jahr: 2009,
            Entwicklung: 3
        }
    },
    {
        id:       'o7',
        type:     'object',
        hTypeUid: 'h41',
        parent:   'o5',
        users:    ['z@z.ch'],
        editedBy: [{date: '02.01.2015', user: 'z@z.ch'}],
        data: {
            Jahr: 2009,
            Typ: 2
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
        path: '/api/objects/{id}',
        handler: function (request, reply) {
            reply(objects);
        }
    });

    plugin.route({
        method: 'GET',
        path: '/api/hierarchies',
        handler: function (request, reply) {
            reply(hierarchiesTest);
        }
    });

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

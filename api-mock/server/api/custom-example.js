'use strict';

const SetupEndpoint = require('./setup/');

module.exports = SetupEndpoint({
    name: 'books',
    urls: [{
        params: '',
        requests: [{
            method: 'GET',
            response: '/response-files/custom-example.json'
        }]
    }, {
        params: '/update/{id}',
        requests: [{
            method: ['PUT', 'PATCH'],
            response: {
                success: true
            }
        }, {
            method: 'DELETE',
            response: {
                deleted: true
            }
        }]
    }]
});

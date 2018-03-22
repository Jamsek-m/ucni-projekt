'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.restConfig = undefined;

var _configuration = require('modules/configuration');

var _configuration2 = _interopRequireDefault(_configuration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var restConfig = new _configuration2.default({
    prefixKey: 'rest-config',
    type: 'object',
    fields: {
        integerProperty: {
            type: 'number',
            name: 'inti',
            watch: true
        },
        booleanProperty: {
            type: 'boolean'
        },
        stringProperty: {
            type: 'string'
        },
        nestedObject: {
            type: 'object',
            fields: {
                integerProperty: {
                    type: 'number'
                },
                arr: {
                    type: 'array'
                },
                oneMoreObject: {
                    type: 'object',
                    name: 'objeeect',
                    fields: {
                        deli: {
                            type: 'number',
                            watch: true
                        }
                    }
                }
            }
        },
        services: {
            type: 'array',
            fields: {
                http: {
                    type: 'string'
                },
                port: {
                    type: 'number',
                    watch: true
                }
            }
        }
    }
});

restConfig.initialize({ extension: 'consul' });

exports.restConfig = restConfig;
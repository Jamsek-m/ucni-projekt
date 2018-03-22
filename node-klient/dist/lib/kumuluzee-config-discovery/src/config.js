import ConfigBundle from 'modules/configuration';

const restConfig = new ConfigBundle({
    prefixKey: 'rest-config',
    type: 'object',
    fields: {
        integerProperty: {
            type: 'number',
            name: 'inti',
            watch: true,
        },
        booleanProperty: {
            type: 'boolean',
        },
        stringProperty: {
            type: 'string',
        },
        nestedObject: {
            type: 'object',
            fields: {
                integerProperty: {
                    type: 'number',
                },
                arr: {
                    type: 'array',
                },
                oneMoreObject: {
                    type: 'object',
                    name: 'objeeect',
                    fields: {
                        deli: {
                            type: 'number',
                            watch: true,
                        },
                    },
                },
            },
        },
        services: {
            type: 'array',
            fields: {
                http: {
                    type: 'string',
                },
                port: {
                    type: 'number',
                    watch: true,
                },
            },
        },
    },
});

restConfig.initialize({ extension: 'consul' });

export { restConfig };

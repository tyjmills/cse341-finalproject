const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Customers API',
        description: 'Customers API'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// This will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
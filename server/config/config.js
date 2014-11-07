var path = require('path');
var rootPath = path.normalize(__dirname +'/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/MeanApp1',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production:{
        db: 'mongodb://toki:tokitoki@ds033170.mongolab.com:33170/meanapp1',
        rootpath: rootPath,
        port: process.env.PORT || 80

    }

}
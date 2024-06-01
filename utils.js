path = require('path');
utils = {};

utils.baseURL = 'http://localhost:6969/';

utils.homeFunctions = {
    getHomePage : function (res){
        res.sendFile(path.join(__dirname, 'views', 'LoginAndSignup.html'));
    }
};

utils.psql = {
    psqlConnectionData : {
        postgresUrl : process.env.POSTGRES_URL,
        postgresPrismaUrl : process.env.POSTGRES_PRISMA_URL,
        postgresUrlNoSsl : process.env.POSTGRES_URL_NO_SSL,
        postgresUrlNonPooling : process.env.POSTGRES_URL_NON_POOLING,
        postgresUser : process.env.POSTGRES_USER,
        postgresHost : process.env.POSTGRES_HOST,
        postgresPassword : process.env.POSTGRES_PASSWORD,
        postgresDatabase : process.env.POSTGRES_DATABASE
    }
}

utils.trimString = function(str){
    return str ? str.trim() : '';
}

concatArrayOfString = function(str){
    var message = ''
    fields.forEach((field) => {
        message += field+','
    });
    return message;
}

module.exports = utils;
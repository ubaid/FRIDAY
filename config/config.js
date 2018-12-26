require('dotenv').config();//instatiate environment variables

const CONFIG = {}; //Make this global to use all over the application

CONFIG.app = process.env.APP || 'development';
CONFIG.port = process.env.PORT || '3000';

CONFIG.db_dialect = process.env.DB_DIALECT || 'mongo';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '27017';
CONFIG.db_name = process.env.DB_NAME || 'name';
CONFIG.db_user = process.env.DB_USER || 'root';
CONFIG.db_password = process.env.DB_PASSWORD || 'db-password';

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'Ob8GcD4LyZpw5hvUtpXh!';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '10000';

CONFIG.scoring_max_ip_size = 2;

CONFIG.es_host = `${ process.env.ES_HOST || 'localhost' }:${ process.env.ES_PORT || '9200' }`;
CONFIG.es_profileType = 'data';

module.exports = CONFIG;

// From docker-compose
const postgresConfig = {
  "name": "default",
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "postgres",
  "database": "postgres",
  "synchronize": true,
  "logging": false,
  "entities": [
    "src/entity/*.*"
  ]
};

// From docker-compose
const mysqlConfig = {
  "name": "default",
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "user",
  "password": "password",
  "database": "db",
  "insecureAuth": true,
  "synchronize": true,
  "logging": false,
  "entities": [
    "src/entity/*.*"
  ]
};

// Use if docker-compose is set to PostgrSQL 
// module.exports = postgresConfig;

// Use if docker-compose is set to MySQL 
module.exports = mysqlConfig;
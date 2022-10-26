require("dotenv").config(); //.env 임포트

const {DB_USERNAME, DB_PASSWORD, DB_HOST} = process.env //process.env.DB_USERNAME 이렇게 써두됨

const config = {
  "development": {
    "username": DB_USERNAME, //process.env.DB_USERNAME 이렇게 써두됨
    "password": DB_PASSWORD,
    "database": "4week",
    "host": DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "1234",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

module.exports = config
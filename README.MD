[![DEMO](https://www.herokucdn.com/deploy/button.svg)](https://my-app-dian.herokuapp.com/)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/collections/322da611bd5bc79f99e7)

#DEMO REST-API With Authentication JWT to HEROKU

## Download Instruksi

Run `git clone https://github.com/diyset/JWT-REST-API-NODEJS-HEROKU.git` untuk download source code ke computer anda

## Database Setup

lokasi config.json berada di `folderproject/server/db/config/config.json` dan di ganti enviromentnya untuk environment local 

{
  "development": {
    "username": "root",
    "password": null,
    "database": "`your-database-name`",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "`your-database-name`",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "`your-database-name-production`",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

## For The Next
- Implement REDIS on the heroku
- Implement Front-End

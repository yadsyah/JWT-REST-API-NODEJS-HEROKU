

# DEMO REST-API With Authentication JWT to HEROKU

![NpmLicense](https://img.shields.io/npm/l/:package.svg)

![Website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg?label=my-website)

![GitHub repo size in bytes](https://img.shields.io/github/repo-size/badges/shields.svg)


![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

![David](https://img.shields.io/david/sequelize/sequelize.svg)


[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)


[![GitHub issues](https://img.shields.io/github/issues/diyset/JWT-REST-API-NODEJS-HEROKU.svg)](https://github.com/diyset/JWT-REST-API-NODEJS-HEROKU/issues)


[![DEMO](https://www.herokucdn.com/deploy/button.svg)](https://my-app-dian.herokuapp.com/)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/collections/322da611bd5bc79f99e7)


## Download Instruksi

Run `git clone https://github.com/diyset/JWT-REST-API-NODEJS-HEROKU.git` untuk download source code ke computer anda

## Database Setup

lokasi config.json berada di `folderproject/server/db/config/config.json` dan di ganti enviromentnya untuk environment local 
```json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "your-database-name",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "your-database-name",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "your-database-name-production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
## For The Next
- Implement REDIS on the heroku
- Implement Front-End




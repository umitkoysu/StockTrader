# StockTrader
StockTrader is an arbitrarily trading game developed by a startup in a very short span of time called “Super Traders” . The purpose of the application is to educate users on the terminology used in trading of shares.

# Requirements

* Node.js v16.14.0
* PostgreSQL

# How to run
```bash
git clone https://github.com/umitkoysu/StockTrader.git
cd StockTrader
cd src
```

```bash
npm install
```

Edit database connection configurations in .env file

```bash
DDB_HOST="{Host Address}"
DDB_DATABASE="{Database Name}"
DDB_USERNAME="{Database Username}"
DDB_PASS="{Database Password}"
DDB_DRIVER="postgres"
```

```bash
node app.js
```

You should see the following information in the console

```bash
2022-02-28T01:15:17.756Z info : Database Connection: Success
2022-02-28T01:15:18.028Z info : Database Migration: Success
2022-02-28T01:15:18.175Z info : Dev Mode: true
2022-02-28T01:15:18.176Z info : Error Message Language: en
2022-02-28T01:15:18.176Z info : Error File Log: true
2022-02-28T01:15:18.177Z info : Database Query File Log: true
2022-02-28T01:15:18.178Z info : Maintenance Mode: false
2022-02-28T01:15:18.178Z info : Database Migration Alter: true
2022-02-28T01:15:18.179Z info : Database Migration Force: true
2022-02-28T01:15:18.179Z info : Password Hash Salt: 10
2022-02-28T01:15:18.180Z warn : Server is running on port: 3000
```

# Equipments
* Express.js
* Body-parser
* Bcrypt
* Cors
* Dotenv
* Winston
* Joi
* Joi-password
* Postman
* Express-query-parser
* Http-status



> I included the log files for review.
# Databases and Schema Design
## ORM - Object-relational mapping

``` javascript
var Sequelize = require('sequelize');
var sequelize = new Sequelize();

var Tweet = sequelize.define('Tweet', {
  text: Sequelize.STRING,
  username: Sequelize.STRING  
});

Tweet.find({where: {text: 'Blafhapweoif'}})
     .done( function (err, tweets) {
      console.log(tweets);
     });

```

## Relational Database
## History of Databases
- Navigational
- Relational
- NoSQL
## MongoDB
- Document Store
  - Store JSON documents rather than tabular data
- Schema-less
- Query

## History of Mongo DB
- 10gen
- Google App Engine
- Open source but driven by MongoDB the company
- "M" in "MEAN" stack

## What is MongoDB good at?
- Chaging Flexible Schema
- Preplan for scale
## What is MongoDB bad at?
- Transactional data like banking or accounting
- ACID Compliance

## CAP Theorem

## CRUD in MongoDB
- create/insert _id
- read: db.users.find()
- update: db.users.update(queryObject, updateCommandObject), $set
- delete: db.students.remove({id: 201});

## Querying
## Indexes
- explain()

## Tools
## Mongoose
- node mongo driver

# Schema Design

# Testing
``` javascript
// "models"
function convertToC(f) {
    return (f - 32) * (5 / 9);
}

function convertToF(c) {
    return (c * (9 / 5)) + 32;
}

//server

var express = require('express')
var app = module.exports = express()

app.param('temp', function(req, res, next, temp) {
    req.temp = parseFloat(temp)
      if(isNaN(req.temp)) return res.send(400)
          next()
})

app.get('/f/:temp', function(req, res) {
    res.json(convertToF(req.temp))
})

app.get('/c/:temp', function(req, res) {
    res.json(convertToC(req.temp))
})

app.listen(3000)
```

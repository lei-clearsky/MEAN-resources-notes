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

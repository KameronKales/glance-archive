const archive = require('express').Router();
const bodyParser = require('body-parser');
const request = require('request');
const jwt = require('jwt-simple');
const cookieParser = require('cookie-parser')
const database = require('../db/db.js');
archive.use(bodyParser.json());
archive.use(bodyParser.urlencoded({
  extended: true
}));
var JWT_SECRET = 'REMOVED FOR PRIVACY';

archive.use(cookieParser())


archive.post('/people', (req, res, next) => {

  decode_user()

  function db_close(db, res) {
    console.log('The DB was closed')
    db.close()
    res.send(400)
  }

  function decode_user() {
    var finalToken = req.body.token
    var decoded = jwt.decode(finalToken, JWT_SECRET);
    console.log(decoded)
    console.log('Is this running?')
    get_people(decoded)

  }

  function get_people(decoded) {
    database((err, db) => {
      if (err) {
        console.log(err)
        db_close(db, res)
      } else {
        db.collection('person', (err, personCollection) => {
          personCollection.find({
            $and: [{
              "req_id": decoded.req_id
            }, {
              "status": "inactive"
            }]
          }).sort({
            _id: -1
          }).toArray((err, person) => {
            console.log(person)
            db_close_result(db, res, person)
          })
        })
      }
    })
  }



  function db_close_result(db, res, person) {
    db.close(db)
    return res.json(person)
  }
})


module.exports = archive;

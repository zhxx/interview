var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')
var resolve = path.resolve
var questions = resolve(__dirname, '../data/questions.json')
/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile(questions, 'utf-8', function(err, data) {
    if (err) throw err;
    res.json(data);
  })
});
router.post('/', function(req, res, next) {
  fs.readFile(questions, 'utf-8', function(err, data) {
    if (err) throw err;
    var _data = JSON.parse(data)
    _data.push(req.body)
    fs.writeFile(questions, JSON.stringify(_data), err => {
      if (err) throw err;
      res.json(req.body);
    })
  })
});
module.exports = router;

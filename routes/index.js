var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.post('/newTask', function(req, res) {
  console.log(req.body);
  res.render('index', { title: 'Express' });
});

router.post('/newUser', function(req, res) {
  console.log(req.body);
  res.render('index', { title: 'Express' });
});
module.exports = router;

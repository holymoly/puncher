#!/usr/bin/env node
var debug = require('debug')('puncher');

/* express stuff */
var express = require('express');
var router = express.Router();

/* couchdb stuff */
var Couch  = require('../src/couch');
var couchClient = new Couch();

var async = require('async');

function renderPage(postError, res) {
  async.parallel([
    function (cb) {
      couchClient.getDbViewFunc('projects', 'puncher', 'projectNames', '', function (err, result) {
        cb(err, result);
      });
    },
    function (cb) {
      couchClient.getDbViewFunc('units', 'puncher', 'units', '', function (err, result) {
        cb(err, result);
      });
    },
    function (cb) {
      couchClient.getDbViewFunc('projects', 'puncher', 'customers', '', function (err, result) {
        cb(err, result);
      });
    },
    function (cb) {
      couchClient.getDbViewFunc('users', 'puncher', 'shorts', '', function (err, result) {
        cb(err, result);
      });
    },
    function (cb) {
      couchClient.getDbViewFunc('tasks', 'puncher', 'tasks', '', function (err, result) {
        cb(err, result);
      });
    }],
    function (err, results) {
      debug(err, postError, results);
      //Sort by time
      results[4].sort(function (b, a) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.value.deadlineTime) - new Date(a.value.deadlineTime);
      });
      //Sort by date
      results[4].sort(function (b, a) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.value.deadlineDate) - new Date(a.value.deadlineDate);
      });
      //getError = error duricg database request
      //postError = error during database insert
      res.render('index', {
        title:        'puncher',
        projectNames: results[0],
        unitNames:    results[1],
        customers:    results[2],
        users:        results[3],
        tasks:        results[4],
        getError:     err,
        postError:    postError
      });
    });
}

function createPost(database, data, res) {
  debug('create db entrry in database' + database);
  //add creation data

  couchClient.postDb(database, data, function (err, response, conflict) {
    debug(err, response, conflict);
    renderPage(err, res);
  });
}

/* GET home page. */
router.get('/*', function (req, res) {
  /*jslint unparam:true*/
  renderPage(undefined, res);
});

/* Create a new task in couchdb. */
router.post('/newTask', function (req, res) {
  //create a new entry in database task
  req.body.status = 'open';
  req.body.created = new Date();
  req.body.creator = 'not automated yet';
  createPost('tasks', req.body, res);
});

/* Create a new user in couchdb. */
router.post('/newUser', function (req, res) {
  req.body.created = new Date();
  req.body.creator = 'not automated yet';
  createPost('users', req.body, res);
});

/* Create a new project in couchdb. */
router.post('/newProject', function (req, res) {
  req.body.created = new Date();
  req.body.creator = 'not automated yet';
  createPost('projects', req.body, res);
});

/* Create a new unit in couchdb. */
router.post('/newUnit', function (req, res) {
  req.body.created = new Date();
  req.body.creator = 'not automated yet';
  createPost('units', req.body, res);
});


router.post('/updateTask', function (req, res) {
  console.log(req.body);
  req.body.updated = new Date();
  req.body.updater = 'nope';
  createPost('tasks', req.body, res);
});

module.exports = router;

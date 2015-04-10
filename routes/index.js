#!/usr/bin/env node
var debug = require('debug')('puncher');

/* express stuff */
var express = require('express');
var router = express.Router();

/* couchdb stuff */
var couch  = require('../src/couch');
var couchClient = new couch();

var async = require('async');


/* GET home page. */
router.get('/*', function(req, res) {
  renderPage(undefined,res);
});

/* Create a new task in couchdb. */
router.post('/newTask', function(req, res) {
  //create a new entry in database task
  createPost('tasks', req.body, res);
});

/* Create a new user in couchdb. */
router.post('/newUser', function(req, res) {
  createPost('users', req.body, res);
});

/* Create a new project in couchdb. */
router.post('/newProject', function(req, res) {
  createPost('projects', req.body, res);
});

/* Create a new unit in couchdb. */
router.post('/newUnit', function(req, res) {
  createPost('units', req.body, res);
});

function createPost(database,data,res){
  debug('create db entrryin database' + database);
  //add creation data
  data['created'] = new Date();
  data['creator'] = 'not automated yet';
  data['status'] = 'open';

  couchClient.postDb(database,data,function(err,response,conflict){
    debug(err,response,conflict);
    renderPage(err,res);
  });
}

function renderPage(postError, res){
  async.parallel([
        function(cb){
          couchClient.getDbViewFunc('projects','puncher','projectNames','',function(err,result){
             cb(err,result);
          });
        },
        function(cb){
         couchClient.getDbViewFunc('units','puncher','units','',function(err,result){
             cb(err,result);
          });
        },
        function(cb){
         couchClient.getDbViewFunc('projects','puncher','customers','',function(err,result){
             cb(err,result);
          });
        },
        function(cb){
          couchClient.getDbViewFunc('users','puncher','shorts','',function(err,result){
             cb(err,result);
          });
        },
        function(cb){
         couchClient.getDbViewFunc('tasks','puncher','tasks','',function(err,result){
             cb(err,result);
          });
        }
    ],
    function(err, results){
      debug(err,postError,results);
      //getError = error duricg database request
      //postError = error during database insert
      res.render('index', { title:        'puncher',
                            projectNames: results[0],
                            unitNames:    results[1],
                            customers:    results[2],
                            users:        results[3],
                            tasks:        results[4],
                            getError:     err,
                            postError:    postError
                          });
    }
  );
}
module.exports = router;

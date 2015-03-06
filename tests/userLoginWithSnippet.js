/**
 * Created by Ryan Donahue.
 *
 * This sample shows a few different things regarding snippet execution
 * alongside user registration. A user is created, logged in, and a snippet is run
 * with the user login to illustrate some basic user object creation with the new
 * user. Many apps require some stub configurations which make sense to be created
 * alongside the user.
 *
 * Sample also illustrates a workflow for doing integration tests on a snippets
 * project.
 */
var cloudmine = require('cloudmine');
var test = require("tap").test;

// environment variables generated on render and deploy from config.js
var applicationID = '9ff05619b6894397b503abd7f425a7fd';
var piiAPIKey = 'EED575370F834E84B4048887EC942158';

// a test user we will use for this workflow
var userCredentials = {
  username: 'testuser',
  email: 'testuser@cloudmine.me',
  password: 'testuser'
};

// CloudMine SDK for working with PII data
// includes the snippet name and parameters for executing the call w/ snippet run.
// uses the rackspace api root
var wsPII = new cloudmine.WebService({
  apiroot:"https://rs.cloudmine.me",
  appname: "SnippetDemo",
  appversion: "1.0",
  appid: applicationID,
  apikey: piiAPIKey,
  applevel: false,
  snippet: 'userCreation',
  params: {
    firstName: 'Test',
    lastName: 'User',
    dob: '10/13/1984',
    credentials: userCredentials
  }
});


wsPII.login(userCredentials).on("success", function (data, response) {
    // inject responses in to credentials object
  credentials.ws = ws;
  console.log(JSON.stringify(response, null, 2));
}).on("error", function (err) {
  console.log(JSON.stringify(err, null, 2));
});




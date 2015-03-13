/**
 * Created by ryandonahue on 3/6/15.
 */
var cloudmine = require('cloudmine');

var applicationID = "<%= appId %>";
var piiAPIKey = "<%= piiKey %>";

var results = {
  success: [],
  errors: []
};

// the parameter expectations from the test snippet
if (data.params.firstName === 'Test'
  && data.params.lastName === 'User'
  && data.params.dob === '10/13/1984'
  && data.params.credentials.email === 'testuser@cloudmine.me') {
  // params came in as expected
  results.success.push('params valid');
} else {
  results.errors.push('params invalid');
}

// the api key used to make the request. not used for saving since PII key is needed
if (!data.apikey) {
  results.errors.push('apikey not available');
} else {
  results.success.push('apikey available');
}

// the session token from the login request
if (!data.session_token) {
  results.errors.push('session_token not available');
} else {
  results.success.push('session_token available');
}

// the user id from the login request
if (!data.user_id) {
  results.errors.push('user_id not available');
} else {
  results.success.push('user_id available');
}

var patientData = data.params;
patientData.userType = 'Patient';
patientData.__class__ = 'PII';
patientData.email = data.params.credentials.email;

// create the PII object and exit the results with the new object
var wsPII = new cloudmine.WebService({
  appname: "SnippetDemo",
  appversion: "1.0",
  appid: applicationID,
  apikey: piiAPIKey,
  applevel: false
});

if (results.errors.length === 0) {
  wsPII.update('testuserpiiobject', patientData, null).on('success', function (data) {
    results.data = data;
    exit(results);
  }).on('failed', function (data) {
    results.data = data;
    exit(results);
  });
} else {
  results.data = {};
  exit(results);
}
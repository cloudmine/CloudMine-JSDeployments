/*
  This snippet is intended to illustrate a workflow on user creation
  to initialize a set of expected application and user objects.
  A call to create the user is wired with this snippet to run in
  conjunction with the create user API call. See the snippet in the
  test folder titled, "userCreationWithSnippet" to see the intended
  client side call.

  To test... Upload this snippet to your application and run the test
  file as a node application on the command line with:

  node userCreationWithSnippet.js
 */

var cloudmine = require('cloudmine');

var applicationID = "<%= appId %>";
var masterKey = "<%= masterKey %>";

// The calling script shows the params assumptions to be passed in
var patientData = data.params;
patientData.userType = 'Patient';
patientData.__class__ = 'PII';
patientData.email = data.params.credentials.email;
patientData.__id__ = NEWID;

// create the PII object and exit the results with the new object
var wsMaster = new cloudmine.WebService({
  appname: "SnippetDemo",
  appversion: "1.0",
  appid: applicationID,
  apikey: masterKey,
  applevel: false
});

/*
  Users created with the CloudMine API aren't automatically logged in on creation.
  Therefore the snippet must log in the user first before saving the user
  initialization object. The master key in this snippet is hidden from prying
  eyes and can be used to login the user without passing credentials around. The
  snippet can then return the session_token from this snippet to the client preventing
  another API call for login or it could just return the success of the snippet and
  user creation call. If not returning the session_token, it's recommended to also
  logout the user, invalidating the created session_token.
 */
wsMaster.login(data.params.credentials).on("success", function (data, response) {
  // add the session_token to the results so the client side doesn't need to make another request
  results.success.push('success login');
  results.session_token = data.session_token;
  wsMaster.set('testuserpiiobject', patientData, null).on('success', function (data) {
    // append the success and id to the results
    results.success.push('success creating user object');
    results.pii_results = data;
    wsMaster.set('applevellastusercreated', { 'date_last_created': new Date() }, {app_level: true}).on('success', function (data) {
      results.success.push('success creating app level object');
      results.app_level_results = data;
      exit(results);
    }).on('failed', function (data) {
      results.errors.push('failed creating app level object');
      exit(results);
    });
  }).on('failed', function (data) {
    results.errors.push('failed creating user object');
    exit(results);
  });
}).on('error', function (data, response) {
  results.errors.push('failed login ');
  results.errors.push('failed creating user object');
  exit('failed initializing user');
});
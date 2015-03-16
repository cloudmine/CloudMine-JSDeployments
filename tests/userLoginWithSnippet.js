/**
 * Created by ryandonahue on 3/6/15.
 */
/**
 * Created by Ryan Donahue.
 *
 * This sample shows a few different things regarding snippet execution
 * alongside user login. On user login a snippet is configured
 * to run which will initialize some objects specific to the user
 * around login metrics The API call returns the result of both the user
 * login call  and the snippet call with only one trip to the server. The
 * snippet being run is titled userLogin.js and located within the
 * /src folder of this repository.
 *
 * Instructions:
 * Ensure the application ID and master key are set in the config.js
 * file and the environment is rendered with the grunt file. Rendered
 * files can be uploaded to you application manually or deployed
 * automatically with the following scripts:
 *
 * grunt render:[ENVIRONMENT]
 * grunt deploy:[ENVIRONMENT]
 *
 * Once deployed this file can be run with the following command:
 *
 * node userLoginWithSnippet.js
 *
 * You will see the snippet execute with the login of the user as specified
 * from the command line and an object for that user created. The return value
 * is checked to ensure the complete flow was successful.
 *
 * Feel free to login to the CloudMine dashboard with your developer credentials
 * and navigate to the application and object browser. If you login as the user
 * specified in this script and inspect the "User Data" tab, the created user
 * object will be visible.
 */
var cloudmine = require('cloudmine');
var test = require("tap").test;

// environment variables generated on render and deploy from config.js
var applicationID = '';
var ePhiAPIKey = '';

/**
 * Test user we will use for this workflow. This script assumes the user has
 * already been created. If the user doesn't exist the snippet will return
 * an invalid login which prevents the server-side from executing as well
 * since the snippet is run after the login event happens.
 */
var userCredentials = {
  username: 'testuser',
  email: 'testuser@cloudmine.me',
  password: 'testuser'
};

/**
 * CloudMine SDK for working with ePHI data includes the snippet name and
 * parameters for executing the call w/ snippet run. This particular
 * call is on the RackSpace infrastructure and thus the {apiroot} specifies
 * this. If not specified the default root is the global CloudMine
 * environment. Check your specific implementation details to know if a
 * specific route needs to be used.
 *
 * @type {exports.WebService}
 */
var wsePhi = new cloudmine.WebService({
  apiroot:"https://rs.cloudmine.me",
  appname: "SnippetDemo",
  appversion: "1.0",
  appid: applicationID,
  apikey: ePhiAPIKey,
  applevel: false,
  snippet: 'userLogin',
  params: {
    dosage: '10mg',
    dob: '10/13/1984',
    method: 'oral tablet'
  }
});

// TODO: Wrap in a tap test to check for success criteria
wsePhi.login(userCredentials).on("success", function (data, response) {
  console.log(JSON.stringify(data, null, 2));
}).on("error", function (err) {
  console.log(JSON.stringify(err, null, 2));
});




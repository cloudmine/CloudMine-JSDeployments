/**
 * Created by ryandonahue on 3/6/15.
 */
/**
 * Created by Ryan Donahue.
 *
 * This sample shows a few different things regarding snippet execution
 * alongside user creation. On user creation a a snippet is configured
 * to run which will login the current user and initialize some objects
 * specific to the user and expected by the application within the same
 * call. The API call returns the result of both the user creation call
 * and the snippet call with only one trip to the server. The snippet
 * being run is titled userInitilization.js and located within the
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
 * node userCreationWithSnippet.js
 *
 * You will see the snippet execute with the creation of the user as specified
 * from the command line and an object for that user created. The return value
 * is checked to ensure the complete flow was successful.
 *
 * Feel free to login to the CloudMine dashboard with your developer credentials
 * and navigate to the application and object browser. If you login as the user
 * specified in this script and inspect the "User Data" tab, the created user
 * object will be visible.
 */
var cloudmine = require('cloudmine');

// environment variables for running this snippet... adjust as necessary
var applicationID = '';
var piiAPIKey = '';

/**
 * a test user we will use for this workflow
 * Note that a create command for a user which already exists will return an
 * error dictating that the user already exists. The snippet will still run
 * so in a production environment the snippet should handle the case where a
 * user already exists and not re-initialize the user.
 */
var userCredentials = {
  username: 'testuser',
  email: 'testuser@cloudmine.me',
  password: 'testuser'
};

/**
 * CloudMine SDK for working with PII data includes the snippet name and
 * parameters for executing the call w/ snippet run. This particular
 * call is on the RackSpace infrastructure and thus the {apiroot} specifies
 * this. If not specified the default root is the global CloudMine
 * environment. Check your specific implementation details to know if a
 * specific route needs to be used.
 *
 * @type {exports.WebService}
 */
var wsPII = new cloudmine.WebService({
  apiroot: "https://rs.cloudmine.me",
  appname: "SnippetDemo",
  appversion: "1.0",
  appid: applicationID,
  apikey: piiAPIKey,
  applevel: false,
  snippet: 'userCreation',
  results_only: false,
  params: {
    firstName: 'Test',
    lastName: 'User',
    dob: '10/13/1984',
    credentials: userCredentials
  }
});

/**
 * Since this is intended  as a point of reference the first call is to delete the user
 * so it can be run over and over. When actually implementing ignore this call as a user
 * registering with an email that has an existing user should be handled in a way specific
 * to the application. Typically this means forwarding the user to a password reset form
 * along with the messaging that the user exists.
 */
wsPII.deleteUser(userCredentials).on("success", function (data, response) {
  console.log(JSON.stringify(data, null, 2));
  createUser();
}).on("error", function (err) {
  console.log(JSON.stringify(err, null, 2));
  createUser();
});

/**
 * Here is the function which actually creates the test user which is the case specific to
 * the example. Note that the snippet name is on the web service object {wsPII} specifies
 * the
 */
function createUser() {
  wsPII.createUser(userCredentials).on("success", function (data, response) {
    // inject responses in to credentials object
    userCredentials.wsPII = wsPII;
    // check values from create and the snippet run and then delete the user
  }).on("error", function (err) {
    console.log(JSON.stringify(err, null, 2));
  });
}





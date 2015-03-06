// third party node dependencies reference:
// https://cloudmine.me/docs/servercode/javascript#js_api
var cloudmine = require('cloudmine');
var twilio = require('twilio');

// environment variables generated on render and deploy from config.js
var applicationID = "<%= appId %>";
var piiAPIKey = "<%= piiKey %>";
var ePhiAPIKey = "<%= ePhiKey %>";
var twilioConf = "<%= twilioConf %>";

// CloudMine SDK for working with PII data
var wsPII = new cloudmine.WebService({
  appname: "SnippetDemo",
  appversion: "1.0",
  appid: applicationID,
  apikey: piiAPIKey,
  applevel: false,
  session_token: ''
});
// CloudMine SDK for working with ePHI data
var wsPHI = new cloudmine.WebService({
  appname: "SnippetDemo",
  appversion: "1.0",
  appid: applicationID,
  apikey: ePhiAPIKey,
  applevel: false
});

// shim exit() function
if (typeof(exit) === 'undefined') {
  var data;

  // stub of the desired input for testing
  data = {
    params: {
      body: 'Hello World',
      patientID: 'GSHWO254jfo2jopfFhs',
      criteriaCode: "HighBloodPressure",
      somePHIObject: { sensitive: 'data'}
    },
    session_token: "efwiafhweoif"
  };

  var exit = function (result) {
    console.log(JSON.stringify({result: result}));
    exit(result);
  };
}

wsPII.session_token = data.session_token;

wsPII.search('[__class__= "PII"', {}).on("success", function (data, response) {
  // twilio constants
  var accountSid = twilioConf.accountSid;
  var authToken = twilioConf.authToken;
  var client = new twilio.RestClient(accountSid, authToken);
// send an sms message through twilio library
  client.messages.create({
    to: data.PhoneNumber,
    from: 'TWILIO_NUMBER',
    body: data.params.body
  }, function (error) {
    if (error) {
      exit(error);
    } else {
      exit("Success!");
    }
  });
}).on("error", function (data, response) {
  exit("FAIL");
});


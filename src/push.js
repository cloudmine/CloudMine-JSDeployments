// third party node dependencies reference:
// https://cloudmine.me/docs/servercode/javascript#js_api
var cloudmine = require('cloudmine');

// environment variables generated on render and deploy from config.js
var applicationID = "<%= appId %>";
var piiAPIKey = "<%= piiKey %>";
var ePhiAPIKey = "<%= ePhiKey %>";

// CloudMine SDK for working with PII data
var wsPII = new cloudmine.WebService({
  appname: "SnippetDemo",
  appversion: "1.0",
  appid: applicationID,
  apikey: piiAPIKey,
  applevel: false
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
      text: "Thanks for subscribing to our push notifications."
    }
  };

  var exit = function (result) {
    console.log(JSON.stringify({result: result}));
    process.exit();
  };
}

// make any calls needed to arrive at this list
var notification = {       // the message to send
  channel: "Channel Name", // channel to push to
  users: [                 // list of specific users
    "4d81718682b64e42a39b6c6606397821",
    { email: "user@example.com" },
    { username: "username" }
  ],
  device_ids: [            // list of specific device ids
    "af335982e1cb4db59467735628ed0e8d",
    "9d6773870c0d41fd91e28def2b36adbe",
    "db14b23789e6404a9a739f2f930547e1"
  ],
  badge: 3,                // badge to display in app icon (iOS only)
  sound: "sound1.aiff",    // sound to play (iOS only)
  payload: {               // a place to include extra data (iOS only)
    "specialid": 15732,
    "specialshape": {
      "moredata": "data",
      "moredataid": 432,
      "action": "route_to_account_info"
    }
  }
};

notification.text = data.params.text;

ws.pushNotification(notification).on('success', function (data, response) {
  exit('success');
}).on('error', function (data, response) {
  exit('error');
});
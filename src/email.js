// third party node dependencies reference:
// https://cloudmine.me/docs/servercode/javascript#js_api
var cloudmine = require('cloudmine');
var Q = require('q');
var rest = require('restler');

// environment variables generated on render and deploy from config.js
var applicationID = "<%= appId %>";
var piiAPIKey = "<%= piiKey %>";
var ePhiAPIKey = "<%= ePhiKey %>";

// CloudMine SDK for working with PII data
var wsPII = new cloudmine.WebService({
  appname: "FirstApp",
  appversion: "1.0",
  appid: applicationID,
  apikey: piiAPIKey,
  applevel: false
});
// CloudMine SDK for working with ePHI data
var wsPHI = new cloudmine.WebService({
  appname: "FirstApp",
  appversion: "1.0",
  appid: applicationID,
  apikey: ePhiAPIKey,
  applevel: false
});

// mailgun configuration comes from deploy script
var mailgun = {
  url: '<%= mailgun.url %>',
  domain: '<%= mailgun.domain %>',
  privateKey: '<%= mailgun.privateKey %>',
  publicKey: '<%= mailgun.publicKey %>'
};

if (typeof exit != 'function') {
  // test env
  var exit = function (result) {
    console.log(JSON.stringify({result: result}));
  };

  data = {
    params: {
      email: 'ryan@cloudmine.me',
      protocol: 'proto'
    }
  };
}

var emailTemplate = {
  subject: 'App Verification',
  template: 'Hi!<br /><br />Thanks for registering<br /><br />Verify ({{ protocol }}://?pin={{ pin }})<br /><br />Or enter this pin into the app - Pin: {{ pin }}<br /><br />Thank you!<br />'
};

var interpolateTemplate = function (templateString, valueMap) {
  var interpolateRe = /\{\{(.+?)\}\}/g;

  return templateString.replace(interpolateRe, function (stringToReplace, variableName) {
    return valueMap[variableName.trim()] || '';
  });
};

var options = {
  to: data.params.email,
  from: null,
  subject: emailTemplate.subject,
  message: interpolateTemplate(emailTemplate.template, {
    pin: data.params.pin,
    protocol: data.params.protocol
  })
};

rest.post(mailgun.url + '/' + mailgun.domain + '/messages', {
  username: 'api',
  password: mailgun.privateKey,
  data: {
    from: options.from,
    to: options.to,
    subject: options.subject,
    html: options.message
  }
}).on('success', function () {
  exit("Success!");
}).on('error', function (error) {
  exit({
    error: error
  });
}).on('fail', function (error) {
  exit({
    error: error
  });
});
/*

Sample configuration file to take a look at. Replace the
values with the specific app to be implemented.

 */

var mailgun = {
  privateKey: '',
  publicKey: '',
  url: 'https://api.mailgun.net/v2',
  domain: 'cloudmine.mailgun.org'
};

var twilioConf = {
  accountSid: '',
  authToken: ''
};

module.exports = {
  dev: {
    appId: '',
    apiKey: '',
    piiKey: '',
    ePhiKey: '',
    masterKey: '',
    platformUrl: 'https://api.rs.cloudmine.me',
    mailgun: mailgun,
    twilioConf: twilioConf,
    env: 'dev'
  },

  staging: {
    appId: '',
    apiKey: '',
    piiKey: '',
    ePhiKey: '',
    masterKey: '',
    platformUrl: 'https://api.rs.cloudmine.me',
    mailgun: mailgun,
    twilioConf: twilioConf,
    env: 'staging'
  },

  production: {
    appId: '',
    apiKey: '',
    piiKey: '',
    ePhiKey: '',
    masterKey: '',
    platformUrl: 'https://api.rs.cloudmine.me',
    mailgun: mailgun,
    twilioConf: twilioConf,
    env: 'production'
  }
};

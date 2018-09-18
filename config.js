/*

Sample configuration file to take a look at. Replace the
values with the specific app to be implemented.

 */

var thirdPartyConfig = {
  thirdPartyId: '',
  thirdPartyToken: ''
};

module.exports = {
  dev: {
    appId: '',
    apiKey: '',
    piiKey: '',
    ePhiKey: '',
    masterKey: '',
    platformUrl: 'https://api.cloudmine.io',
    thirdPartyConfig: thirdPartyConfig,
    env: 'dev'
  },

  staging: {
    appId: '',
    apiKey: '',
    piiKey: '',
    ePhiKey: '',
    masterKey: '',
    platformUrl: 'https://api.cloudmine.io',
    thirdPartyConfig: thirdPartyConfig,
    env: 'staging'
  },

  production: {
    appId: '',
    apiKey: '',
    piiKey: '',
    ePhiKey: '',
    masterKey: '',
    platformUrl: 'https://api.cloudmine.io',
    thirdPartyConfig: thirdPartyConfig,
    env: 'production'
  },

  testing:{
      appId: '',
      apiKey: '',
      piiKey: '',
      ePhiKey: '',
      masterKey: '',
      platformUrl: 'https://api.cloudmine.io',
      thirdPartyConfig: thirdPartyConfig,
      env: 'testing'
  }
};

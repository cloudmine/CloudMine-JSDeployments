/*

Sample configuration file to take a look at. Replace the
values with the specific app to be implemented.

 */

var thirdPartyConfig = {
  thirdPartyId: '1234567890',
  thirdPartyToken: 'abcdefghijklm'
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
      appId: '8b4e458e94dd43d080b64953d068afbd',
      apiKey: 'A030FC0120CD4D2C98A10861508CB54E',
      piiKey: '',
      ePhiKey: '',
      masterKey: 'A030FC0120CD4D2C98A10861508CB54E',
      platformUrl: 'https://api.cloudmine.io',
      thirdPartyConfig: thirdPartyConfig,
      env: 'testing'
    }
};

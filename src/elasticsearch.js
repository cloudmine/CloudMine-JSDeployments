/**
 * Created by ryandonahue on 4/13/16.
 *
 * This piece of Javascript assumes the CloudMine Javscript SDK is
 * installed via "npm install cloudmine". It is intended to be run in a
 * Javascript snippet on the CloudMine dashboard or locally. Default
 * values can be set below in the case of local testing. An Elasticsearch
 * query is run on the "V2" api endpoint as opposed to the normal search
 * methodology which uses the Cloudmine query syntax and doesn't leverage
 * Elasticsearch by default.
 *
 * For local testing I comment out the module exports and run this file
 * directly with node ie.: node elasticsearch.js
 */
'use strict';
var cm = require('cloudmine');

// data needed to instantiate the cloudmine web service and query execution
var app_id, api_key, query, user_id, session_token = null;

module.exports = function (request, reply) {

  /*
  This if/else is merely here as convenience when testing locally. Prior
  defined variables are assigned from the request input or assigned manually
  if the environment isn't a CloudMine code running server.
   */
  if (process.env.CLOUDMINE) {
    app_id = request.payload.session.app_id;
    api_key = request.payload.session.api_key;
    query = request.payload.params;
    user_id = request.payload.session.user_id;
    session_token = request.payload.session.session_token;
  } else {
    // assign with your appid and apikey
    app_id = '';
    api_key = '';
    /*
     Query should conform to compound queries and gets run as _search not _msearch.
     Currently aggregates aren't supported but coming soon. Note the term search! By
     default every field is indexed analyzed and also in the raw format. For pure
     equivalence, append ".raw" to the field search. Otherwise results coming back
     will be weighted on the n-gram analyzer and results may not be what is expected.
     Index mappings can be changed to something more targeted and concise to a use
     case. Please contact support@cloudmine.me for mapping options and scheduling
     index rebuilds without downtime.
     */
    query = {"query": {"bool": {"must": [{"term": {"experimentData.experimentId.raw": "Experiment Sam"}}]}}};
    user_id = '';
    session_token = '';
  }

  var ws = null;
  // check if the token is null as an indicator of user level
  if (session_token !== null) {
    ws = new cm.WebService({
      appid: app_id,
      apikey: api_key,
      version: 'v2',
      user_id: user_id,
      session_token: session_token
    });
  } else {
    ws = new cm.WebService({
      appid: app_id,
      apikey: api_key,
      version: 'v2'
    });
  }

  var apicall = ws.api("elasticsearch", {method: "POST"}, query)
    .on("success", function (response) {
      //console.log(response);
      // reply is not valid running locally. use console log
      reply(response);
    })
    .on("error", function (response, error) {
      //console.log(response);
      // reply is not valid running locally. use console log
      reply({"error": error, "response": response, "call": apicall});
    });
};

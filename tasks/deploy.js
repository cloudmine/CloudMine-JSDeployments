var rest = require('restler');
var fs = require('fs');
var glob = require('glob');
var Q = require('q');
var grunt = require('grunt');
var _ = require('underscore');

function getSnippets(options) {
  var deferred = Q.defer();

  rest.get(options.platformUrl + '/admin/app/' + options.appId + '/code', {
    headers: {
      'X-CloudMine-ApiKey': options.masterKey
    }
  }).on('complete', function (result) {
    if (result instanceof Error) {
      deferred.reject(result);
    } else {
      deferred.resolve(result);
    }
  });

  return deferred.promise;
}

function getLocalSnippets(target) {
  var filesToSkip = ['Gruntfile.js'];
  var filePaths = glob.sync('bin/' + target + '/*.js').filter(function (filePath) {
    return filesToSkip.indexOf(filePath) < 0;
  });

  return filePaths.map(function (filePath) {
    var fileName = filePath.match(/((?:[a-zA-Z0-9\-_.$]+))\.js$/)[1];
    return {
      name: fileName,
      code: fs.readFileSync(filePath).toString()
    };
  });
}

function getSnippetOperations(localSnippets, remoteSnippets) {
  var remoteSnippetNameMap = _.indexBy(remoteSnippets, 'name');

  var toUpdate = _.filter(localSnippets, function (snippet) {
    return snippet.name in remoteSnippetNameMap;
  }).map(function (snippet) {
    snippet.id = remoteSnippetNameMap[snippet.name].id;
    return snippet;
  });

  var toCreate = _.reject(localSnippets, function (snippet) {
    return snippet.name in remoteSnippetNameMap;
  })

  return {
    create: toCreate,
    update: toUpdate
  };
}

function performSnippetOperations(options, snippetOperations) {
  var deferred = Q.defer();

  Q.all([
    Q.all(snippetOperations.create.map(createSnippet.bind(this, options))),
    Q.all(snippetOperations.update.map(updateSnippet.bind(this, options)))
  ]).spread(function (created, updated) {
    deferred.resolve({
      created: created,
      updated: updated
    });
  }).fail(deferred.reject)
    .done();

  return deferred.promise;
}

function createSnippet(options, snippet) {
  var deferred = Q.defer();

  rest.post(options.platformUrl + '/admin/app/' + options.appId + '/code', {
    headers: {
      'X-CloudMine-ApiKey': options.masterKey
    },
    data: {
      name: snippet.name,
      id: '',
      code: snippet.code
    }
  }).on('complete', function (result) {
    if (result instanceof Error) {
      deferred.reject(result);
    } else {
      deferred.resolve(snippet);
    }
  });

  return deferred.promise;
}

function updateSnippet(options, snippet) {
  var deferred = Q.defer();

  rest.put(options.platformUrl + '/admin/app/' + options.appId + '/code/' + snippet.id, {
    headers: {
      'X-CloudMine-ApiKey': options.masterKey
    },
    data: {
      name: snippet.name,
      id: snippet.id,
      code: snippet.code
    }
  }).on('complete', function (result) {
    if (result instanceof Error) {
      deferred.reject(result);
    } else {
      deferred.resolve(snippet);
    }
  });

  return deferred.promise;
}

module.exports = function (grunt) {
  grunt.registerMultiTask('deploy', 'Deploys snippets to an app', function () {
    var options = this.options({
      platformUrl: 'https://api.cloudmine.me'
    });

    var done = this.async();

    if (!options.appId) {
      grunt.log.error('Need appId to deploy');
      return false;
    }

    if (!options.masterKey) {
      grunt.log.error('Need masterKey to deploy');
      return false;
    }

    grunt.log.writeln('Deploying snippets...');

    function handleResults(results) {
      grunt.log.ok('Created the following snippets: ');
      results.created.forEach(function (snippet) {
        grunt.log.ok('  ' + snippet.name);
      });

      grunt.log.ok('Updated the following snippets: ');
      results.updated.forEach(function (snippet) {
        grunt.log.ok('-- ' + snippet.name + ' (' + snippet.id + ')');
      });
    }

    Q.all([
      getLocalSnippets(this.target),
      getSnippets(options)
    ]).spread(getSnippetOperations)
      .then(performSnippetOperations.bind(this, options))
      .then(handleResults)
      .fail(function (error) {
        grunt.log.error('Failed to deploy snippets!');
        grunt.log.error(error.stack);
      })
      .fin(done)
      .done();
  });
};

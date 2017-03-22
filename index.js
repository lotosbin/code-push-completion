#! /usr/bin/env node
var exec = require('child_process').exec;

// Ex. bin/ entry point for a "code-push" package
var tab = require('tabtab')({
    name: 'code-push'
});

// General handler. Gets called on `program <tab>` and `program stuff ... <tab>`
var cmds=[];
tab.on('code-push', function (data, done) {
    if(cmds.length)return done(null, cmds); 
    exec('code-push -h', function(err, stdout) {
    if (err) return done(err);
    var t = stdout.split(/\n/).slice(11,28);
    console.log(t);
    cmds = cmds.concat(t);
    return done(null, cmds);
  });
    // General handler
    // done(null, ['access-key', 'app', 'collaborator', 'debug', 'deployment', 'link', 'login', 'logout', 'patch', 'promote', 'register', 'release', 'release-cordova', 'release-react', 'rollback', 'session', 'whoami']);
});

// Specific handler. Gets called on `program list <tab>`
tab.on('app', function (data, done) {
    done(null, ['add', 'remove', 'rm', 'rename', 'list', 'ls', 'transfer']);
});
tab.start();
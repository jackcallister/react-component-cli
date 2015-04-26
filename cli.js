#!/usr/bin/env node
var program = require('commander');
var ncp = require('ncp').ncp;
var path = require('path');
var fs = require('fs');
var interpolate = require('es6-interpolate-stream');

function camelize(str) {
  return str.replace (/(?:^|[-_])(\w)/g, function (_, c) {
    return c ? c.toUpperCase () : '';
  });
};

program.version('0.0.1')
       .usage('<name>')
       .parse(process.argv);

if(!program.args.length) {
  program.help();
} else {
  var name = program.args;

  var downcaseName = name[0];
  var uppercaseName = camelize(downcaseName);

  var templateDir = __dirname + '/template';
  var targetDir = process.env.PWD + '/' + downcaseName;

  var context = {
    "componentDowncase": downcaseName,
    "componentUppercase": uppercaseName
  }

  function interpolateStream(read, write) {
    read.pipe(interpolate(context)).pipe(write);
  };

  ncp(templateDir, targetDir, {transform: interpolateStream}, function (err) {
   if (err) {
     return console.error(err);
   }
   console.log('done!');
  });
}

// def cp(src, dest, app_name)
//   if File.directory?(src)
//     Dir.mkdir(dest) unless Dir.exists?(dest)
//   else
//     content = File.read(src)
//       .gsub("SampleApp", app_name)
//       .gsub("Examples/#{app_name}/", "")
//       .gsub("../../Libraries/", "node_modules/react-native/Libraries/")
//       .gsub("../../React/", "node_modules/react-native/React/")
//     File.write(dest, content)
//   end
// end
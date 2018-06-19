module.exports = function (config) {
config.set({
basePath: '',
frameworks: ['jasmine', 'angular-cli'],
plugins: [
require('karma-jasmine'),
require('karma-chrome-launcher'),
require('karma-mocha-reporter'),
require('karma-jasmine-html-reporter'),
require('karma-htmlfile-reporter'),
require('angular-cli/plugins/karma')
],
files: [
{ pattern: './src/karma-test-shim.ts', watched: false },
],
preprocessors: {
'./src/karma-test-shim.ts': ['angular-cli'],
},
angularCli: {
config: './angular-cli.json',
environment: 'dev',
},
htmlReporter: {
outputFile: '_test-output/unit-tests/index.html',
pageTitle: 'Unit Tests',
subPageTitle: __dirname,
},
reporters: [
'mocha', 'html', 'kjhtml',
],
port: 9876,
colors: true,
logLevel: config.LOG_INFO,
autoWatch: true,
browsers: ['Chrome'],
singleRun: false,
mime: {
'text/x-typescript': ['ts','tsx'],
},
});
};
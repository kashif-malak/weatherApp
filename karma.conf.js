/// <reference path="app/weatherpage/forecast-filter.js" />

//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'bower_components/angular/angular.js',
     // 'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'bower_components/angular-resource/angular-resource.min.js',
      'bower_components/angular-animate/angular-animate.min.js',
      './app.js',
      'tests/**/*.js',
      'main/main.js',
      'services/*.js',
      'weatherpage/weather.state.js',
      'weatherpage/forecast-filter.js',
      'weatherpage/*.js'
   
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};

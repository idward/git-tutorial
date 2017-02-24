'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['inject'], function () {

  gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject-reload']);

  // gulp.watch([
  //   path.join(conf.paths.src, '/app/**/*.css'),
  //   path.join(conf.paths.src, '/app/**/*.scss')
  // ], function(event) {
  //   if(isOnlyChange(event)) {
  //     console.log('样式重载...');
  //     gulp.start('styles-reload');
  //   } else {
  //     console.log('注入重载...');
  //     gulp.start('inject-reload');
  //   }
  // });

  gulp.watch([
    path.join(conf.paths.src, '/app/**/*.css'),
    path.join(conf.paths.src, '/app/**/*.scss')
  ], ['styles-reload']);

  gulp.watch(path.join(conf.paths.src, '/app/**/*.js'), function(event) {
    if(isOnlyChange(event)) {
      console.log('样式重载...');
      gulp.start('scripts-reload');
    } else {
      console.log('注入重载...');
      gulp.start('inject-reload');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/app/**/*.html'), function(event) {
    console.log('html路径:' + event.path);
    browserSync.reload(event.path);
  });
});

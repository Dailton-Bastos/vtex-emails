const gulp = require('gulp');
const connect = require('gulp-connect');
const path = require('path');
const injectPartials = require('gulp-inject-partials');
const i18n = require('gulp-i18n-localize');
const hb = require('gulp-hb');
const data = require('gulp-data');
const gutil = require('gulp-util');
const juice = require('juice');
const del = require('del');
const stripComments = require('gulp-strip-comments');
const replace = require('gulp-replace');
const extReplace = require('gulp-ext-replace');
const formatHtml = require('gulp-format-html');

module.exports = {
  gulp,
  connect,
  path,
  injectPartials,
  i18n,
  hb,
  data,
  gutil,
  del,
  stripComments,
  replace,
  extReplace,
  juice,
  formatHtml,
};

const {
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
  extReplace,
  juice,
  formatHtml,
} = require('./require');

const orderJsonToRead = 'vtex';
const filesToWatch = ['src/templates/**/*'];

juice.codeBlocks.HBS = {};

// Partials
gulp.task('partials', (done) => {
  return gulp
    .src(path.resolve(__dirname, 'src', 'templates/*.hbs'))
    .pipe(injectPartials())
    .pipe(gulp.dest('./temp'))
    .on('end', done);
});

// i18n
gulp.task('i18n', (done) => {
  return gulp
    .src(['temp/*hbs'])
    .pipe(
      i18n({
        locales: ['pt-BR', 'en-US'],
        localeDir: 'src/locales',
        delimeters: ['((', '))'],
      })
    )
    .pipe(gulp.dest('temp'))
    .on('end', done);
});

// Compile HBS
gulp.task('hbs', (done) => {
  const hbStream = hb({ bustCache: true })
    .helpers(require('handlebars-helpers'))
    .helpers(path.resolve(__dirname, 'src', 'helpers', 'helpers.js'));

  return gulp
    .src('temp/*/*.hbs')
    .pipe(
      data((file) => {
        const regexUnix = /(temp\/)(\w|-)+(\/)((\w|-)+)(\.hbs)/g;

        const regexWindows = /(temp\\)(\w|-)+(\\)((\w|-)+)(\.hbs)/g;

        const isPathValid = regexUnix.test(file.path)
          ? regexUnix
          : regexWindows;

        return require(file.path.replace(
          isPathValid,
          'src/data/' + orderJsonToRead + '/$4.json'
        ));
      })
    )
    .pipe(hbStream)
    .pipe(gulp.dest('temp'))
    .on('end', done);
});

// Clean HTML
gulp.task('clean:html', (done) => {
  return gulp
    .src('temp/*/*.hbs')
    .pipe(
      stripComments({
        safe: true,
        trim: true,
      }).on('error', gutil.log)
    )
    .pipe(gulp.dest('temp'))
    .pipe(connect.reload())
    .on('end', done);
});

// Copy temp to public folder
gulp.task('copy-public', (done) => {
  return gulp
    .src(['temp/*/*.hbs'])
    .pipe(formatHtml())
    .pipe(extReplace('.html'))
    .pipe(gulp.dest('public'))
    .on('end', done);
});

// Copy temp to dist folder
gulp.task('copy-dist', (done) => {
  return gulp
    .src(['temp/*/*.hbs'])
    .pipe(formatHtml())
    .pipe(extReplace('.hbs'))
    .pipe(gulp.dest('dist'))
    .on('end', done);
});

// Clean temp folder
gulp.task('clean:temp', async (done) => {
  await del(['temp']);

  return done();
});

// Clean project folder
gulp.task('clean', async (done) => {
  await del('public/*');

  return done();
});

// Default
gulp.task(
  'default',
  gulp.series(['partials', 'i18n', 'hbs', 'copy-public', 'clean:temp'])
);

// Default preview
gulp.task(
  'preview',
  gulp.series(['partials', 'i18n', 'hbs', 'copy-public', 'clean:temp'])
);

// Build
gulp.task(
  'dist',
  gulp.series(['partials', 'i18n', 'clean:html', 'copy-dist', 'clean:temp'])
);

// Start server w/ live reload
gulp.task('start', (done) => {
  connect.server({
    port: 3000,
    root: 'public',
    livereload: true,
  });

  return done();
});

// Watch
gulp.task('watch', (done) => {
  gulp.watch(filesToWatch, gulp.series(['default']));

  return done();
});

// Development mode
gulp.task('dev', gulp.series(['default', gulp.parallel(['start', 'watch'])]));

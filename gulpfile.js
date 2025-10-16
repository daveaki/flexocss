/* Gulpfile (CommonJS) compatibile con del ESM */
const { series, src, dest, parallel } = require('gulp');
const sass    = require('gulp-sass')(require('sass'));
const concat  = require('gulp-concat');
const cssmin  = require('gulp-cssmin');
const rename  = require('gulp-rename');

const paths = {
  dev_scss: 'public_html/assets/dev/scss/',
  dist_css: 'public_html/assets/dist/css/',
};

/** Cleaners (usano import dinamico di del) */
async function cleanCssFlexo() {
  const { deleteAsync } = await import('del');
  return deleteAsync([ paths.dist_css + 'flexo.min.css' ]);
}

async function cleanCssDevBox() {
  const { deleteAsync } = await import('del');
  return deleteAsync([ paths.dist_css + 'devbox.min.css' ]);
}

/** Build CSS */
function cssFlexo() {
  return src([ paths.dev_scss + 'flexo.scss' ])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('flexo.css'))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths.dist_css));
}

function cssDevBox() {
  return src([ paths.dev_scss + 'devbox.scss' ])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('devbox.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths.dist_css));
}

/** Exports */
exports.cssFlexo  = series(cleanCssFlexo, parallel(cssFlexo));
exports.cssDevbox = series(cleanCssDevBox, parallel(cssDevBox));

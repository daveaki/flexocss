/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const 
{
      series,
      src,
      dest,
      watch,
      parallel
 
} = require('gulp');

const sass      = require('gulp-sass')(require('sass'));
const concat  = require('gulp-concat');
const cssmin  = require('gulp-cssmin');
const rename = require('gulp-rename');
const del       = require('del');

const paths  = 
{
      'dev_scss': 'public_html/assets/dev/scss/',
      'dist_css': 'public_html/assets/dist/css/',
};

function cleanCssFlexo()
{
    return del([paths.dist_css + "test.min.css",]);
}
function cssFlexo(done) 
{
    src([paths.dev_scss + 'flexo.scss']).pipe(sass()).pipe(concat('flexo.css')).pipe(cssmin()).pipe(rename({suffix: '.min'})).pipe(dest(paths.dist_css));
    done();
}
function cleanCssDevBox()
{
    return del([paths.dist_css + "test.min.css",]);
}
function cssDevBox(done) 
{
     src([paths.dev_scss + 'devbox.scss']).pipe(sass()).pipe(concat('devbox.css')).pipe(rename({suffix: '.min'})).pipe(dest(paths.dist_css));
    done();
}

exports.cssFlexo  = series(cleanCssFlexo, parallel(cssFlexo));
exports.cssDevbox  = series(cleanCssDevBox, parallel(cssDevBox));
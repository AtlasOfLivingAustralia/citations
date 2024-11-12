var gulp = require('gulp'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    fs = require('fs'),
    buildvars = require('./buildvars.js');

const {src, dest, series, parallel} = gulp;

var paths = {
    html: {
        src: ['source/html/index-2019.html'],
        dest: 'build/'
    }
};


function generateHTMLPage(cb) {
    var citationsHead = fs.readFileSync('source/html/citations-head.html');
    var mainData = fs.readFileSync('source/html/main.html');
    src(paths.html.src)
        .pipe(replace('CITATIONS_HEAD_HERE', citationsHead))
        .pipe(replace('MAIN_HERE', mainData))
        .pipe(replace(/::loginStatus::/g, 'signedOut'))
        .pipe(replace(/::loginURL::/g, 'https://auth.ala.org.au/cas/login'))
        .pipe(replace(/::logoutURL::/g, 'https://auth.ala.org.au/cas/logout'))
        .pipe(replace(/==homeDomain==/g, buildvars.homeDomain))
        .pipe(replace(/==signUpURL==/g, buildvars.signUpURL))
        .pipe(replace(/==profileURL==/g, buildvars.profileURL))
        .pipe(replace(/==fathomID==/g, buildvars.fathomID))
        .pipe(rename('index.html'))
        .pipe(dest(paths.html.dest));
    cb();
};

var build = parallel(generateHTMLPage);

exports.default = build;
exports.generateHTMLPage = generateHTMLPage;
exports.build = build;

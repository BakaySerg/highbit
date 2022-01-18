const   gulp        = require('gulp'),
		sourcemaps 	  = require('gulp-sourcemaps'),
		// wait 			  = require('gulp-wait'),
		sass          = require('gulp-sass')(require('sass')),
		browserSync   = require('browser-sync'),
		// concat        = require('gulp-concat'),
		// uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		fileinclude   = require('gulp-file-include'),
		// rigger        = require('gulp-rigger'),
		notify        = require('gulp-notify');

gulp.task('browser-sync', function() {
	browserSync({
		server: {baseDir: 'app'},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});


// gulp.task('layout', function () {
//    return gulp.src('src/*.html')
//    .pipe(rigger())
//    .pipe(gulp.dest('app/'))
//    .pipe(browserSync.reload({ stream: true }))
// });
gulp.task('layout', function() {
    return gulp.src('src/*.html')
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('app/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('styles', function() {
	return gulp.src('src/scss/**/*.scss')
	// return gulp.src('src/scss/*.scss')
	// .pipe(wait(200))
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	// .pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(cleancss( {level: { 1: { specialComments: 0 }}})) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./app/css/'))
	.pipe(browserSync.reload({ stream: true }));
});
// gulp.task('styles-separated', function() {
// 	return gulp.src('src/scss/pages/*.scss')   	//pages
// 	.pipe(sourcemaps.init({loadMaps: true}))
// 	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
// 	.pipe(rename({ suffix: '.min', prefix : '' }))
// 	.pipe(cleancss( {level: { 1: { specialComments: 0 }}})) // Opt., comment out when debugging
// 	.pipe(gulp.dest('app/css'))
// 	.pipe(sourcemaps.write('./'))
// 	.pipe(gulp.dest('./app/css/'))
// 	.pipe(browserSync.reload({ stream: true }));
// });

gulp.task('scripts', function() {
	return gulp.src([
		'src/js/*.js', // Always (scripts) at the end
		])
	// .pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Minify js - opt.
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});


gulp.task('watch', function() {
	gulp.watch('src/scss/**/*.scss', gulp.parallel('styles'));  // 2nd argument if drive is not SSD - { delay: 350 }
	// gulp.watch('src/scss/**/*.scss', gulp.parallel('styles-separated'));
	gulp.watch(['src/**/*.js', 'src/js/main.js'], gulp.parallel('scripts'));
	gulp.watch('src/**/*.html', gulp.parallel('layout'))
});
gulp.task('default', gulp.parallel('layout','styles', 'scripts', 'browser-sync', 'watch'));
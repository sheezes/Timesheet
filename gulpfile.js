var gulp = require('gulp');
var babel = require('gulp-babel');
var less = require('gulp-less');

var config = {
	dev: {
		mainFolder: 'src',
		jsFolder: 'src/js',
		lessFolder: 'src/less'
	},
	
	dist: {
		mainFolder: 'dist',
		jsFolder: 'dist/js',
		cssFolder: 'dist/css'	
	}
};

gulp.task('default', ['es2015', 'less', 'html','json'], function() {
	console.log('Compiling done.');
});


gulp.task('es2015', function() {

	return gulp.src(config.dev.mainFolder + '/**/*.js')
		.pipe(babel({ presets: ['es2015'] }))
		.pipe(gulp.dest(config.dist.mainFolder));

});


gulp.task('less', function () {
  return gulp.src(config.dev.mainFolder + '/**/*.less')
    .pipe(less())
    .pipe(gulp.dest(config.dist.mainFolder));
});


gulp.task('html', function () {
  return gulp.src(config.dev.mainFolder + '/**/*.html')
    .pipe(gulp.dest(config.dist.mainFolder));
});

gulp.task('json', function () {
  return gulp.src(config.dev.mainFolder + '/**/*.json')
    .pipe(gulp.dest(config.dist.mainFolder));
});


gulp.task('watch', function() {
        
    setTimeout(function() { 
    	console.log('Watching...');
    }, 1000);

    gulp.watch(config.dev.mainFolder + '/**/*.js' , ['es2015']);
    gulp.watch(config.dev.mainFolder + '/**/*.less' , ['less']);
    gulp.watch(config.dev.mainFolder + '/**/*.html', ['html']);
    gulp.watch(config.dev.mainFolder + '/**/*.json', ['json']);

});
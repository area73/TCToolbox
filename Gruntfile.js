module.exports = function (grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sprockets-directives');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-sass');
    grunt.initConfig({
        sass: {
            styles: {
                cwd: 'src/',
                src: ['*.scss'],
                expand: true,
                dest: 'dist/',
                ext: '.css'
            }
        },
        directives: {
            scripts: {
                cwd: 'src/',
                src: ['*.js'],
                expand: true,
                dest: 'dist/'
            }
        },
        watch: {
            options: { spawn: false },
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['build:scripts']
            },
            styles: {
                files: ['src/**/*.scss'],
                tasks: ['build:styles']
            },
            test: {
                files: ['test/**/*.js'],
                tasks: ['test']
            }
        },
        jshint: { scripts: ['src/**/*.js'] },
        jasmine: {
            specs: {
                src: 'dist/**/*.js',
                options: {
                    keepRunner: true,
                    specs: 'test/specs/*.spec.js',
                    vendor: [
                        "bower_components/jquery/dist/jquery.js",
                        "bower_components/underscore/underscore.js"
                    ],
                    helpers: ["test/helpers/*.js",
                              "bower_components/jasmine-jquery/lib/jasmine-jquery.js"],
                    styles:["dist/Collapsable.css"]
                }
            }
        },
        autoprefixer: {
            styles: {
                expand: true,
                flatten: true,
                cwd: 'dist/',
                src: '**/*.css',
                dest: 'dist/'
            }
        },
        jsdoc: {
            dist: {
                src: ['src/*.js'],
                options: { destination: 'docs' }
            }
        }
    });
    grunt.registerTask('build', [
        'build:styles',
        'build:scripts'
    ]);
    grunt.registerTask('build:styles', [
        'sass',
        'autoprefixer'
    ]);
    grunt.registerTask('build:scripts', [
        'jshint',
        'directives'
    ]);
    grunt.registerTask('test', [
        'build:scripts',
        'jasmine'
    ]);
    grunt.registerTask('docs', [
        'jshint',
        'jsdoc'
    ]);
    grunt.registerTask('default', [
        'build',
        'watch'
    ]);
};
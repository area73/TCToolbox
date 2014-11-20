module.exports = function (grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sprockets-directives');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
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
        jshint: { 
            options:{
                debug: true
            },
            scripts: ['src/**/*.js']
        },
        jasmine: {
            specs: {
                src: 'dist/**/*.js',
                options: {
                    keepRunner: true,
                    specs: 'test/specs/*.spec.js',
                    vendor: [],
                    helpers: ['test/helpers/*.js']
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
        },
        copy:{
            images:{
                files:[
                    {expand: true, cwd: 'src/images', src: ['**/*.png'], dest: 'dist/images'},
                ]    
            },
            scss:{
                files: [
                    {src: "src/_RaterMixins.css.scss", dest: "dist/_RaterMixins.css.scss"}
                ]
            }            
        }
    });
    grunt.registerTask('build', [
        'build:styles',
        'build:scripts',
        'copy'
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
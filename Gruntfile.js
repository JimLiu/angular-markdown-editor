'use strict';
module.exports = function (grunt) {

    // load all grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    var mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    var cfg = {
        srcDir: 'src',
        buildDir: 'dist',
        demoDir: 'demo'
    };

    // project configuration
    grunt.initConfig({
        cfg: cfg,
        
        // watch
        watch: {
            sass: {
                files: ['<%= cfg.srcDir %>/sass/**/*'],
                tasks: ['sass', 'copy']
            },
            livereload: {
                files: [
                    '<%= cfg.demoDir %>/**/*.css',
                    '<%= cfg.demoDir %>/**/*.js',
                    '<%= cfg.demoDir %>/**/*.html'
                ],
                options: {
                    livereload: 23618
                }
            },
            build: {
                files: [
                    '<%= cfg.srcDir %>/**/*.js'
                ],
                tasks: ['jshint:source', 'clean:build', 'concat:build', 'sass', 'uglify:build', 'copy']
            }
        },

        // jshint
        jshint: {
            options: {
                'jshintrc': true,
                reporter: require('jshint-stylish')
            },
            source: {
                files: {
                    src: ['<%= cfg.srcDir %>/**/*.js']
                }
            },
            demo: {
                files: {
                    src: [
                        '<%= cfg.demoDir %>/**/*.js',
                        '!<%= cfg.demoDir %>/bower_components/**/*'
                    ]
                }
            }
        },

        // ### Config for grunt-contrib-clean
        // Clean up files as part of other tasks
        clean: {
            build: {
                src: ['<%= cfg.buildDir %>/**']
            },
            demo: {
                src: ['<%= cfg.demoDir %>/dist/**']
            }
        },

        // ### Config for grunt-contrib-copy
        // Prepare files for demo
        copy: {
            demo: {
                files: [{
                    expand: true,
                    src: ['<%= cfg.buildDir %>/**'],
                    dest: '<%= cfg.demoDir %>/'
                }]
            }
        },


        // concat
        concat: {
            build: {
                src: [
                    '<%= cfg.srcDir %>/main.js',
                    '<%= cfg.srcDir %>/helper.js',
                    '<%= cfg.srcDir %>/shortcuts.js',
                    '<%= cfg.srcDir %>/markdown-actions.js',
                    '<%= cfg.srcDir %>/editor.js',
                    '<%= cfg.srcDir %>/preview.js'
                ],
                dest: '<%= cfg.buildDir %>/angular-markdown-editor.js'
            }
        },
        // ### Config for grunt-contrib-sass
        // Compile all the SASS!
        sass: {
            dev: {
                files: {
                    '<%= cfg.buildDir %>/angular-markdown-editor.css': '<%= cfg.srcDir %>/sass/editor.scss'
                }
            },
            compress: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= cfg.buildDir %>/angular-markdown-editor.min.css': '<%= cfg.srcDir %>/sass/editor.scss'
                }
            }
        },
        // uglify
        uglify: {
            options: {
                preserveComments: 'some',
                mangle: false
            },
            build: {
                files: {
                    '<%= cfg.buildDir %>/angular-markdown-editor.min.js': ['<%= cfg.buildDir %>/angular-markdown-editor.js']
                }
            }
        },

        // connect
        connect: {
            options: {
                port: 8080,
                livereload: 23618,
                hostname: '0.0.0.0'
            },
            demo: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '')
                        ];
                    }
                }
            }
        },

        // open
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>/<%= cfg.demoDir %>/simple_editor.html'
            }
        },


        bower: {
          install: {
            options: {
              copy: false
            }
          }
        },

        // karma
        karma: {
            options: {
                configFile: 'karma.conf.js',
                autoWatch: true
            },

            single: {
                singleRun: true
            },

            continuous: {
                singleRun: false
            }
        }
    });

    // default
    grunt.registerTask('default', ['webserver']);
    grunt.registerTask('build', ['bower', 'jshint:source', 'clean:build', 'concat:build', 'uglify:build', 'sass', 'copy']);
    grunt.registerTask('webserver', ['build', 'open', 'connect:demo', 'watch']);
    grunt.registerTask('test', ['karma:single']);
    grunt.registerTask('test:continuous', ['karma:continuous']);
};

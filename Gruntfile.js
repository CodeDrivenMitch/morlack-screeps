var Settings = require('./settings');

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        screeps: {
            options: {
                email: Settings.email,
                password: Settings.password,
                branch: Settings.branch,
                ptr: false
            },
            dist: {
                src: ['dist/*.js']
            }
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['es2016']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['*.js'],
                        dest: 'dist/'
                    }
                ]
            }
        },

        clean: ['dist/*']
    });

    grunt.registerTask('default', ['clean', 'babel', 'screeps']);
};
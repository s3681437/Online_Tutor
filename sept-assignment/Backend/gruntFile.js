module.exports = function(grunt){
    grunt.initConfig({
        concat: {
          dist: {
            src: ['test/service.js', 'test/booking.js', 'test/tutor.js'],
            dest: 'build/test-script.js',
          },
        },
        watch: {
            scripts: {
              files: ['test/*.js'],
              tasks: ['concat']
            },
          },

          uglify: {
            build: {
              files:[ {
                dest: 'dest/backend.min.js',
                src: './server.js'
              }]
            }
          }

      });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');




}
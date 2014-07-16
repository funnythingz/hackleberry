module.exports = (grunt)->

  require('load-grunt-tasks')(grunt)

  grunt.registerTask('default', ['typescript', 'uglify', 'clean', 'compass'])
  grunt.registerTask('server', ['connect'])

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')

    uglify:
      hackleberry:
        files: 'public/js/hackleberry.min.js': ['public/js/hackleberry.js']

    typescript:
      base:
        src: ['src/**/*.ts']
        dest: 'public/js/hackleberry.js'

    compass:
      dist:
        options:
          config: 'config.rb'

    watch:
      ts:
        files: ['src/**/*.ts']
        tasks: ['typescript', 'uglify', 'clean']
        options:
          atBegin: true

      css:
        files: ['sass/**/*.scss']
        tasks: ['compass']
        options:
          atBegin: true

    clean: ['src/**/*.js']

    connect:
      server:
        options:
          port: 8000
          base: 'public'
          keepalive: true

  })

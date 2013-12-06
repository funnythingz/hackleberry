module.exports = (grunt)->
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')

    uglify:
      hackleberry:
        files: 'public/js/hackleberry.min.js': ['public/js/hackleberry.js']

    concat:
      #dist:
      #  src: ['src/**/*.js']
      #  dest: 'public/js/hackleberry.js'

      hackleberry:
        src: ['src/hackleberry/*.js']
        dest: 'public/js/hackleberry.js'

      options:
        separator: ';'

    ts:
      base:
        src: ['src/**/*.ts']
        options:
          sourceMap: false

    compass:
      dist:
        options:
          config: 'config.rb'

    watch:
      ts:
        files: ['src/**/*.ts']
        tasks: ['ts', 'concat', 'uglify', 'clean']
        options:
          atBegin: true

      css:
        files: ['sass/**/*.scss']
        tasks: ['compass']
        options:
          atBegin: true

    clean: ['src/**/*.js', 'tscommand.tmp.txt']

    connect:
      server:
        options:
          port: 8000
          base: 'public'
          keepalive: true

  })

  grunt.loadNpmTasks('grunt-contrib-compass')
  grunt.loadNpmTasks('grunt-ts')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-clean')

  grunt.registerTask('default', ['ts', 'concat', 'uglify', 'clean', 'compass'])
  grunt.registerTask('server', ['connect'])

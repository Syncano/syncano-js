module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: "\n\n",
		banner: '/*\n<%= pkg.name.replace(".js", "") %>\nver: <%= pkg.version %>\nbuild date: <%= grunt.template.today("dd-mm-yyyy") %>\nCopyright 2014 Syncano Inc.\n*/\n'
      },
      dist: {
        src: [
          'src/_intro.js',
    		  'src/tools.js',
    		  'src/pubsub.js',
    		  'src/projects.js',
    		  'src/collections.js',
    		  'src/folders.js',
    		  'src/data.js',
          'src/bigdata.js',
          'src/tree.js',
    		  'src/user.js',
    		  'src/subscriptions.js',
    		  'src/connections.js',
    		  'src/notifications.js',
          'src/main.js',
          'src/_outro.js'
        ],
        dest: 'dist/<%= pkg.name.replace(".js", "") %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*\n<%= pkg.name.replace(".js", "") %>\nver: <%= pkg.version %>\nbuild date: <%= grunt.template.today("dd-mm-yyyy") %>\nCopyright 2014 Syncano Inc.\n*/\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name.replace(".js", "") %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    qunit: {
      files: ['test/*.html']
    },
	
	yuidoc: {
		all: {
			name: '<%= pkg.name %>',
			description: '<%= pkg.description %>',
			version: '<%= pkg.version %>',
			url: '<%= pkg.homepage %>',
			options: {
				linkNatives: true,
				paths: ['dist'],
				outdir: './docs/'
			}		}
	},

    jshint: {
      files: ['dist/syncano.js'],
      options: {
        globals: {
          console: true,
          module: true,
          document: true
        },
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['concat', 'jshint', 'qunit']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks("grunt-contrib-yuidoc");

  grunt.registerTask('check', ['concat', 'jshint']);
  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('default', ['concat', 'jshint', 'uglify', 'docs']);
  grunt.registerTask("docs", ["yuidoc"]);

};

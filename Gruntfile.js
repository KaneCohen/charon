module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			target: {
				files: {
					'lib/charon.min.js': 'lib/charon.js'
				},
				options: {
					mangle: true,
					compress: {
						dead_code: false
					},
					output: {
						ascii_only: true
					},
					report: 'min',
					preserveComments: 'some'
				}
			}
		},
		nodeunit: {
			all: ['test/charon/**/*.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.registerTask('test', ['test:node']);
	grunt.registerTask('test:node', ['nodeunit']);
	grunt.registerTask('compact', ['uglify']);
	grunt.registerTask('release', ['nodeunit', 'uglify']);
};
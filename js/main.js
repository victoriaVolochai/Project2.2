
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
	},
	paths: {
		jquery: 'lib/jquery/jquery-1.12.0',
		underscore: 'lib/underscore/underscore-1.8.3',
		backbone: 'lib/backbone/backbone-1.2.3-min',
		backboneLocalstorage: 'lib/backbone-localstorage/backbone.localStorage',
		
	}
});

require([
	'backbone',
	'collections/rows',
	'views/rows'
], function (Backbone, rowsCollection, RowsView) {
	new RowsView({
	collection: rowsCollection});
});



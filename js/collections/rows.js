define([
	'underscore',
	'backbone',
	'models/row'
], function (_, Backbone, RowModel) {

	'use strict';
	
	var RowsCollection=Backbone.Collection.extend({
		model: RowModel,
		initialize: function(){
			this.on('change:total destroy', this.countTotals);
		},
  		countTotals: function(){
  			var totals=0;
  			this.each(function(model){
  			totals+=model.get('total');
  			totals=Math.round(totals * 100)/100;
  			});
  			this.trigger("updateTotals", totals);
  		}
	});
	return new RowsCollection();
});
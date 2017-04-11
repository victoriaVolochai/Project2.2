define([
	'jquery',
	'underscore',
	'backbone',
	'models/row',
	'views/row'
], function ($, _, Backbone, RowModel, RowView ) {
	'use strict';


var RowsView=Backbone.View.extend({
	el: 'table',
	initialize:function(){
		this.listenTo(this.collection, 'updateTotals', this.renderTotals);
	},
	events : {
	'click #addRow': 'addRow'
	},
	addRow: function(){
	var row= new RowModel();
	this.collection.add(row);
	var rowView= new RowView ({ model: row});
		this.$el.children().children().last().before(rowView.render().el);
	},
	renderTotals:function(totals) {
	this.$el.find('#totals').text('$'+ totals);
	}
	});
	return RowsView;
});
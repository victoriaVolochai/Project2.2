define([
	'jquery',
	'underscore',
	'backbone',	
], function ($, _, Backbone) {
	'use strict';

var RowView = Backbone.View.extend({
	tagName:'tr',
	initialize: function(){
		this.listenTo(this.model, 'change:total', this.renderTotal);
		this.listenTo(this.model, 'destroy', this.removeRow);
	},
	events: {
	'input input[type="number"]' : 'setValue',
	'blur input' : 'setValue',
	'click .removeRow': 'destroy'
	}, 
	render: function() {
		this.$el.html( '<td class="col-sm-5"> <input type="text"  name="name"><br> <span class="error"></span> </td> <td class="col-sm-3"> <input type="number" min="1" name="number"> <br> <span class="error"></span></td> <td class="col-sm-3"> <input type="number" min="0.01" step="0.01" name="price"> <br> <span class="error"></span> </td> <td class="total col-sm-1"> </td> <td class="col-sm-1"> <button type="button" class="btn btn-default btn-xs removeRow"> <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> </button> </td>');
		return this;
	},
	setValue: function(event) {
		var eventType= event.type;
		var attribute=$(event.target).attr("name");
		var value=$(event.target).val();
		this.clearErrors(attribute);
		var error=this.model.validate(attribute, value, eventType);
		if(error){
			this.displayErrors(attribute, error)
		} else{ 
			this.model.set(attribute, value);
		}
	},
	displayErrors: function(field, error){		
		this.$el.find('input[name="' + field + '"]').next().next().text(error); 
		this.$el.find('input[name= "' + field+ '"]').addClass('error');
	
	},
	clearErrors:function(field){
		this.$el.find('input[name="' + field + '"]').next().next().text(""); 
		this.$el.find('input[name="' + field + '"]').removeClass('error');
	},
	renderTotal: function(){
	this.model.countTotal();
	this.$el.find(".total").text("$"+this.model.get('total'));
	},
	destroy: function() {
	this.model.destroy();
	},
	removeRow: function(){
	this.$el.remove();
	}
		
});
return RowView;
});
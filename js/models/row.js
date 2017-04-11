define(['underscore', 
		'backbone'
		], function(_, Backbone) {

'use strict';
	
var RowModel=Backbone.Model.extend({
	 defaults: {
	 price: 0,
	 number: 0
	 },
	 validate:function(attribute, value, eventType){
	 var condition;
	 switch(eventType) {
	 case 'input': 
	 	condition=value<0
	 		break;
	 default:
	 	condition=value<=0
	 }
	 	if(condition){
	 		var error;
			switch(attribute) {
			case 'number':
				error='Количество должно быть больше 0'
			 break;
			case 'price':
				error='Цена должна быть больше 0'
			 break;
			case 'name':
				error='Ведите названия товара'
			 break;
		};
		return error;
		}
	 },
	 initialize: function(){
	 this.on('change:number change:price', this.countTotal, this)
	 
	 },
	 
	 countTotal: function(){
	 var total=Math.round(this.get('price')*this.get('number') * 100)/100;
	 this.set('total', total);
	 }
	
	});
	
	return RowModel;
});


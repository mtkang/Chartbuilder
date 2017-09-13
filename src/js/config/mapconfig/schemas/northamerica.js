const countries = require('./helpers/world');

const NA = {
	label: 'North America',
	name: 'northamerica',
	values: countries,
	proj: 'conicConformal',
	rotate: [100,0],
	translate: [350, 370],
	translateCartogram: [350, 370],
	precision: 1,
	scale: 300,
	topojson : require('./../mapfiles/world/na.topo.json'),
	feature: 'lsib_world',
	adjustLabels: function(adjusty=0,adjustx=0, label) {
	  return [adjusty,adjustx,label];
	},
	matchLogic: function(val) {
		return val;
	},
	test: function(column_val, polygon_val) {
	  return (this.matchLogic(column_val) == polygon_val.id);
	}
 }

module.exports = NA;
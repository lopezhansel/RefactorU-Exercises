// HanselLib
// My colected helper functions 

if (typeof(Number.prototype.toRad) === "undefined") { // convert degres to radian
	Number.prototype.toRad = function() {
		return this * Math.PI / 180;
	};
}

String.prototype.capitalizeFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.capitalize = function() {
	return this.toLowerCase().replace(/\b\w/g, function(m) {
		return m.toUpperCase();
	});
};

var hansel = function() {};


// this function compares a set of coordinates from user current location
hansel.distanceFrom = function distanceFrom (inputLatitude, inputLongitude) { // Central Subtended Angle Method || Great Circle Method
	var R = 6371 / 1.609344; //Earth Median radius in Kilometers / convert to km to miles
	var mylat = (mylat === undefined) ? 37.7833 : mylat;
	var mylon = (mylon === undefined) ? -122.4167 : mylon;
	inputLatitude = (inputLatitude === undefined) ? 39.7392 : inputLatitude; // Monterrey , Mexico 
	inputLongitude = (inputLongitude === undefined) ? -104.9903 : inputLongitude; // Monterrey = boulder actual distance = 1030 miles

	var φ1 = mylat.toRad();
	var φ2 = inputLatitude.toRad();
	var Δφ = (inputLatitude - mylat).toRad();
	var Δλ = (inputLongitude - mylon).toRad();
	var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + // arc length
		Math.cos(φ1) * Math.cos(φ2) *
		Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var distance = (R * c);
	if (inputLatitude === 39.7392) {
		console.log('Denver is ', distance, 'from San Fransisco');
	}
	return distance;
};
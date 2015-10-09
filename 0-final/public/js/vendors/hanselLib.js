// HanselLib
// My colected helper functions 

if (typeof(Number.prototype.toRad) === "undefined") { // convert degres to radian
	Number.prototype.toRad = function() {
		return this * Math.PI / 180;
	};
}
var hansel = function(){

};
  hansel.distanceFrom = function distanceFrom(inputLatitude, inputLongitude) { // Central Subtended Angle Method || Great Circle Method
    var R = 6371 / 1.609344; //Earth Median radius in Kilometers / convert to km to miles
    var mylat = (mylat === undefined)? 0 : mylat;
    var mylon = (mylon === undefined)? 0 : mylon;

    var φ1 = mylat.toRad() || 25.6667; // Monterrey , Mexico 
    var φ2 = inputLatitude.toRad() ||-100.3000; // Monterrey = boulder actual distance = 1030 miles
    var Δφ = (inputLatitude - mylat).toRad();
    var Δλ = (inputLongitude - mylon).toRad();
    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + // arc length
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = (R * c);
    return distance;
  };
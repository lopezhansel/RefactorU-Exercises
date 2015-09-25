var World = function  (player,room,items,monters) {
	this.player = player
	this.room = room
	this.items = items
	this.monters = monters
}
var Player = function (inventory,strength){
	this.inventory = [];
	this.health = 100;
}
Player.prototype.examineItems = function() {
	
};
Player.prototype.pickUpItems = function() {
	
};
Player.prototype.consumeItem = function(first_argument) {
};
Player.prototype.dropItem = function(first_argument) {
};
Player.prototype.dropItem = function(first_argument) {
};
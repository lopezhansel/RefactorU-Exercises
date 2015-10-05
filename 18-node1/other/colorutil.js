var color = {}
	color.r = 0
	color.g = 0
	color.b = 0
	color.luminosity =  function (r,g,b){
			return 0.2126*r + 0.7152*g + 0.0722*b
		}
	color.darken = function (r,g,b){
			color.r = Math.round(.8 * r)
			color.g = Math.round(.8 * g) 
			color.b = Math.round(.8 * b) 		
		}
		
module.exports = color

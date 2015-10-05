var colorutil = require('./other/colorutil.js')
console.log(colorutil);	
var r = process.argv[2]
var g = process.argv[3]
var b = process.argv[4]

var output  = colorutil.luminosity(r,g,b)
console.log(output);
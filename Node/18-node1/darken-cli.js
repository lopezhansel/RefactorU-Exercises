var colorutil = require('./other/colorutil.js')
var r = process.argv[2]
var g = process.argv[3]
var b = process.argv[4]

colorutil.darken(r,g,b)


console.log(colorutil.r, colorutil.g, colorutil.b);







// http request 
// 200 are very common
// 304 are chached 
// 404 the file requested does not exist 
// 500 server error
// rfc http


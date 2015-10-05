var fs = require('fs')

var notesText = fs.readFileSync(process.argv[2], 'utf-8')
fs.writeFileSync (process.argv[3],notesText)
console.log(notesText);
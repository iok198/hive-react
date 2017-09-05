var fs = require('fs')
var rctemplate = require('./rctemplate.js')

var rcb = (location,componentName,initialTag) => {
	return ()=>{
	if(!componentName){throw "Improper componentName."}
	fs.writeFile(location + '/' + componentName + '.js',rctemplate(componentName,initialTag),(err)=> {
		if(err) throw err
		console.log('the file saved')
	})}
}

rcb((!!process.argv[2] ? process.argv[2] : '.'),(!!process.argv[3] ? process.argv[3] : false),(!!process.argv[4] ? process.argv[4] : '.'))()

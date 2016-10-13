var fs = require('fs');
var path = require('path');

var res = new Map();

var currentDir = process.cwd();
console.log('currentDir', currentDir);

function gogogo(dir) {
	var fileList = fs.readdirSync(dir);
	fileList.forEach(function(item) {
		console.log('item', item);
		var stat = fs.statSync(path.join(dir, item));
		if (stat.isDirectory()) {
			// ¼ÌÐøµÝ¹é
			console.log('11111', path.join(dir, item));
			gogogo(path.join(dir, item));
		} else {
			res.set(path.extname(item), path.extname(item));
		}
	});
}

gogogo(currentDir);

console.log('¿ÉÒÔ£»¶î');

console.log((res.keys()));

// console.log(res);
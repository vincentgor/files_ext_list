'use strict';

const fs = require('fs');
const path = require('path');

const res = new Map();

const currentDir = process.cwd();

const getExt = function (dir) {
	let fileList = fs.readdirSync(dir);
	fileList.forEach((item) => {
		let stat = fs.statSync(path.join(dir, item));
		if (stat.isDirectory()) {
			getExt(path.join(dir, item));
		} else {
			res.set(path.extname(item), path.extname(item));
		}
	});
}

getExt(currentDir);

// 删除空格
res.delete('');

console.log((res.keys()));

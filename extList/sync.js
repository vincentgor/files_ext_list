'use strict';

const fs = require('fs');
const path = require('path');

const res = new Map();

const currentDir = process.cwd();

const getExt = function (dir) {
	fs.readdir(dir, (err, fileList) => {
		fileList.forEach((item) => {
			fs.stat(path.join(dir, item), (err, stat) => {
				if (stat.isDirectory()) {
					// 目录递归
					getExt(path.join(dir, item));
				} else {
					res.set(path.extname(item), path.extname(item));
				}
			});
		});
	});
}

getExt(currentDir);

setTimeout(() => {
	// 删除空格
	res.delete('');
	console.log((res.keys()));
}, 2000);


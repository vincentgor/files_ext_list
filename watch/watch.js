'use strict';

const fs = require('fs');
const exec = require('child_process').exec;

let name = 'app.js';

let obj = {
	need: true,
	last: Date.now()
}

fs.watch('version', (event, filename) => {
	if (obj.need) {
		// 需要重启
		obj.need = false;
		action(filename);
	}
	
});

const action = function (filename) {

	let content = fs.readFileSync(filename, {
		encoding: 'utf8'
	});
	if (content) {
		content = content.substr(0, content.length-1);
	}

	if (content.length < 5) {
		// 文件改变得太快，导致不能正确读取文件信息
		obj.need = true;
		return;
	}


	let order = `cp -r ${content}/* running/`;

	exec(order, (err, stdout, stderr) => {
		restartPm2();
	});
}

// 重启某个服务
const restartPm2 = function () {
	exec('pm2 l', (err, stdout, stderr) => {
		obj.need = true;
	});
}
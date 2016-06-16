'use strict';

var aliez = require('aliez');
var http = require('http');

var app = aliez(function(req, res){
	// 静态文件
	req.match(/^\/css\/(.*)/, function(req, res){
		res.dir('./css');
	});
	req.match(/^\/image\/(.*)/, function(req, res){
		res.dir('./image');
	});
	
	// 主页
	req.match('/', function(req, res){
		res.render('./html/index.htm', {title: '滴哩哩信息聚合网'});
	});
	
	// 图标
	req.match('/favicon.ico', function(req, res){
		res.send('./favicon.ico');
	});
	
	// 默认404
	req.default(function(req, res){
		res.send(new Buffer(''));
	});
});

app.use(require('aliez-match'));
app.use(require('aliez-mime'));
app.use(require('aliez-response'));
app.use(require('aliez-static'));
app.use(require('aliez-render'));

http.createServer(app).listen(2200);
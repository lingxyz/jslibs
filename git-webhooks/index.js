var config = require('./config.json')
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var process = require('child_process')
var app = express()
// application/json parser
app.use(bodyParser.json())
// application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));

// webhook application
app.post('/webhook/*', function (req, res) {
	for (var i in config.list) {
		if (req.url != config.list[i].remote) {
			console.warn('url not format romote')
		}
		else if (!config.list[i].secret || eval(`req.body.${config.list[i].secret.name}`) === config.list[i].secret.value) {
			process.exec(path.join(__dirname, config.list[i].path), function (error, stdout, stderr) {
				console.info('stdout: %s\nstderr: %s', stdout, stderr)
				if (error) {
						res.send(`fail!\n${stdout}${error}`)
				}
				else {
					res.send(`done!\n${stdout}`)
				}
			})
		} else {
			console.warn(`failed ${config.list[i].secret.name}`)
			res.send(`${config.list[i].secret.name}不正确`)
		}
	}
})

// server start
var port = config.port;
var server = app.listen(port, function () {
	var host = server.address().address;
	console.info('node server listening at http://%s:%s', host, port);
});
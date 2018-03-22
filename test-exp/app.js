var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var discoveryOrigin = require("./libs/kumuluz/modules/discovery/index");
const discovery = requireDefault(discoveryOrigin);

var index = require('./routes/index');

var app = express();

const register = async () => {
	await discovery.default.initialize({ extension: "etcd" });
	discovery.default.registerService();
};
register();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', index);
// error handler
app.use(function(err, req, res, next) {
  res.status(404).json({
		message: 'Napaka 404!',
	});
});

module.exports = app;

function requireDefault(module) {
	if (module && module.__esModule) {
		return module;
	} else {
		return {default: module};
	}
}
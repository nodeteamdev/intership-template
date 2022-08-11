"use strict";
exports.__esModule = true;
var http = require("http");
var events_1 = require("./events");
var server_1 = require("./server");
var port = server_1["default"].get('port');
events_1["default"].bind(http.createServer(server_1["default"]).listen(port));

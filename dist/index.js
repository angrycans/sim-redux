"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var createStore_1 = tslib_1.__importDefault(require("./store/createStore"));
exports.createStore = createStore_1.default;
var middleware_1 = require("./middleware");
exports.applyMiddleware = middleware_1.applyMiddleware;
var combine_actors_1 = tslib_1.__importDefault(require("./utils/combine-actors"));
exports.combineActors = combine_actors_1.default;
var index_1 = require("./react/index");
exports.withRedux = index_1.withRedux;
exports.connect = index_1.connect;
//# sourceMappingURL=index.js.map
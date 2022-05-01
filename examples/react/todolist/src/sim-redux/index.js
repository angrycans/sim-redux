"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHookStore = exports.connect = exports.withRedux = exports.combineActors = exports.applyMiddleware = exports.createStore = void 0;
var tslib_1 = require("tslib");
var createStore_1 = tslib_1.__importDefault(require("./store/createStore"));
exports.createStore = createStore_1.default;
var middleware_1 = require("./middleware");
Object.defineProperty(exports, "applyMiddleware", { enumerable: true, get: function () { return middleware_1.applyMiddleware; } });
var combine_actors_1 = tslib_1.__importDefault(require("./utils/combine-actors"));
exports.combineActors = combine_actors_1.default;
var index_1 = require("./react/index");
Object.defineProperty(exports, "withRedux", { enumerable: true, get: function () { return index_1.withRedux; } });
Object.defineProperty(exports, "connect", { enumerable: true, get: function () { return index_1.connect; } });
var createHookStore_1 = tslib_1.__importDefault(require("./hook/createHookStore"));
exports.createHookStore = createHookStore_1.default;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var set_1 = tslib_1.__importDefault(require("../utils/set"));
var finalMiddleware = function (store, args, name) { return function (action) { return set_1.default(store, action.apply(void 0, args), name); }; };
function applyMiddleware() {
    var middlewares = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        middlewares[_i] = arguments[_i];
    }
    middlewares.reverse();
    return function (store, action, args, name) {
        if (middlewares.length < 1) {
            return set_1.default(store, action.apply(void 0, args), name);
        }
        var chain = middlewares
            .map(function (middleware) { return middleware(store); })
            .reduce(function (next, middleware) { return middleware(next, args); }, finalMiddleware(store, args, name));
        return chain(action);
    };
}
exports.default = applyMiddleware;
//# sourceMappingURL=applyMiddleware.js.map
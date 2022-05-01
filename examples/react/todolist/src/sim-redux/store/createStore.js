"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var middleware_1 = require("../middleware");
createStore.preMiddlewares = [];
function createStore(state, middleware, __DEV__) {
    if (middleware === void 0) { middleware = []; }
    if (__DEV__ === void 0) { __DEV__ = true; }
    /** 订阅列表 */
    var listeners = [];
    /** 默认状态 */
    var defaultState = JSON.parse(JSON.stringify(state));
    /** 缓存栈 */
    var cacheStack = [];
    var ACTIONS = {
        PUSH: "PUSH",
        POP: "POP",
        REPLACE: "REPLACE",
    };
    if (!middleware) {
        throw new Error("Sim-Redux error: middleware is []");
    }
    return {
        __DEV__: __DEV__,
        defaultState: defaultState,
        middleware: function () {
            return middleware_1.applyMiddleware.apply(void 0, tslib_1.__spreadArray(tslib_1.__spreadArray([], createStore.preMiddlewares, false), middleware, false));
        },
        setState: function (update) {
            var updateValue = typeof update === "function" ? update(state) : update;
            state = tslib_1.__assign(tslib_1.__assign({}, state), updateValue);
            listeners.forEach(function (f) { return f(updateValue); });
        },
        subscribe: function (f) {
            listeners.push(f);
            return function () {
                listeners.splice(listeners.indexOf(f), 1);
            };
        },
        getState: function () {
            return state;
        }
    };
}
exports.default = createStore;
//# sourceMappingURL=createStore.js.map
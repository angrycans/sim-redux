"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var middleware_1 = require("../middleware");
createStore.preMiddlewares = [];
createStore.history = null;
function createStore(state, middleware, __DEV__) {
    if (middleware === void 0) { middleware = []; }
    if (__DEV__ === void 0) { __DEV__ = true; }
    /** 订阅列表 */
    var listeners = [];
    /** 默认状态 */
    var defaultState = JSON.parse(JSON.stringify(state));
    /** 缓存栈 */
    var cacheStack = [];
    /** 记录是否已经被缓存 */
    var cached = false;
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
            return middleware_1.applyMiddleware.apply(void 0, tslib_1.__spreadArrays(createStore.preMiddlewares, middleware));
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
        },
        save: function () {
            cacheStack.push(JSON.parse(JSON.stringify(state)));
            return state;
        },
        restore: function () {
            var restoredState = cacheStack.pop() || defaultState;
            middleware_1.applyMiddleware.apply(void 0, tslib_1.__spreadArrays(createStore.preMiddlewares, middleware))(this, function (newState) { return newState; }, [restoredState], "restore");
            return state;
        },
        openCache: function () {
            var _this = this;
            console.log("--- openCache --->", createStore.history);
            if (!window.wx && !cached && createStore.history) {
                cached = true;
                /** store 所属的 path */
                var storePath_1 = createStore.history.location.pathname;
                /** 上一次的 path */
                var prevPath_1 = storePath_1;
                createStore.history.listen(function (_a, action) {
                    var pathname = _a.pathname;
                    console.log("prevPath ==>", prevPath_1);
                    console.log("storePath ==>", storePath_1);
                    switch (action) {
                        case ACTIONS.PUSH:
                            /** 上一次的页面是 store 所在页面 */
                            if (storePath_1 === prevPath_1) {
                                console.log("--- save --->");
                                _this.save();
                            }
                            break;
                        case ACTIONS.POP:
                            /** 当前页面是 store 所在页面 */
                            if (pathname === storePath_1) {
                                console.log("--- restore --->");
                                _this.restore();
                            }
                            break;
                        case ACTIONS.REPLACE:
                            break;
                        default:
                            break;
                    }
                    prevPath_1 = pathname;
                });
            }
        },
    };
}
exports.default = createStore;
//# sourceMappingURL=createStore.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var set_1 = tslib_1.__importDefault(require("./set"));
function bindActions(actions, store) {
    actions = typeof actions === "function" ? actions(store) : actions;
    actions = tslib_1.__assign(tslib_1.__assign({}, actions), { setStore: function (newState) {
            return newState;
        },
        resetStore: function () {
            return store.defaultState;
        } });
    var bound = {
        save: function () {
            return Promise.resolve(store.save());
        },
        restore: function () {
            return Promise.resolve(store.restore());
        },
    };
    var _loop_1 = function (name_1) {
        bound[name_1] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var action = actions[name_1].bind(actions);
            if (typeof store.middleware === "function") {
                return store.middleware()(store, action, args, name_1);
            }
            return set_1.default(store, action.apply(void 0, args), name_1);
        };
    };
    for (var name_1 in actions) {
        _loop_1(name_1);
    }
    return bound;
}
exports.default = bindActions;
//# sourceMappingURL=bindActions.js.map
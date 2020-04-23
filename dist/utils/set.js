"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prinf = function (prev, actionname) { return function (next) {
    console.group &&
        console.group('%caction', 'color:#2196F3', actionname, '@' + new Date().toISOString());
    console.log('%cprev state', 'color:#9E9E9E', prev);
    console.log('%cnext state', 'color:#4CAF50', next);
    console.groupEnd && console.groupEnd();
}; };
function set(store, ret, actionname) {
    if (ret != null) {
        if (ret.then) {
            return ret.then(function (state) {
                var readyPrinf = prinf(store.getState(), actionname);
                store.setState(state);
                store.__DEV__ && readyPrinf(store.getState());
                return store.getState();
            });
        }
        else {
            var readyPrinf = prinf(store.getState(), actionname);
            store.setState(ret);
            store.__DEV__ && readyPrinf(store.getState());
            return Promise.resolve(store.getState());
        }
    }
    else {
        return Promise.resolve(null);
    }
}
exports.default = set;
//# sourceMappingURL=set.js.map
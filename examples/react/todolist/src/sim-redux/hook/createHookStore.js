"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var bindActions_1 = tslib_1.__importDefault(require("../utils/bindActions"));
var shallowEqual_1 = tslib_1.__importDefault(require("../utils/shallowEqual"));
// type StateSelector<S, C extends (...args: any) => any = () => {}> = (
//   state: S
// ) => (S & Partial<ReturnType<C>>) | any;
function createHookStore(storeState, actor, computed, __DEV__) {
    /** 订阅列表 */
    var listeners = [];
    var unsubscribe;
    var _computed;
    if (__DEV__ == null) {
        __DEV__ = true;
    }
    var _store = {
        middleware: null,
        subscribe: null,
        defaultState: tslib_1.__assign(tslib_1.__assign({}, storeState), _computed),
        getState: getState,
        setState: setState,
        __DEV__: __DEV__,
    };
    var actions = (0, bindActions_1.default)(actor, _store); // buildInActions
    if (__DEV__) {
        console.group &&
            console.group("%cSim-Redux @store", "color:#2196F3", "@" + new Date().toISOString());
        console.log("%cstate", "color:#4CAF50", storeState);
        console.log("%cactions", "color:#4CAF50", actions);
        console.log("%ccomputed", "color:#4CAF50", getComputed());
        console.groupEnd && console.groupEnd();
    }
    /**
     * 计算 computed
     */
    function getComputed() {
        //console.log("computed", computed);
        if (!computed) {
            return {};
        }
        else {
            var computedFac_1 = computed(_store);
            _computed = Object.keys(computedFac_1).reduce(function (acc, key) {
                var _a;
                return tslib_1.__assign(tslib_1.__assign({}, acc), (_a = {}, _a[key] = computedFac_1[key].call(computedFac_1), _a));
            }, {});
            //console.log("getComputed", _computed);
            return _computed;
        }
    }
    function useStore(selector) {
        //const _state = state;
        var store = tslib_1.__assign(tslib_1.__assign({}, storeState), _computed);
        var mapped = selector
            ? selector.reduce(
            // eslint-disable-next-line
            function (result, key) { return ((result[key] = store[key]), result); }, {})
            : store;
        console.log("maped", mapped);
        if (!selector)
            selector = Object.keys(store);
        var _a = (0, react_1.useState)(mapped), state = _a[0], setState = _a[1];
        function update(updateState) {
            // const mapped = storeState as any;
            console.log("%cSim-Redux  start", "color:#2196F3", mapped, updateState, storeState);
            if ((0, shallowEqual_1.default)(mapped, updateState)) {
                // console.log(
                //   "%cSim-Redux udate22",
                //   "color:#2196F3",
                //   mapped,
                //   updateState
                // );
                // let newstate = produce(mapped, (draft) => {
                //   Object.keys(draft).forEach((k) => {
                //     //console.log("k", k, updateState[k]);
                //     draft[k] = updateState[k] ? updateState[k] : storeState[k];
                //   });
                // });
                // //  for (let i = 0; i < Object.keys(updateState).length; i++) {}
                var newstate_1 = {};
                selector.forEach(function (k) {
                    //console.log("k", k, updateState[k]);
                    newstate_1[k] = updateState[k] ? updateState[k] : storeState[k];
                });
                console.log("%cSim-Redux update state", "color:#2196F3", state);
                console.log("%cSim-Redux update updatestate", "color:#2196F3", updateState);
                console.log("%cSim-Redux new state", "color:#2196F3", newstate_1);
                getComputed();
                setState(newstate_1);
            }
        }
        (0, react_1.useEffect)(function () {
            //mount
            unsubscribe = subscribe(update);
            return function () {
                //unmount
                unsubscribe(update);
                console.log("unmount useStore");
            };
            // eslint-disable-next-line
        }, []);
        return tslib_1.__assign(tslib_1.__assign({}, state), _computed);
    }
    function setState(update) {
        var updateValue = typeof update === "function" ? update(storeState) : update;
        storeState = tslib_1.__assign(tslib_1.__assign({}, storeState), updateValue);
        listeners.forEach(function (f) { return f(updateValue); });
    }
    function subscribe(f) {
        listeners.push(f);
        return function () {
            listeners.splice(listeners.indexOf(f), 1);
        };
    }
    function getState() {
        return tslib_1.__assign(tslib_1.__assign({}, storeState), _computed);
    }
    // function getState<P>(selector: StateSelector<S, C>) {
    //   return selector(storeState);
    // }
    function dispatch(actionname, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, actions[actionname](payload)];
                    case 1:
                        //const actionName = getActionName(action);
                        // console.log("dispatch", action, actionName, payload);
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    }
    return { useStore: useStore, dispatch: dispatch };
}
exports.default = createHookStore;
//# sourceMappingURL=createHookStore.js.map
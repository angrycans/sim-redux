"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var shallowEqual_1 = tslib_1.__importDefault(require("../../utils/shallowEqual"));
var context_1 = require("./context");
var bindActions_1 = tslib_1.__importDefault(require("../../utils/bindActions"));
var UUID = 0;
var Connect = /** @class */ (function (_super) {
    tslib_1.__extends(Connect, _super);
    function Connect(props, context) {
        var _this = _super.call(this, props, context) || this;
        /**
         * 响应订阅的回调，用于真正的触发组件的更新
         * @param { object } updateState 本次真正需要更新的属性对象
         */
        _this.update = function (updateState) {
            var mapped = _this.getProps();
            if (shallowEqual_1.default(mapped, updateState)) {
                _this.getComputed();
                _this.setState(mapped);
            }
        };
        //console.log("connect constructor");
        _this.state = _this.getProps();
        _this.actions = _this.getActions();
        _this.UUID = UUID++;
        if (_this.context.store.__DEV__) {
            console.group &&
                console.group("%cSim-Redux @connect", "color:#2196F3", "@" + new Date().toISOString());
            console.log("%cstate", "color:#4CAF50", _this.state);
            console.log("%cactions", "color:#4CAF50", _this.actions);
            console.log("%ccomputed", "color:#4CAF50", _this.getComputed());
            console.groupEnd && console.groupEnd();
        }
        _this.getComputed();
        _this.unsubscribe = _this.context.store.subscribe(_this.update);
        return _this;
    }
    Connect.prototype.componentDidMount = function () {
        /** TODO:  好像还是有问题 */
        /** 开启缓存功能 */
        // this.props.storeCache && this.context.store.openCache()
    };
    Connect.prototype.componentWillUnmount = function () {
        this.unsubscribe(this.update);
    };
    Connect.prototype.getProps = function () {
        var mapToProps = this.props.mapToProps;
        var state = (this.context.store && this.context.store.getState()) || {};
        return mapToProps
            ? mapToProps.reduce(function (result, key) { return ((result[key] = state[key]), result); }, {})
            : state;
    };
    Connect.prototype.getActions = function () {
        var actions = this.props.actions;
        return bindActions_1.default(actions, this.context.store); // buildInActions
    };
    /**
     * 计算 computed
     */
    Connect.prototype.getComputed = function () {
        if (!this.props.computed) {
            return {};
        }
        else {
            var computedFac_1 = this.props.computed(this.context.store);
            this.computed = Object.keys(computedFac_1).reduce(function (acc, key) {
                var _a;
                return tslib_1.__assign(tslib_1.__assign({}, acc), (_a = {}, _a[key] = computedFac_1[key].call(computedFac_1), _a));
            }, {});
            return this.computed;
        }
    };
    Connect.prototype.render = function () {
        //console.log("this.props.children render", this.UUID);
        // @ts-ignore
        return this.props.children(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({ store: this.context.store }, this.props), this.computed), this.state), { actions: tslib_1.__assign({}, this.actions) }));
    };
    Connect.contextType = context_1.StoreContext;
    return Connect;
}(React.PureComponent));
/**
 * 注入属性、方法到组件 props
 * @param { IFunc | IOpts } opts 传入此参数时，注入给定属性到 props，不传入时，默认注入所有属性
 */
function connect(param, _actor, _computed) {
    var state = null;
    var actions = null;
    var computed = null;
    if (param instanceof Array) {
        state = param.length == 0 ? null : param;
    }
    else if (typeof param === "function") {
        if (_actor && typeof _actor === "function") {
            computed = _actor;
        }
        _actor = param;
    }
    else if (param === null || param === void 0 ? void 0 : param.actor) {
        state =
            param.state && param.state instanceof Array
                ? param.state.length == 0
                    ? null
                    : param.state
                : param.state;
        _actor = param.actor;
        _computed = param.computed;
    }
    //console.log(typeof param);
    actions = _actor || actions;
    computed = _computed || computed;
    if (!actions) {
        throw new Error("Sim-Redux error : @connect params need actor");
    }
    // if (typeof param === "function") {
    //   actions = param;
    // } else {
    //   state =
    //     param.state && param.state instanceof Array
    //       ? param.state.length == 0
    //         ? null
    //         : param.state
    //       : param.state;
    //   actions = param.actor || actions;
    //   computed = param.computed || computed;
    // }
    return function (target) {
        return hocconnect(state, actions, computed)(target);
    };
}
var hocconnect = function (mapToProps, actions, computed) {
    if (actions === void 0) { actions = null; }
    if (computed === void 0) { computed = null; }
    return function (Child) {
        return /** @class */ (function (_super) {
            tslib_1.__extends(class_1, _super);
            function class_1(props) {
                return _super.call(this, props) || this;
            }
            class_1.prototype.render = function () {
                var props = this.props;
                return (React.createElement(Connect, tslib_1.__assign({}, props, { mapToProps: mapToProps, actions: actions, computed: computed }), function (mappedProps) { return React.createElement(Child, tslib_1.__assign({}, mappedProps, props)); }));
            };
            return class_1;
        }(React.PureComponent));
    };
};
exports.default = connect;
//# sourceMappingURL=connect.js.map
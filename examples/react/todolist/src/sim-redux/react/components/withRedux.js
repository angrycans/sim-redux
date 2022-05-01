"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var context_1 = require("./context");
var withRedux = function (store) {
    return function HOCFactory(Comp) {
        return /** @class */ (function (_super) {
            tslib_1.__extends(class_1, _super);
            function class_1(props) {
                var _this = _super.call(this, props) || this;
                _this.state = { store: store };
                return _this;
            }
            class_1.prototype.render = function () {
                return (react_1.default.createElement(context_1.Provider, { value: this.state },
                    react_1.default.createElement(Comp, tslib_1.__assign({}, this.props))));
            };
            return class_1;
        }(react_1.Component));
    };
};
exports.default = withRedux;
//# sourceMappingURL=withRedux.js.map
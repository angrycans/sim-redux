"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreContext = exports.Consumer = exports.Provider = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var createStore_1 = tslib_1.__importDefault(require("../../store/createStore"));
var StoreContext = react_1.default.createContext({ store: (0, createStore_1.default)(null) });
exports.StoreContext = StoreContext;
var Provider = StoreContext.Provider, Consumer = StoreContext.Consumer;
exports.Provider = Provider;
exports.Consumer = Consumer;
//# sourceMappingURL=context.js.map
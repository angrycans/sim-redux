"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var createStore_1 = tslib_1.__importDefault(require("../../store/createStore"));
var StoreContext = react_1.default.createContext({ store: createStore_1.default(null) });
exports.StoreContext = StoreContext;
var Provider = StoreContext.Provider, Consumer = StoreContext.Consumer;
exports.Provider = Provider;
exports.Consumer = Consumer;
//# sourceMappingURL=context.js.map
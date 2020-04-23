"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function combineActors() {
    var actors = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        actors[_i] = arguments[_i];
    }
    // @ts-ignore
    return function (store) {
        return actors.reduce(function (acc, action) { return (tslib_1.__assign(tslib_1.__assign({}, acc), action(store))); }, {});
    };
}
exports.default = combineActors;
//# sourceMappingURL=combine-actors.js.map
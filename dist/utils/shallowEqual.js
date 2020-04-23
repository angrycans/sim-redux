"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shallowEqual(a, b) {
    var keysA = Object.keys(a);
    var keysB = Object.keys(b);
    return !!~keysA.findIndex(function (keyA) { return keysB.includes(keyA); });
}
exports.default = shallowEqual;
//# sourceMappingURL=shallowEqual.js.map
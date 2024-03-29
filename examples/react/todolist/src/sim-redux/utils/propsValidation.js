"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function propsValidation(props, propName, componentName) {
    if (typeof props === 'object') {
        return null;
    }
    return new Error("Invalid prop ".concat(propName, " supplied to ").concat(componentName));
}
exports.default = propsValidation;
//# sourceMappingURL=propsValidation.js.map
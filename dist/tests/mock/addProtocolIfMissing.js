"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProtocolIfMissing = void 0;
exports.addProtocolIfMissing = jest.fn((url) => {
    return `http://${url}`;
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProtocolIfMissing = void 0;
const addProtocolIfMissing = (url) => {
    if (!/^https?:\/\//i.test(url)) {
        return `http://${url}`;
    }
    return url;
};
exports.addProtocolIfMissing = addProtocolIfMissing;

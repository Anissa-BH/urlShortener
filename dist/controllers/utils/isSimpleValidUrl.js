"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSimpleValidUrl = void 0;
const addProtocolIfMissing_1 = require("./addProtocolIfMissing");
const isValidCustomUrl_1 = require("./isValidCustomUrl");
const isSimpleValidUrl = (url) => {
    const urlWithProtocol = (0, addProtocolIfMissing_1.addProtocolIfMissing)(url);
    // Vérifier si l'URL est au format www.example.com
    const urlWithoutProtocol = urlWithProtocol.replace(/^(https?:\/\/)/, "");
    return (0, isValidCustomUrl_1.isValidCustomUrl)(urlWithoutProtocol);
};
exports.isSimpleValidUrl = isSimpleValidUrl;

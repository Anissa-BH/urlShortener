"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidCustomUrl = void 0;
const isValidCustomUrl = (url) => {
    // Expression régulière pour valider le format www.example.com
    const regex = /^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return regex.test(url);
};
exports.isValidCustomUrl = isValidCustomUrl;

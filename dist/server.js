"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dataBase_1 = __importDefault(require("./dataBase"));
const PORT = process.env.PORT || 3000;
(0, dataBase_1.default)();
app_1.default.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

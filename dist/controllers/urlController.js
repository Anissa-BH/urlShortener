"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalytics = exports.redirectToOriginalUrl = exports.createShortUrl = void 0;
const Url_1 = __importDefault(require("../models/Url"));
const shortid_1 = __importDefault(require("shortid"));
const isSimpleValidUrl_1 = require("./utils/isSimpleValidUrl");
const addProtocolIfMissing_1 = require("./utils/addProtocolIfMissing");
const createShortUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { originalUrl } = req.body;
    const base = `http://localhost:3000`;
    // Vérifier si l'URL est valide
    if (!(0, isSimpleValidUrl_1.isSimpleValidUrl)(originalUrl)) {
        return res.status(400).json({ error: "Invalid original URL" });
    }
    try {
        let url = yield Url_1.default.findOne({ originalUrl });
        if (url) {
            return res.status(200).json(url);
        }
        else {
            const urlCode = shortid_1.default.generate();
            const shortUrl = `${urlCode}`;
            url = new Url_1.default({
                originalUrl,
                shortUrl,
            });
            yield url.save();
            return res.status(201).json({
                originalUrl: url.originalUrl,
                shortUrl: url.shortUrl,
            });
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).json("Database error");
    }
});
exports.createShortUrl = createShortUrl;
const redirectToOriginalUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shortUrl } = req.params;
    try {
        const url = yield Url_1.default.findOne({ shortUrl });
        console.log(`Url object: ${JSON.stringify(url)} --`);
        if (url) {
            url.clicks++;
            console.log(`Url object after incrementation : ${JSON.stringify(url)} --`);
            yield url.save();
            const redirectUrl = (0, addProtocolIfMissing_1.addProtocolIfMissing)(url.originalUrl);
            console.log(`Redirecting to: ${redirectUrl}`);
            res.redirect(301, redirectUrl);
        }
        else {
            res.status(404).json({ error: 'URL not found' });
        }
    }
    catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});
exports.redirectToOriginalUrl = redirectToOriginalUrl;
const getAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urls = yield Url_1.default.find().select("originalUrl shortUrl clicks");
        res.json(urls);
    }
    catch (err) {
        console.error(err);
        res.status(500).json("Server error");
    }
});
exports.getAnalytics = getAnalytics;

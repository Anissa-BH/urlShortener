"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const urlController_1 = require("../controllers/urlController");
const router = (0, express_1.Router)();
router.post('/api/shorturl', urlController_1.createShortUrl);
router.get('/api/shorturl/analytics', urlController_1.getAnalytics);
router.get('/api/shorturl/:shortUrl', urlController_1.redirectToOriginalUrl);
exports.default = router;

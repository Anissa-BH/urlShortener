import { Router } from 'express';
import { createShortUrl, redirectToOriginalUrl, getAnalytics } from '../controllers/urlController';

const router = Router();

router.post('/api/shorturl', createShortUrl);


router.get('/api/shorturl/analytics', getAnalytics);
router.get('/api/shorturl/:shortUrl', redirectToOriginalUrl);



export default router;

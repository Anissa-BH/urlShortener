import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { createShortUrl, redirectToOriginalUrl } from '../controllers/urlController'; 
import Url from '../models/Url';
import shortid from 'shortid';


// Configuration de l'application Express pour les tests
const app = express();
app.use(express.json());
app.post('/api/shorturl', createShortUrl);
app.get('/api/shorturl/:shortUrl', redirectToOriginalUrl);

beforeAll(async () => {
  await mongoose.connect('mongodb+srv://abh:anissa@cluster0.yttisk0.mongodb.net/urls');
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Url.deleteMany({}); // Nettoie tous les documents dans la collection 'urls'
});


describe('POST /api/shorturl', () => {
  it('should return 400 if the original URL is invalid', async () => {
    const res = await request(app)
      .post('/api/shorturl')
      .send({ originalUrl: 'invalid-url' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid original URL' });
  });

  it('should return 200 if the URL already exists', async () => {
    const originalUrl = 'http://www.example.com';
    const shortUrl = 'short123';
    
    await Url.create({ originalUrl, shortUrl });

    const res = await request(app)
      .post('/api/shorturl')
      .send({ originalUrl });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('originalUrl', originalUrl);
    expect(res.body).toHaveProperty('shortUrl', shortUrl);
  });

  it('should create a new short URL and return 201', async () => {
    const originalUrl = 'http://www.example.com';
    
    await Url.deleteMany({ originalUrl });

    // Moquer la génération de shortid
    jest.spyOn(shortid, 'generate').mockReturnValue('short123');

    const res = await request(app)
      .post('/api/shorturl')
      .send({ originalUrl });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('originalUrl', originalUrl);
    expect(res.body).toHaveProperty('shortUrl');
  });

  it('should handle server errors', async () => {
    // Moquer une erreur de base de données
    jest.spyOn(Url, 'findOne').mockImplementation(() => {
      throw new Error('Database error');
    });

    const res = await request(app)
      .post('/api/shorturl')
      .send({ originalUrl: 'http://www.example.com' });

    expect(res.status).toBe(500);
    expect(res.body).toBe('Database error');
  });
});
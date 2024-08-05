import express from 'express';
import router from './routes/urlRoutes';

const app = express();

app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

export default app;

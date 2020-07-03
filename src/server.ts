import express from 'express';
import routes from './routes';

const app = express();

app.get('/teste', (request, response) => response.json({ message: 'Hello Gostack' }));

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});

import express from 'express';
import './config/database';

const app = express();
const PORT = 8000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'octofit-backend' });
});

app.listen(PORT, () => {
  console.log(`OctoFit backend listening on port ${PORT}`);
});
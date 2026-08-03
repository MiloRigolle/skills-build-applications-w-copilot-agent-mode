import express from 'express';
import { apiBaseUrl } from './config/apiUrl';
import './config/database';
import apiRoutes from './routes/api';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'octofit-backend',
    apiBaseUrl,
  });
});

app.listen(PORT, () => {
  console.log(`OctoFit backend listening at ${apiBaseUrl}`);
});
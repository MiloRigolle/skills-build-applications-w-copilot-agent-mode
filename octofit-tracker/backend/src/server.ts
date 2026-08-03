import express from 'express';
import './config/database';
import apiRoutes from './routes/api';

const PORT = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'octofit-backend', baseUrl });
});

app.listen(PORT, () => {
  console.log(`OctoFit backend listening at ${baseUrl}`);
  console.log(`Verify endpoints:`);
  console.log(`  curl ${baseUrl}/api/users`);
  console.log(`  curl ${baseUrl}/api/activities`);
});

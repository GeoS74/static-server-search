export default {
  server: {
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || 3000,
  },
  db: {
    host: process.env.DB_HOST || 'http://5.181.108.248',
    port: process.env.DB_PORT || 9200,
  },
  repository: {
    path: process.env.REPO || '../../static-server/repo',
  },
};

import app from './app';

const PORT = process.env.PORT || 3030;

app.server.listen(PORT, () => `Listening on port: ${PORT}`);

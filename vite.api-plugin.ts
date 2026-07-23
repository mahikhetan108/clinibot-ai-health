import { Plugin } from 'vite';
import { handleChat } from './src/lib/chatHandler';

export function apiPlugin(): Plugin {
  return {
    name: 'clinibot-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        try {
          const apiKey = server.config.env.GEMINI_API_KEY ?? process.env.GEMINI_API_KEY;
          const method = req.method ?? 'GET';
          const headers: Record<string, string> = {};
          req.rawHeaders.forEach((v, i) => {
            if (i % 2 === 0) headers[v.toLowerCase()] = req.rawHeaders[i + 1];
          });

          let body: string | undefined;
          if (method === 'POST' || method === 'PUT') {
            const chunks: Buffer[] = [];
            for await (const chunk of req) chunks.push(chunk as Buffer);
            body = Buffer.concat(chunks).toString('utf-8');
          }

          const request = new Request(`http://localhost${req.url}`, {
            method,
            headers,
            body,
          });

          const response = await handleChat(request, apiKey);
          const text = await response.text();
          res.statusCode = response.status;
          response.headers.forEach((v, k) => res.setHeader(k, v));
          res.end(text);
        } catch (e) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Internal server error', detail: e instanceof Error ? e.message : 'Unknown' }));
        }
      });
    },
  };
}

import { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { handleChat } from './src/lib/chatHandler';

function getLatestApiKey(serverEnvKey: string | undefined): string | undefined {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      const match = content.match(/^GEMINI_API_KEY=(.*)$/m);
      if (match && match[1].trim()) {
        return match[1].trim();
      }
    }
  } catch {}
  return serverEnvKey ?? process.env.GEMINI_API_KEY;
}

export function apiPlugin(): Plugin {
  return {
    name: 'clinibot-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        try {
          const apiKey = getLatestApiKey(server.config.env.GEMINI_API_KEY);
          const method = req.method ?? 'GET';
          const headers: Record<string, string> = {};
          if (req.rawHeaders) {
            for (let i = 0; i < req.rawHeaders.length; i += 2) {
              const key = req.rawHeaders[i].toLowerCase();
              const val = req.rawHeaders[i + 1];
              if (!['host', 'connection', 'content-length'].includes(key)) {
                headers[key] = val;
              }
            }
          }

          let body: string | undefined;
          if (method === 'POST' || method === 'PUT') {
            const chunks: Buffer[] = [];
            for await (const chunk of req) chunks.push(chunk as Buffer);
            body = Buffer.concat(chunks).toString('utf-8');
          }

          const request = new Request('http://localhost/api/chat', {
            method,
            headers,
            body: method === 'GET' || method === 'HEAD' || method === 'OPTIONS' ? undefined : body,
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

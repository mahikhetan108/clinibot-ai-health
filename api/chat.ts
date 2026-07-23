import { handleChat } from '../src/lib/chatHandler';

export default async function handler(req: Request): Promise<Response> {
  return handleChat(req, process.env.GEMINI_API_KEY);
}

export const config = {
  runtime: 'edge',
};

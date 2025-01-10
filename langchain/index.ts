import { ChatOpenAI } from '@langchain/openai';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';

const API_KEY = process.env.AKASHCHAT_KEY;
if (!API_KEY) {
    throw new Error('AKASHCHAT_KEY is not set');
}
// Options:
// 'Meta-Llama-3-1-8B-Instruct-FP8'
// 'Meta-Llama-3-1-405B-Instruct-FP8'
// 'Meta-Llama-3-2-3B-Instruct'
//  'nvidia-Llama-3-1-Nemotron-70B-Instruct-HF';
const LLM_MODEL = 'Meta-Llama-3-1-8B-Instruct-FP8';

const llm = new ChatOpenAI(
        {
            apiKey: API_KEY,
            model: LLM_MODEL,
        },
        { baseURL: 'https://chatapi.akash.network/api/v1' },
);

export enum Actions {
    Buy,
    Sell,
    Swap,
}

const settingsSchema = z.object({
    actions: z.nativeEnum(Actions).describe('Actions that the bot can perform'),
});

// create LLM with functions
const tradeAI = llm.withStructuredOutput(settingsSchema, {name: 'tradeAI'});

const systemPrompt = fs.readFileSync(path.join(__dirname, './system.txt')).toString();
const chatPromptTemplate = ChatPromptTemplate.fromMessages([
    ['system', systemPrompt],
    new MessagesPlaceholder('examples'),
    ['user', '{input}'],
]);
'use server';
import { z } from 'zod';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { tool } from '@langchain/core/tools';
import assetList from '../public/supportedTokens.json';
// import { DynamicRetrievalMode, GoogleSearchRetrievalTool } from '@google/generative-ai';

const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
    throw new Error('GOOGLE_API_KEY is not set');
}
const availableTokens = assetList.map((asset) => asset.symbol) as [string];

// Options:
// gemini-2.0-flash-exp
// gemini-1.5-flash
// gemini-1.5-flash-8b
// gemini-1.5-pro
const LLM_MODEL = 'gemini-1.5-flash';

const llm = new ChatGoogleGenerativeAI(
    {
        apiKey: API_KEY,
        model: LLM_MODEL,
    },
);

// requires paid api to use
// const searchRetrievalTool: GoogleSearchRetrievalTool = {
//     googleSearchRetrieval: {
//         dynamicRetrievalConfig: {
//             mode: DynamicRetrievalMode.MODE_DYNAMIC,
//             dynamicThreshold: 0.7, // default is 0.7
//         },
//     },
// };
// const searchRetrievalModel = new ChatGoogleGenerativeAI({
//     model: "gemini-1.5-pro",
//     temperature: 0,
//     maxRetries: 0,
// }).bindTools([searchRetrievalTool]);

if (availableTokens.length <= 1) {
    throw new Error('No tokens available');
}

// use availableTokens to validate the token
const tokenSchema = z.enum(availableTokens);
const stakeSchema = z.object({
    token: tokenSchema.describe('The token to stake'),
    amount: z.number().describe('The amount of the token to stake'),
});

const swapSchema = z.object({
    tokenIn: tokenSchema.describe('The token that will be sent'),
    tokenOut: tokenSchema.describe('The token that will be received'),
    amountIn: z.number().optional().describe('The amount of tokenIn to swap'),
    amountOut: z.number().optional().describe('The amount of tokenOut to receive'),
});

const stakeTool = tool(
    () => undefined,
    {
        name: 'stakeConfirm',
        description: 'A tool that generates a stake confirmation',
        schema: stakeSchema,
    },
);

const swapTool = tool(
    () => undefined,
    {
        name: 'swapConfirm',
        description: 'A tool that generates a swap confirmation',
        schema: swapSchema,
    },
);


// const tokenSearchTool = tool(
//     () => undefined,
//     {
//         name: 'tokenSearchTool',
//         description: 'A tool that searches for information about a token',
//         schema: z.object({
//             query: z.string().describe('The input query to search for'),
//         }),
//     }
//
// )

const systemPrompt = new SystemMessage(`
You are Tele. Your job is to take a user prompt and convert it into a structured format.
Choose the most appropriate action based on the user's request.
Identify the most appropriate token based on the user's description. The token will be a cryptocurrency specified by the user.
If the user says to "buy" or "sell" tokens, swap with the stark token as the other token (this is the native token for starknet).
If the user says to "swap" x tokens for y tokens, swap amountIN tokenIn for amountOut tokenOut.
If the user only specifies amountIn or amountOut, leave the other field blank. If neither field is specified, leave both fields blank.
The only token that can be staked is the stark token. If the user says to "stake" tokens, stake with the stark token.
If they mention staking another token, reply that only the stark token can be staked.
You know information on every token that exists, not just the ones that can be traded.
If the user asks for information about any token, reply with the information you know.
`);
const tools = [stakeTool, swapTool];
const modelWithTools = llm.bind({
    tools: tools,
});

export type LLMMessage = (AIMessage | HumanMessage);

export async function runTradeAI(messages: LLMMessage[]) {
    const result = await modelWithTools.invoke([systemPrompt, ...messages]);
    return { content: result.content, tool_calls: result.tool_calls };
}
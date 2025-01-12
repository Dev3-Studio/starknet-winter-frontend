'use server';
import { z } from 'zod';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import tradeAIExamples from "./examples.json"
import { AIMessage, BaseMessage, HumanMessage } from '@langchain/core/messages';
import { getUuidV4 } from '@/utils/getUuidV4';
// import fs from 'fs';
// import path from 'path';

const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
    throw new Error('GOOGLE_API_KEY is not set');
}
// Options:
// gemini-2.0-flash-exp
// gemini-1.5-flash
// gemini-1.5-flash-8b
// gemini-1.5-pro

const LLM_MODEL = 'gemini-2.0-flash-exp';

const llm = new ChatGoogleGenerativeAI(
        {
            apiKey: API_KEY,
            model: LLM_MODEL,
        },
    
);

enum Actions {
    Buy,
    Sell,
    // Swap,
}

const settingsSchema = z.object({
    action: z.nativeEnum(Actions).describe('Actions that the bot can perform'),
    token: z.string().describe('The token to perform the action on'),
    amount: z.number().describe('The amount of the token to buy/sell'),
});


type ToolCallExample = {
    input: string;
    toolCallName: string;
    toolCallOutput: {
        action: string;
        token: string;
        amount: number;
    }
};

/**
 * This function converts an example into a list of messages that can be fed into an LLM.
 *
 * This code serves as an adapter that transforms our example into a list of messages
 * that can be processed by a chat model.
 *
 * The list of messages for each example includes:
 *
 * 1) HumanMessage: This contains the content from which information should be extracted.
 * 2) AIMessage: This contains the information extracted by the model.
 *
 * Credit: https://js.langchain.com/docs/how_to/extraction_examples/
 */
function toolExampleToMessages(example: ToolCallExample): BaseMessage[] {
    return [
        new HumanMessage(example.input),
        new AIMessage({
            content: '',
            tool_calls: [{
                name: example.toolCallName,
                type: 'tool_call',
                id: getUuidV4(),
                args: example.toolCallOutput,
            }],
        }),
    ];
}

// create LLM with functions
const tradeAI = llm.withStructuredOutput(settingsSchema, {name: 'tradeAI'});
// in same folder in system.txt
// const systemPrompt = fs.readFileSync(path.join(__dirname, 'system.txt')).toString();
const systemPrompt = `You are a crypto trading LLM. Your job is to take a user prompt and convert it into a structured format.
Choose the most appropriate action based on the user's request. The action can be 'buy' or 'sell'.
Identify the most appropriate token based on the user's description. The token will be a cryptocurrency specified by the user.
`
const chatPromptTemplate = ChatPromptTemplate.fromMessages([
    ['system', systemPrompt],
    new MessagesPlaceholder('examples'),
    ['user', '{input}'],
]);

export async function runTradeAI(text: string){
    
    const examples = tradeAIExamples.flatMap(toolExampleToMessages);
    const pipeline = chatPromptTemplate.pipe(tradeAI);
    // const result = await pipeline.invoke({ input: text, examples });
    const result = await llm.invoke([[
        "system",
        systemPrompt,
    ],
        ["human", text],]
        );
    console.log(result);
    return result.content as string;
}

runTradeAI('I want to buy 10 BTC').then(console.log).catch(console.error);

'use server';
import { z } from 'zod';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { getUuidV4 } from '@/utils/getUuidV4';
import { tool } from '@langchain/core/tools';

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


const stakeSchema = z.object({
    token: z.string().describe('The token to stake'),
    amount: z.number().describe('The amount of the token to stake'),
})

const swapSchema = z.object({
    token1: z.string().describe('The token to swap from'),
    token2: z.string().describe('The token to swap to'),
    amountIn: z.number().optional().describe('The amount of token1 to swap'),
    amountOut: z.number().optional().describe('The amount of token2 to receive'),
})

const stakeTool = tool(
    () => undefined,
    {
        name: 'stakeConfirm',
        description: 'A tool that generates a stake confirmation',
        schema: stakeSchema,
    }
)

const swapTool = tool(
    () => undefined,
    {
        name: 'swapConfirm',
        description: 'A tool that generates a swap confirmation',
        schema: swapSchema,
    }
)


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

// in same folder in system.txt
// const systemPrompt = fs.readFileSync(path.join(__dirname, 'system.txt')).toString();
const systemPrompt = new SystemMessage(`You are Tele. Your job is to take a user prompt and convert it into a structured format.
Choose the most appropriate action based on the user's request.
Identify the most appropriate token based on the user's description. The token will be a cryptocurrency specified by the user.
If the user says to "buy" or "sell" tokens, create a swap with the stark token as the other token (this is the native token for starknet).
`)
const tools = [stakeTool, swapTool];
const modelWithTools = llm.bind({
    tools: tools,
})

export type LLMMessage = (AIMessage | HumanMessage );

export async function runTradeAI(messages: LLMMessage[]){
    console.log(messages);
    const result = await modelWithTools.invoke([systemPrompt, ...messages]);
    return { content: result.content, tool_calls: result.tool_calls };
}
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { AzureOpenAI } from 'openai';

export async function POST(request: Request) {
	try {
		const { userId } = auth();
		const body = await request.json();
		const { messages } = body;

		const endpoint = process.env.AZURE_SEARCH_ENDPOINT;
		const apiKey = process.env.AZURE_OPENAI_KEY;
		const apiVersion = process.env.AZURE_API_VERSION;

		if (!userId) {
			return new NextResponse('Unauthorized.', { status: 401 });
		}

		if (!messages) {
			return new NextResponse('Messages are required.', { status: 400 });
		}

		if (!endpoint || !apiKey || !apiVersion) {
			return new NextResponse('Something wrong with OpenAI configuration.', {
				status: 500,
			});
		}

		const client = new AzureOpenAI({ endpoint, apiKey, apiVersion });
		const response = await client.chat.completions.create({
			messages,
			max_tokens: 128,
			model: 'gpt-4o',
		});

		return NextResponse.json(response.choices[0].message);
	} catch (error) {
		console.log('[CONVERSATION_ERROR]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

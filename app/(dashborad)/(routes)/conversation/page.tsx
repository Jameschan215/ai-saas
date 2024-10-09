'use client';

import { MessageSquare } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChatCompletionUserMessageParam } from 'openai/resources/index.mjs';

import { FormField, FormItem, FormControl, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import { cn } from '@/lib/utils';

import { formSchema } from './constants';
import Empty from '@/components/empty';
import Loader from '@/components/loader';
import UserAvatar from '@/components/user-avatar';
import BotAvatar from '@/components/bot-avatar';

type TForm = z.infer<typeof formSchema>;

export default function ConversationPage() {
	const form = useForm<TForm>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});

	const isLoading = form.formState.isSubmitting;
	const router = useRouter();
	const [messages, setMessages] = useState<ChatCompletionUserMessageParam[]>(
		[]
	);

	const onSubmit = async (values: TForm) => {
		try {
			const userMessage: ChatCompletionUserMessageParam = {
				role: 'user',
				content: values.prompt,
			};
			const newMessages = [...messages, userMessage];

			const response = await axios.post('/api/conversation', {
				messages: newMessages,
			});

			setMessages((prev) => [...prev, userMessage, response.data]);

			form.reset();
		} catch (error: unknown) {
			// TODO: Open Pro Modal
			console.log(error);
		} finally {
			router.refresh();
		}
	};

	return (
		<main>
			<Heading
				title="Conversation"
				description="Our most advanced conversation model."
				icon={MessageSquare}
				iconColor="text-violet-500"
				bgColor="bg-violet-500/10"
			/>

			<div className="px-4 lg:px-8">
				{/* Form */}
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
							<FormField
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl className="m-0 p-0">
											<Input
												className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
												placeholder="How do I calculate the area of a circle?"
												disabled={isLoading}
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								className="col-span-12 lg:col-span-2 w-full"
								disabled={isLoading}>
								Generate
							</Button>
						</form>
					</Form>
				</div>

				{/* Message Content */}
				<div className="mt-4 space-y-4">
					{/* Spinner */}
					{isLoading && (
						<div className="w-full p-8 rounded-lg flex items-center justify-center">
							<Loader />
						</div>
					)}

					{/* Empty */}
					{messages.length === 0 && !isLoading && (
						<Empty label="No Conversation Started." />
					)}

					{/* Messages */}
					<div className="flex flex-col-reverse gap-y-4">
						{messages.map((msg) => (
							<div
								key={msg.content as string}
								className={cn(
									'w-full p-8 rounded-lg flex items-start gap-x-8',
									{
										'bg-white border border-black/10': msg.role === 'user',
										'bg-muted': msg.role !== 'user',
									}
								)}>
								{msg.role === 'user' && <UserAvatar />}
								{msg.role !== 'user' && <BotAvatar />}
								<p className="text-sm">{msg.content as string}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}

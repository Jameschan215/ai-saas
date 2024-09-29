'use client';

import { MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import { formSchema } from './constants';

type TForm = z.infer<typeof formSchema>;

export default function ConversationPage() {
	const form = useForm<TForm>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: TForm) => {
		console.log(values);
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
				<div>
					{/* Form */}
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
												disabled={isLoading}
												placeholder="How do I calculate the area of a circle?"
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
				<div className="mt-4 space-y-4">Message Content</div>
			</div>
		</main>
	);
}

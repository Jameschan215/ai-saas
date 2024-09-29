'use client';

import {
	ArrowRight,
	Code,
	ImageIcon,
	MessageSquare,
	Music,
	VideoIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const tools = [
	{
		label: 'Conversation',
		icon: MessageSquare,
		color: 'text-violet-500',
		bgColor: 'bg-violet-500/10',
		href: '/conversation',
	},
	{
		label: 'Music Generation',
		icon: Music,
		color: 'text-emerald-500',
		bgColor: 'bg-emerald-500/10',
		href: '/music',
	},
	{
		label: 'Image Generation',
		icon: ImageIcon,
		color: 'text-pink-700',
		bgColor: 'bg-pink-700/10',
		href: '/image',
	},
	{
		label: 'Video Generation',
		icon: VideoIcon,
		color: 'text-orange-700',
		bgColor: 'bg-orange-700/10',
		href: '/video',
	},
	{
		label: 'Code Generation',
		icon: Code,
		color: 'text-green-700',
		bgColor: 'bg-green-700/10',
		href: '/code',
	},
];

export default function DashboardPage() {
	const router = useRouter();

	return (
		<main className="">
			<div className="mb-8 space-y-4">
				<h2 className="text-2xl md:text-4xl font-bold text-center">
					Explore the power of AI
				</h2>
				<p className="text-sm text-muted-foreground font-light text-center md:text-lg">
					Chat with the smartest AI - Experience the power of AI
				</p>
			</div>

			<div className="space-y-4 px-4 md:px-20 lg:px-32">
				{tools.map((tool) => (
					<Card
						onClick={() => router.push(tool.href)}
						key={tool.href}
						className="flex items-center justify-between p-4 border-black/5 hover:shadow-md transition cursor-pointer">
						{/* logo & label */}
						<div className="flex items-center gap-x-4">
							{/* logo */}
							<div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
								<tool.icon className={cn('w-8 h-8', tool.color)} />
							</div>

							{/* label */}
							<div className="font-semibold">{tool.label}</div>
						</div>

						{/* arrow */}
						<ArrowRight className="w-5 h-5" />
					</Card>
				))}
			</div>
		</main>
	);
}

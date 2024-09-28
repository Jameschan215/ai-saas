import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
	return (
		<main className="flex flex-col items-center justify-center gap-y-10 h-full">
			<p className="text-6xl">
				Landing Page -{' '}
				<span className="font-bold text-orange-700">Not protected</span>
			</p>
			<div className="space-x-4">
				<Button asChild>
					<Link href="/sign-in">Login</Link>
				</Button>
				<Button asChild>
					<Link href="/sign-up">Register</Link>
				</Button>
			</div>
		</main>
	);
}

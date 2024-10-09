import Image from 'next/image';

export default function Loader() {
	return (
		<div className="h-full flex flex-col items-center justify-center gap-y-4">
			<div className="w-10 h-10 relative animate-spin">
				<Image src="/logo.png" fill alt="Logo" />
			</div>

			<p className="text-sm text-muted-foreground">Genius is thinking...</p>
		</div>
	);
}

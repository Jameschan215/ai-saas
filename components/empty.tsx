import Image from 'next/image';

export default function Empty({ label }: { label: string }) {
	return (
		<div className="h-full p-20 flex flex-col justify-center items-center">
			<div className="relative w-72 h-72">
				<Image src="/empty.png" alt="Empty" fill />
			</div>

			<p className="text-center text-muted-foreground text-sm">{label}</p>
		</div>
	);
}

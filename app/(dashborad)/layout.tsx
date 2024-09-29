import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-full relative">
			<div className="hidden h-full md:w-72 md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-slate-800">
				<Sidebar />
			</div>
			<div className="md:pl-72 h-full">
				<Navbar />
				{children}
			</div>
		</div>
	);
}

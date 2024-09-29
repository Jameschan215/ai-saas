import React from 'react';
import { UserButton } from '@clerk/nextjs';
import MobileSidebar from '@/components/mobile-sidebar';

export default function Navbar() {
	return (
		<nav className="flex items-center p-4">
			<MobileSidebar />

			<div className="w-full flex justify-end">
				<UserButton />
			</div>
		</nav>
	);
}
